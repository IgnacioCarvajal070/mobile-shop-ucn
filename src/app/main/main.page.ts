import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { ApiProductService } from '../Services/api-product.service';
import { Router, RouterModule } from '@angular/router';
import { ApiShoppingCartService } from '../Services/api-shopping-cart.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { UpperBathAuthComponent } from "../components/upper-bath-auth/upper-bath-auth.component";
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterModule, UpperBathAuthComponent]
})
export class MainPage implements OnInit {
  
  currentPage = 1;
  products: Product[] = [];
  lastPage = 0;
  searchTerm = '';
  order = '';

  constructor (private productService: ApiProductService,private shoppingCartService: ApiShoppingCartService, private localStorage: LocalStorageService) { }
  ngOnInit(): void {
    this.loadProducts();
  }
  async loadProducts(){
    this.productService.getProducts(this.searchTerm, this.order, this.currentPage, 10).then(response => {
      if (response.result.length > 0){
        this.products = response.result;
      }
      else {
        this.currentPage = this.lastPage;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  nextPage(){
    this.lastPage = this.currentPage;
    this.currentPage++;
    this.loadProducts();
  }
  previousPage(){
    this.lastPage = this.currentPage;
    this.currentPage--;
    this.loadProducts();
  }
  searchType(type: string){
    this.searchTerm = type;
    this.currentPage = 1;
    this.lastPage = 0;
    this.loadProducts();
  }
  orderProducts(order: 'asc' | 'desc' | ''){
    this.order = order;
    this.currentPage = 1;
    this.lastPage = 0;
    this.loadProducts();
  }

  async addProductToCart(productId: number){
    await this.shoppingCartService.addProductToCart(this.localStorage.getVariable('user').id, productId, 1);
  }
}
