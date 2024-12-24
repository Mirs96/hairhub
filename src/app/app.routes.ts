import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { MainSalonComponent } from './salonPage/mainComponent/main-salon/main-salon.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "home", component:HomeComponent},
    {path: "salons/:id", component:MainSalonComponent},
    {path: "login", component:LoginComponent},
    {path: "register", component:RegisterComponent}
];
