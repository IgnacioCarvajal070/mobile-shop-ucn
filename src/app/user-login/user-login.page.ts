import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiServiceService } from '../Services/api-service.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule, FormsModule, ReactiveFormsModule,RouterModule]
})
export class UserLoginPage {

  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private authService = inject(ApiServiceService);
  private localStorageService = inject(LocalStorageService);
  constructor(private fb: FormBuilder, private router: Router) { 
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get emailValidate(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  get passwordValidate(){
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }
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
