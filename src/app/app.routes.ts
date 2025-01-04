import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-login/user-login.page').then( m => m.UserLoginPage)
  },
  { 
    path: 'main', loadComponent: () => import('./main/main.page').then(m => m.MainPage),
    canActivate: [authGuard]
  },
  {
    path: 'shopping-cart',
    loadComponent: () => import('./shopping-cart/shopping-cart.page').then( m => m.ShoppingCartPage),
    canActivate: [authGuard]
  },
  {
    path: 'shop-history',
    loadComponent: () => import('./shop-history/shop-history.page').then( m => m.ShopHistoryPage),
    canActivate: [authGuard]
  },
  {
    path: 'user-page',
    loadComponent: () => import('./user-page/user-page.page').then( m => m.UserPagePage),
    canActivate: [authGuard]
  },
];
