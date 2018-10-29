import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProductComponent } from './components/product/product.component'
import { AngularTokenService } from 'angular-token';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "sign-in", component: SignInComponent
  },
  {
    path: "products", component: ProductComponent, canActivate: [AngularTokenService]
  },
  {
    path: "", component: HomeComponent
  },
  {
    path: "profile", component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
