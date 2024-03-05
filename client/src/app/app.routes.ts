import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
export const routes: Routes = [
    {path:'', redirectTo:'/landingPage',pathMatch:'full'},
    {path:'landingPage',component:LandingPageComponent},
    {path:'login',component:RegisterPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'home',component:HomePageComponent}
];
