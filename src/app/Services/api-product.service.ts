import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPIGetProduct } from '../interfaces/product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  private url = 'http://localhost:5252/api';
  public errors: string[] = [];
  constructor(private http: HttpClient) { }

  async getProducts(query: string, order: string, pageNum: number, pagSize: number): Promise<ResponseAPIGetProduct>{
    try{
      const queryParam = new HttpParams().set('query', query).set('order', order);
      const response = await firstValueFrom(this.http.get<ResponseAPIGetProduct>(`${this.url}/product/available/${pageNum}/${pagSize}?${queryParam}`)); 
      return Promise.resolve(response);
    }
    catch(error){
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e.error);
  }
}
}
