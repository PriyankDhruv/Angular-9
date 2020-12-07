import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { AppService } from './services/app.service';
import { ViewCartService } from './services/cart/view-cart/view-cart.service';
import { DeleteService } from './services/cart/delete-product/delete.service';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { AddService } from './services/add-to-cart/add.service';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ViewProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [AppService, AddService, ViewCartService, DeleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
