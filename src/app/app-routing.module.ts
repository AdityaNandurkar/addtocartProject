import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/header/home/home.component';
import { CartComponent } from './pages/header/cart/cart.component';
import { AboutComponent } from './pages/header/about/about.component';
import { ContactComponent } from './pages/header/contact/contact.component';
import { SignupComponent } from './pages/header/signup/signup.component';
import { LoginComponent } from './pages/header/login/login.component';
import { AuthGuard } from './guard/Auth/auth.guard';
import { MyProfileComponent } from './pages/header/my-profile/my-profile.component';
import { AdminComponent } from './pages/header/admin/admin.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartComponent ,canActivate: [AuthGuard]},
  {
    path: "product",
    loadChildren: () => import('./pages/header/product/product.module').then(m => m.ProductModule)
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'myprofile', component: MyProfileComponent },
  { path: "**", component: PagenotfoundComponent }
  // , canActivate: [AuthGuard] 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
