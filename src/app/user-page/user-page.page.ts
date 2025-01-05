import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiServiceService } from '../Services/api-service.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { Gender } from '../interfaces/userAuth';
import { UpperBathAuthComponent } from "../components/upper-bath-auth/upper-bath-auth.component";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, UpperBathAuthComponent]
})
/**
 * Clase para la pagina de usuario.
 */
export class UserPagePage implements OnInit {

  // Servicio para interactuar con la API de autenticacion.
  userService = inject(ApiServiceService);

  // Servicio para interactuar con el almacenamiento local.
  localStorage = inject(LocalStorageService); 

  // Lista de generos.
  genders: Gender[] = [];

  // Lista de nombres de generos.
  genderNames: string[] = [];

  // Rut del usuario logueado.
  userRut = this.localStorage.getVariable('user').rut;

  // Correo electronico del usuario logueado.
  userEmail = this.localStorage.getVariable('user').email;

  // Nombre del usuario logueado.
  userName = this.localStorage.getVariable('user').name;

  // Fecha de nacimiento del usuario logueado.
  userBirthdate = this.formatDate(this.localStorage.getVariable('user').birthdate);

  // Genero del usuario logueado.
  userGender = this.localStorage.getVariable('user').gender.type;

  // Identificador del usuario logueado.
  userId = this.localStorage.getVariable('user').id;

  /**
   * Constructor de la pagina.
   * @param router - Enrutador de la pagina.
   */
  constructor(private router: Router) { }

  /**
   * Metodo para inicializar la pagina.
   */
  ngOnInit() {
    this.userService.getGenders().then(genders => {
      this.genders = genders;
      this.genderNames = genders.map (gender => gender.type);
    });
  }

  /**
   * Metodo para cerrar sesión.
   */
  userLogout(){
    this.localStorage.clearStorage();
    this.router.navigate(['']);
  }

  /**
   * Metodo para deshabilitar la cuenta del usuario.
   */
  userDelete(){
    this.userService.changeUserStatus(this.userId, 'false').then(() => {
      this.localStorage.clearStorage();
      this.router.navigate(['']);
    });
  }

  /**
   * Metodo para formatear una fecha.
   * @param date Fecha a formatear.
   * @returns Fecha formateada (Sin hora).
   */
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }
}
