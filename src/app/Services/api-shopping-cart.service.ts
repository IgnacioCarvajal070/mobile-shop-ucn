import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/shoppingCart';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiShoppingCartService {
  private baseUrl = 'http://localhost:5252/api';
  public errors: string[] = [];
  constructor(private http:HttpClient) { }

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