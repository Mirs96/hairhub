import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SalonHubComponent } from './salon-hub/salon-hub.component';
import { SalonComponent } from './salon/salon.component';

export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "home", component:HomeComponent},
    {path: "about", component:AboutComponent},
    {path: "contact", component:ContactComponent},
    {path: "salons", component:SalonHubComponent},
    {path: "salons/:id", component:SalonComponent}
];
