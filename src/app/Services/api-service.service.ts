import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender, ResponseAPI } from '../interfaces/userAuth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:5252/api';
  public errors: string[] = [];
  constructor(private http: HttpClient) { }
  async login(form: any): Promise<ResponseAPI>{
   try {
      this.errors = [];
      const response = await firstValueFrom(this.http.post<ResponseAPI>(`${this.baseUrl}/auth/login`, form));
      return Promise.resolve(response);
   } 
   catch(error: any){
    let e = error as HttpErrorResponse;
    this.errors.push(e.error.message);
    return Promise.reject(this.errors);
   }
  }

  async changeUserStatus (id: number, status: string): Promise<string>{
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      const body = JSON.stringify(status);
      const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}/user/${id}/state`, body, {headers, responseType: 'text' as 'json'}));
      return Promise.resolve(response);
    }
    catch (error){
      if (error instanceof HttpErrorResponse){
        const e = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(e);
      }
      return Promise.reject(error);
    }
  }

  async getGenders(): Promise<Gender[]>{
    try{
      const response = await firstValueFrom(this.http.get<Gender[]>(`${this.baseUrl}/user/genders`));
      return Promise.resolve(response);
    }
    catch(error){
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e.error);
    }
  }
}