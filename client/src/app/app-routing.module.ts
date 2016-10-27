import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { SupplierComponent } from './supplier/supplier.component'
import { BankComponent } from './bank/bank.component'
import { BankTranComponent } from './bank/bank-tran.component'

export const routes: Routes = [
  { path: "", component:HomeComponent },
  { path: "home", component:HomeComponent },
  { path: "supplier", component:SupplierComponent },
  { path: "bank", component:BankComponent },
  { path: "banktran", component:BankTranComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class Carapp06RoutingModule { }