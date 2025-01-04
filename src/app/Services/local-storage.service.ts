import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.getVariable('token') ? true : false);

  isloggedIn = this.loggedInSubject.asObservable();

  setVariable(key : string, value : any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getVariable(key: string){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeValue(key: string){
    localStorage.removeItem(key);
  }

  setLoggedIn(loggedIn: boolean){
    this.loggedInSubject.next(loggedIn);
  }

  constructor() {
    this.loggedInSubject.next(this.getVariable('token') ? true : false);
  }
  
  clearStorage(){
    localStorage.clear();
  }
}
