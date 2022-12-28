import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { FavorsComponent } from './components/favors/favors.component';
import { HomeComponent } from './components/home/home.component';
import { PriceListComponent } from './components/price-list/price-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'favors', component: FavorsComponent}, 
  { path: 'contacts', component: ContactInfoComponent},
  { path: 'prices', component: PriceListComponent},    

  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
