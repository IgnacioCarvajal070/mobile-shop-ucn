import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiServiceService } from '../Services/api-service.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';
import { UpperBarComponent } from "../components/upper-bar/upper-bar.component";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, UpperBarComponent]
})
/**
 * Clase para la pagina de inicio de sesion de usuario.
 */
export class UserLoginPage {

  // Formulario de inicio de sesion.
  form!: FormGroup;

  // Bandera para mostrar alerta de inicio de sesion.
  loginAlert: boolean = false;

  // Bandera para mostrar error en el inicio de sesion.
  error: boolean = false;

  // Correo electronico del usuario.
  email: string = '';

  // Contraseña del usuario.
  password: string = '';

  // Mensaje de error en el inicio de sesion.
  errorMessage: string = '';
  
  // Servicio para interactuar con la API de autenticacion.
  private authService = inject(ApiServiceService);

  // Servicio para interactuar con el almacenamiento local.
  private localStorageService = inject(LocalStorageService);

  /**
   * Constructor de la pagina.
   * @param fb - Constructor de formularios.
   * @param router - Enrutador de la pagina.
   */
  constructor(private fb: FormBuilder, private router: Router) { 
    this.formulario();
  }

  /**
   * Metodo para inicializar el formulario.
   */
  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Metodo validador del campo de correo electronico en el formulario.
   */
  get emailValidate(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  /**
   * Metodo validador del campo de contraseña en el formulario.
   */
  get passwordValidate(){
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  /**
   * Metodo para iniciar sesion en la aplicacion.
   */
  async login() {
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    try {
      const response = await this.authService.login(this.form.value);
      if (response.token) {
        this.localStorageService.setVariable('token', response.token);
        this.localStorageService.setVariable('user', response.user);
        this.localStorageService.setLoggedIn(true);
        this.router.navigate(['/main']);
      }
      else {
        this.error = true;
        this.errorMessage = "Error al iniciar sesión";
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage = error;
    }
  }
}
