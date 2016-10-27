import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service'
import { Supplier } from '../../../../models/Supplier'

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[]
  supName: string;

  constructor(private _supplierService: SupplierService) { 
    this._supplierService.getSuppliers()
          .subscribe(suppliers => {
            this.suppliers = suppliers;
    });
  }

  addSupplier(event){

    event.preventDefault();

    var newSupplier = {
      supName: this.supName
    }

    this._supplierService.addSupplier(newSupplier)
      	  .subscribe(supplier => {
            this.suppliers.push(supplier);
            this.supName = "";
          })
  }

  deleteSupplier(id){
    var suppliers = this.suppliers;

    this._supplierService.deleteSupplier(id)
        .subscribe(data => {
          if(data.n == 1){
            for(var i = 0;i < suppliers.length;i++){
              if(suppliers[i]._id == id){
                suppliers.splice(i, 1);
              }
            }
          }
    });
  }

  ngOnInit() {
  }

}
