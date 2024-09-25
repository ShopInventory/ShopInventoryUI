import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  private customer = new Subject<any>();
  private supplier = new Subject<any>();

  customerCast = this.customer.asObservable();
  supplierCast = this.supplier.asObservable();

  constructor(
    private loader: LoaderService,

  ) { }

  addCustomer(data: any) {
    this.customer.next(data);
    // this.loader.stopLoader();
  }

  addSupplier(data: any) {
    this.supplier.next(data);
    // this.loader.stopLoader();
  }

}
