import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiServiceService } from '../Services/api-service.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { Gender } from '../interfaces/userAuth';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class UserPagePage implements OnInit {
  userService = inject(ApiServiceService);
  localStorage = inject(LocalStorageService); 

  genders: Gender[] = [];
  genderNames: string[] = [];
  userRut = this.localStorage.getVariable('user').rut;
  userEmail = this.localStorage.getVariable('user').email;
  userName = this.localStorage.getVariable('user').name;
  userBirthdate = this.formatDate(this.localStorage.getVariable('user').birthdate);
  userGender = this.localStorage.getVariable('user').gender.type;
  userId = this.localStorage.getVariable('user').id;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userService.getGenders().then(genders => {
      this.genders = genders;
      this.genderNames = genders.map (gender => gender.type);
    });
  }

  userLogout(){
    this.localStorage.clearStorage();
    this.router.navigate(['']);
  }

  userDelete(){
    this.userService.changeUserStatus(this.userId, 'false').then(() => {
      this.localStorage.clearStorage();
      this.router.navigate(['']);
    });
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }
}
