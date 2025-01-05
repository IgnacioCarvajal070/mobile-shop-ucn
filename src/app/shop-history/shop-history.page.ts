import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ApiPurchaseService } from '../Services/api-purchase.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { ResponseAPIGetPurchases } from '../interfaces/purchase';

@Component({
  selector: 'app-shop-history',
  templateUrl: './shop-history.page.html',
  styleUrls: ['./shop-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ShopHistoryPage implements OnInit {
  purchaseService = inject(ApiPurchaseService);
  localStorage = inject(LocalStorageService);
  purchases: ResponseAPIGetPurchases[] = [];

  constructor(private router:Router) { }

  ngOnInit() {
    this.getPurchases();
  }
  async getPurchases(){
    const purchases = await this.purchaseService.getPurchases(this.localStorage.getVariable('user').id);
    this.purchases = purchases;
  }

  async navigateToMain(){
    this.router.navigate(['/main']);
  }
}