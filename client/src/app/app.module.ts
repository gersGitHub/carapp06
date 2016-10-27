import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { routes } from './app-routing.module'

import { SupplierService } from './services/supplier.service'
import { BankTranService } from './services/bank-tran.service'

import { AppComponent } from './app.component'
import { SupplierComponent } from './supplier/supplier.component'
import { HomeComponent } from './home/home.component'
import { BankComponent } from './bank/bank.component'
import { BankTranComponent } from './bank/bank-tran.component'

@NgModule({
  declarations: [
    AppComponent,
    SupplierComponent,
    HomeComponent,
    BankComponent,
    BankTranComponent,
    BankTranComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true})
  ],

  providers: [
    SupplierService, 
    BankTranService],

  bootstrap: [AppComponent]
})
export class AppModule { }

