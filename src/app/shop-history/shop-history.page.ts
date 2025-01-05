import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ApiPurchaseService } from '../Services/api-purchase.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { ResponseAPIGetPurchases } from '../interfaces/purchase';
import { UpperBathAuthComponent } from "../components/upper-bath-auth/upper-bath-auth.component";

@Component({
  selector: 'app-shop-history',
  templateUrl: './shop-history.page.html',
  styleUrls: ['./shop-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, UpperBathAuthComponent]
})
/**
 * Clase para la pagina de historial de compras.
 */
export class ShopHistoryPage implements OnInit {

  // Servicio para interactuar con la API de compras.
  purchaseService = inject(ApiPurchaseService);

  // Servicio para interactuar con el almacenamiento local.
  localStorage = inject(LocalStorageService);

  // Lista de compras realizadas por el usuario.
  purchases: ResponseAPIGetPurchases[] = [];

  /**
   * Constructor de la pagina.
   * @param router - Enrutador de la pagina.
   */
  constructor(private router:Router) { }

  /**
   * Metodo para inicializar la pagina.
   */
  ngOnInit() {
    this.getPurchases();
  }

  /**
   * Metodo para obtener las compras realizadas por el usuario.
   */
  async getPurchases(){
    const purchases = await this.purchaseService.getPurchases(this.localStorage.getVariable('user').id);
    this.purchases = purchases;
  }
}