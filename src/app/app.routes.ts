import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';

export const routes: Routes = [

    {
        path: '', component: AuthLayoutComponent, canActivate: [checkTokenGuard], children: [
            { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent), },
            { path: 'signup', loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent), },
            { path: 'resetPassword', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent), }
        ],
    },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent), },
            { path: 'productDetails/:id', component: ProductDetailsComponent, data: { renderMode: 'default' } },
            { path: 'productDetails/:id', loadComponent: () => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent), },
            { path: 'categories', loadComponent: () => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent), },
            { path: 'cart', canActivate: [authGuard], loadComponent: () => import('./features/pages/cart/cart.component').then(c => c.CartComponent), },
            { path: 'products', loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent), },
            { path: 'checkout/:id', loadComponent: () => import('./features/pages/checkout/checkout.component').then(c => c.CheckoutComponent) },
            { path: 'brands', loadComponent: () => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent), },
        ],
    },
];

