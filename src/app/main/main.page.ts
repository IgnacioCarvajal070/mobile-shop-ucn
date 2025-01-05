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
/**
 * Pagina principal de la aplicacion.
 * Contiene una lista de producos y permite filtrar y ordenar los productos por su precio de forma ascendente y descendente.
 */
export class MainPage implements OnInit {
  
  // Pagina actual de productos.
  currentPage = 1;
  
  // Lista de productos.
  products: Product[] = [];

  // Ultima pagina de productos explorada.
  lastPage = 0;

  // Terminos de busqueda y ordenamiento de productos.
  searchTerm = '';
  order = '';

  /**
   * Constructor de la clase.
   * @param productService Servicio para obtener los productos de la API.
   * @param shoppingCartService Servicio para interactuar con el carrito de compras de la API.
   * @param localStorage Servicio para interactuar con el almacenamiento local.
   */
  constructor (private productService: ApiProductService,private shoppingCartService: ApiShoppingCartService, private localStorage: LocalStorageService) { }
  /**
   * Metodo que se ejecuta al iniciar la pagina.
   */
  ngOnInit(): void {
    this.loadProducts();
  }
  
  /**
   * Metodo para cargar los productos de la API.
   */
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

  /**
   * Metodo para cargar la siguiente pagina de productos.
   */
  nextPage(){
    this.lastPage = this.currentPage;
    this.currentPage++;
    this.loadProducts();
  }

  /**
   * Metodo para cargar la pagina anterior de productos.
   */
  previousPage(){
    this.lastPage = this.currentPage;
    this.currentPage--;
    this.loadProducts();
  }

  /**
   * Metodo para actualizar el termino de busqueda de productos.
   * @param type Tipo de producto a buscar.
   */
  searchType(type: string){
    this.searchTerm = type;
    this.currentPage = 1;
    this.lastPage = 0;
    this.loadProducts();
  }

  /**
   * Metodo actualizar el termino de ordenamiento de productos-
   * @param order Tipo de ordenamiento de productos.
   */
  orderProducts(order: 'asc' | 'desc' | ''){
    this.order = order;
    this.currentPage = 1;
    this.lastPage = 0;
    this.loadProducts();
  }

  /**
   * Metodo para agregar un producto al carrito de compras.
   * @param productId Identificador del producto a agregar al carrito.
   */
  async addProductToCart(productId: number){
    await this.shoppingCartService.addProductToCart(this.localStorage.getVariable('user').id, productId, 1);
  }
}
