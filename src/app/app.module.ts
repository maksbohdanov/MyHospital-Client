import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { FavorsComponent } from './components/favors/favors.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { PriceListComponent } from './components/price-list/price-list.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactInfoComponent,
    FavorsComponent,
    PriceListComponent,
    DoctorsListComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
