import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para interactuar con el almacenamiento local.
 */
export class LocalStorageService {

  // Sujeto para almacenar el estado de la sesion.
  private loggedInSubject = new BehaviorSubject<boolean>(this.getVariable('token') ? true : false);

  // Observable para el estado de la sesion.
  isloggedIn = this.loggedInSubject.asObservable();

  /**
   * Metodo para almacenar una variable en el almacenamiento local.
   * @param key Key con la que se almacenara la variable
   * @param value Valor de la variable.
   */
  setVariable(key : string, value : any){
    localStorage.setItem(key, JSON.stringify(value));
  }


  /**
   * Metodo para obtener una variable del almacenamiento local.
   * @param key Key de la variable a obtener.
   * @returns Valor de la variable.
   */
  getVariable(key: string){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Metodo para eliminar una variable del almacenamiento local.
   * @param key Key de la variable a eliminar.
   */
  removeValue(key: string){
    localStorage.removeItem(key);
  }

  /**
   * Metodo para actualizar el estado de la sesion.
   * @param loggedIn Estado de la sesion.
   */
  setLoggedIn(loggedIn: boolean){
    this.loggedInSubject.next(loggedIn);
  }

  /**
   * Constructor del servicio.
   */
  constructor() {
    this.loggedInSubject.next(this.getVariable('token') ? true : false);
  }
  
  /**
   * Metodo para limpiar el almacenamiento local.
   */
  clearStorage(){
    localStorage.clear();
  }
}
