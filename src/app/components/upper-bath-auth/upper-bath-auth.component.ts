import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-upper-bath-auth',
  templateUrl: './upper-bath-auth.component.html',
  styleUrls: ['./upper-bath-auth.component.scss'],
  imports: [IonicModule]
})
export class UpperBathAuthComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  navigateToUserPage(){
    this.router.navigate(['/user-page']);
  }
  navigateToShopHistory(){
    this.router.navigate(['/shop-history']);
  }
  navigeteToShoppingCart(){
    this.router.navigate(['/shopping-cart']);
  }
  navigateToMain(){
    this.router.navigate(['/main']);
  }
}
