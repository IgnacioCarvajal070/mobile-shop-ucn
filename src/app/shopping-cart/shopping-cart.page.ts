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
import { UpperBathAuthComponent } from "../components/upper-bath-auth/upper-bath-auth.component";
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, UpperBathAuthComponent]
})

/**
 * Clase para la pagina de carrito de compras.
 */
export class ShoppingCartPage implements OnInit, ViewWillEnter {

  // Carrito de compras del usuario.
  cart: ShoppingCart = {cartId: 0, userId: 0, cartItems: []};

  // Servicio para interactuar con la API de carrito de compras.
  apiShoppingCartService = inject(ApiShoppingCartService);

  // Servicio para interactuar con la API de productos.
  apiProductService = inject(ApiProductService);
  
  // Servicio para interactuar con el almacenamiento local.
  localStorage = inject(LocalStorageService);

  // Identificador del usuario.
  userId = this.localStorage.getVariable('user').id;

  // Lista de productos disponibles.
  products: Product[] = [];

  /**
   * Constructor de la pagina.
   * @param router - Enrutador de la pagina.
   */
  constructor(private router: Router) { }

  /**
   * Metodo para inicializar la pagina al momento de verla.
   */
  ionViewWillEnter(): void {
    this.getCart();
    this.getProducts();
  }

  /**
   * Metodo para inicializar la pagina en el primer cargado.
   */
  ngOnInit() {
    this.getCart(); 
    this.getProducts();
  }

  /**
   * Metodo para obtener el carrito de compras del usuario.
   */
  async getCart(){
    this.cart = await this.apiShoppingCartService.getCart(this.userId);
    if (!this.cart.cartItems){
      this.cart.cartItems = [];
    }
  }

  /**
   * Metodo para agregar un producto al carrito de compras.
   * @param productId Identificador del producto.
   */
  async addProduct(productId: number){
    await this.apiShoppingCartService.addProductToCart(this.userId, productId, 1);
    this.getCart();
  }

  /**
   * Metodo para sumar en 1 la cantidad de un producto en el carrito de compras.
   * @param productId Identificador del producto.
   */
  async sumProduct(productId: number){
    await this.apiShoppingCartService.sumProductToCart(productId, this.cart.cartId); 
    this.getCart();
  }

  /**
   * Metodo para restar en 1 la cantidad de un producto en el carrito de compras.
   * @param productId Identificador del producto.
   */
  async subtractProduct(productId: number){
    await this.apiShoppingCartService.subtractProductToCart(productId, this.cart.cartId);
    this.getCart();
  }

  /**
   * Metodo para obtener los productos disponibles.
   */
  async getProducts(){
    const response = await this.apiProductService.getProducts('', '', 1, 10);
    this.products = response.result;
  }

  /**
   * Metodo para navegar a la pagina principal.
   */
  async navigateToMain(){
    this.router.navigate(['/main']);
  }

  /**
   * Metodo para obtener un producto por su identificador.
   * @param productId Identificador del producto.
   * @returns Producto con el identificador proporcionado.
   */
  getProductbyId(productId: number){
    return this.products.find(p => p.id === productId);
  }

  /**
   * Metodo para obtener el precio total del carrito de compras.
   * @returns Precio total de los productos en el carrito de compras.
   */
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

  /**
   * Metodo para obtener la cantidad de productos en el carrito de compras.
   * @returns Cantidad de productos en el carrito de compras.
   */
  getCartLength(){
    return this.cart.cartItems.length;
  }

}