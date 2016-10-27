import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SupplierService {

  constructor(private _http: Http) {
      console.log("Supplier Service initialised...");
   }

   getSuppliers(){
     return this._http.get('api/suppliers')
                  .map(res => res.json());     
   }

   addSupplier(newSupplier){
     var headers = new Headers(newSupplier);
     headers.append('Content-Type', 'application/json');
     return this._http.post('api/supplier', JSON.stringify(newSupplier), {headers: headers})
                  .map(res => res.json());
   }

   deleteSupplier(id){
      return this._http.delete('api/supplier/' + id)
          .map(res => res.json());
   }
}
