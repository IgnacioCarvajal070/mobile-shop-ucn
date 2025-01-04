import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'main', loadComponent: () => import('./main/main.page').then(m => m.MainPage)},
  {
    path: 'user-login',
    loadComponent: () => import('./user-login/user-login.page').then( m => m.UserLoginPage)
  },
  {
    path: 'shopping-cart',
    loadComponent: () => import('./shopping-cart/shopping-cart.page').then( m => m.ShoppingCartPage)
  },
  {
    path: 'shop-history',
    loadComponent: () => import('./shop-history/shop-history.page').then( m => m.ShopHistoryPage)
  },
  {
    path: 'user-page',
    loadComponent: () => import('./user-page/user-page.page').then( m => m.UserPagePage)
  },
];
