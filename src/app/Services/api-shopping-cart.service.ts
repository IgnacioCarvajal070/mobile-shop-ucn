import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/shoppingCart';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para interactuar con la API de carrito de compras.
 */
export class ApiShoppingCartService {

  // URL base de la API de carrito de compras.
  private baseUrl = 'http://localhost:5252/api';

  // Lista de errores obtenidos de la API.
  public errors: string[] = [];
  
  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(private http:HttpClient) { }

  /**
   * Metodo para obtener el carrito de compras de un usuario.
   * @param userId - Identificador del usuario.
   * @returns Promesa con el carrito de compras del usuario.
   */
  async getCart(userId: number): Promise<ShoppingCart>{
    try{
      this.errors = [];
      const response = await firstValueFrom(this.http.get<ShoppingCart>(`${this.baseUrl}/Cart/getCart?userId=${userId}`));
      return Promise.resolve(response);
    }
    catch(error){
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e.error);
    }
  }
  /**
   * Metodo para agregar un producto al carrito de compras de un usuario.
   * @param userId Identificador del usuario
   * @param productId Identificador del producto
   * @param quantity Cantidad del producto
   * @returns Promesa con la respuesta de la API.
   */
  async addProductToCart(userId: number, productId: number, quantity: number): Promise<string>{
    try{
      const body = {productId, quantity};
      const response = await firstValueFrom(this.http.post<string>(`${this.baseUrl}/Cart/addItemCart?userId=${userId}`, body));
      return Promise.resolve(response);
    }
    catch(error){
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e.error);
    }
  }
  /**
   * Metodo para aumentar en 1 la cantidad de un producto en el carrito de compras.
   * @param productId Identificador del producto 
   * @param cartId Identificador del carrito de compras
   * @returns Promesa con la respuesta de la API.
   */
  async sumProductToCart(productId: number, cartId: number): Promise<string>{
    try{
      const response = await firstValueFrom(this.http.post<string>(`${this.baseUrl}/Cart/sumItemCart?cartId=${cartId}&productId=${productId}`, null));
      return Promise.resolve(response);
    }
    catch(error){
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e.error);
    }
  }

  /**
   * Metodo para disminuir en 1 la cantidad de un producto en el carrito de compras.
   * @param productId Identificador del producto
   * @param cartId Identificador del carrito de compras
   * @returns Promesa con la respuesta de la API.
   */
  async subtractProductToCart(productId: number, cartId: number): Promise<string>{
    try{
      const response = await firstValueFrom(this.http.post<string>(`${this.baseUrl}/Cart/subtractItemCart?cartId=${cartId}&productId=${productId}`, null));
      return Promise.resolve(response);
    }
    catch(error){
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e.error);
    }
  }
}