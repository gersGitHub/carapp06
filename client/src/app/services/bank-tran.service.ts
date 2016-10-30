import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BankTranService {

  constructor(private _http: Http) {
      console.log("Bank-Tran Service initialised...");
   }

   getBankTrans(){
     return this._http.get('api/banktrans')
                  .map(res => res.json());     
   }

   addBankTran(newBankTran){
     var headers = new Headers(newBankTran);
     headers.append('Content-Type', 'application/json');
     return this._http.post('api/banktran', JSON.stringify(newBankTran), {headers: headers})
                  .map(res => res.json());
   }

   deleteBankTran(id){
      return this._http.delete('api/banktran/' + id)
          .map(res => res.json());
   }
}
