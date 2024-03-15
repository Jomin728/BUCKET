import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GeneralSectionComponent } from './general-section/general-section.component';
export const routes: Routes = [
    {path:'landingPage',component:LandingPageComponent},
    {path:'login',component:RegisterPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'home',component:HomePageComponent,
    children:[
        {path:'general',component:GeneralSectionComponent},
        {path:'', redirectTo:'/home/general',pathMatch:'full'},
    ]
},
{path:'', redirectTo:'/landingPage',pathMatch:'full'}
];
