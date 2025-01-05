import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-upper-bath-auth',
  templateUrl: './upper-bath-auth.component.html',
  styleUrls: ['./upper-bath-auth.component.scss'],
  imports: [IonicModule]
})
/**
 * Componente barra de navegación utilizada en las paginas de la aplicacion.
 * 
 * Este componente contiene los botones de navegación a las diferentes paginas de la aplicacion.
 * Se requiere que el usuario este autenticado para poder acceder a esta barra de navegación.
 */
export class UpperBathAuthComponent  implements OnInit {

  /**
   * Constructor del componente.
   * @param router - Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) { }

  ngOnInit() {}

  /**
   * Navega a la pagina de perfil de usuario.
   */
  navigateToUserPage(){
    this.router.navigate(['/user-page']);
  }
  /**
   * Navega a la pagina de historial de compras.
   */
  navigateToShopHistory(){
    this.router.navigate(['/shop-history']);
  }
  /**
   * Navega a la pagina de carrito de compras.
   */
  navigeteToShoppingCart(){
    this.router.navigate(['/shopping-cart']);
  }
  /**
   * Navega a la pagina principal de la aplicacion.
   */
  navigateToMain(){
    this.router.navigate(['/main']);
  }
}
