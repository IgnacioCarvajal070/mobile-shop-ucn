import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPIGetPurchases } from '../interfaces/purchase';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPurchaseService {
  private url = 'http://localhost:5252/api';
  public errors: string[] = [];

  constructor(private http: HttpClient) { }

  async getPurchases(id: number): Promise<ResponseAPIGetPurchases[]>{
    try{
      const response = await firstValueFrom(this.http.get<ResponseAPIGetPurchases[]>(`${this.url}/purchase/${id}`));
      return Promise.resolve(response);
  }
  catch(error){
    let e = error as HttpErrorResponse;
    this.errors.push(e.message);
    return Promise.reject(e.error);
  }
}
}
