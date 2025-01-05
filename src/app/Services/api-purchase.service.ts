import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPIGetPurchases } from '../interfaces/purchase';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para interactuar con la API de compras.
 */
export class ApiPurchaseService {
  // URL base de la API de compras.
  private url = 'http://localhost:5252/api';

  // Lista de errores obtenidos de la API.
  public errors: string[] = [];

  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(private http: HttpClient) { }

  /**
   * Metodo para obtener las compras de un usuario.
   * @param id - ID del usuario.
   * @returns Una promesa que se resuelve con las compras del usuario, o se rechaza con un mensaje de error.
   */
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
