import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAPIGetProduct } from '../interfaces/product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para interactuar con la API de productos.
 */
export class ApiProductService {

  // URL de la API de productos.
  private url = 'http://localhost:5252/api';

  // Lista para almacenar los errores obtenidos de la API.
  public errors: string[] = [];

  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(private http: HttpClient) { }

  /**
   * Metodo para obtener los productos disponibles de la API.
   * @param query Tipo de producto a buscar
   * @param order Tipo de ordenamiento de precios
   * @param pageNum Numero de pagina
   * @param pagSize Tamaño de la pagina
   * @returns Una promesa con la respuesta de la API.
   */
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
