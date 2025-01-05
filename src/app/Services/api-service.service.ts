import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender, ResponseAPI } from '../interfaces/userAuth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para interactuar con la API de autenticación.
 */
export class ApiServiceService {
  // URL base de la API de autenticación.
  private baseUrl = 'http://localhost:5252/api';

  // Lista de errores obtenidos de la API.
  public errors: string[] = [];
  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(private http: HttpClient) { }
  
  /**
   * Metodo para iniciar sesion en la API.
   * @param form - Formulario con las credenciales del usuario.
   * @returns Promesa con la respuesta de la API.
   */
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

  /**
   * Metodo para cambiar el estado de un usuario en la API.
   * @param id - Identificador del usuario.
   * @param status - Estado del usuario.
   * @returns Promesa con la respuesta de la API.
   */
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

  /**
   * Metodo para obtener los posibles generos de los usuarios de la API.
   * @returns Promesa con la lista de generos.
   */
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