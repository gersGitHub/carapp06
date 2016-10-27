/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankTranService } from './bank-tran.service';

describe('Service: BankTrana', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankTranService]
    });
  });

  it('should ...', inject([BankTranService], (service: BankTranService) => {
    expect(service).toBeTruthy();
  }));
});
