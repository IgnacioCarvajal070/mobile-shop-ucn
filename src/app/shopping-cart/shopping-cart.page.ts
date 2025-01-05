import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShoppingCart } from '../interfaces/shoppingCart';
import { ApiShoppingCartService } from '../Services/api-shopping-cart.service';
import { ApiProductService } from '../Services/api-product.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';
import { Product } from '../interfaces/product';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ShoppingCartPage implements OnInit, ViewWillEnter {
  cart: ShoppingCart = {cartId: 0, userId: 0, cartItems: []};
  apiShoppingCartService = inject(ApiShoppingCartService);
  apiProductService = inject(ApiProductService);
  localStorage = inject(LocalStorageService);
  userId = this.localStorage.getVariable('user').id;
  products: Product[] = [];
  constructor(private router: Router) { }
  ionViewWillEnter(): void {
    this.getCart();
    this.getProducts();
  }
  ngOnInit() {
    this.getCart(); 
    this.getProducts();
  }
  async getCart(){
    this.cart = await this.apiShoppingCartService.getCart(this.userId);
    if (!this.cart.cartItems){
      this.cart.cartItems = [];
    }
  }
  async addProduct(productId: number){
    await this.apiShoppingCartService.addProductToCart(this.userId, productId, 1);
    this.getCart();
  }
  async sumProduct(productId: number){
    await this.apiShoppingCartService.sumProductToCart(productId, this.cart.cartId); 
    this.getCart();
  }
  async subtractProduct(productId: number){
    await this.apiShoppingCartService.subtractProductToCart(productId, this.cart.cartId);
    this.getCart();
  }
  async getProducts(){
    const response = await this.apiProductService.getProducts('', '', 1, 10);
    this.products = response.result;
  }
  async navigateToMain(){
    this.router.navigate(['/main']);
  }

  getProductbyId(productId: number){
    return this.products.find(p => p.id === productId);
  }
  getTotalPrice(){
    let total = 0;
    this.cart.cartItems.forEach(item => {
      const product = this.getProductbyId(item.productId);
      if (product){
        total += product?.price * item.quantity;
      }
    });
    return total
  }
  getCartLength(){
    return this.cart.cartItems.length;
  }

}