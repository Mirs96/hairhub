import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { MainSalonComponent } from './salonPage/mainComponent/main-salon/main-salon.component';


export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "home", component:HomeComponent},
    {path: "salons/:id", component:MainSalonComponent}
];
