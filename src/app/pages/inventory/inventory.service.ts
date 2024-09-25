import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { shopInventoryEndpoints } from 'src/app/constants/endpoints/shopInventoryEndpoints';
import { HttpApiService } from 'src/app/services/http-api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  enableMock: boolean = false;


  private product = new Subject<any>();
  private category = new Subject<any>();
  private subCategory = new Subject<any>();
  private brand = new Subject<any>();

  productCast = this.product.asObservable();
  categoryCast = this.category.asObservable();
  subCategoryCast = this.subCategory.asObservable();
  brandCast = this.brand.asObservable();

  constructor(
    private loader: LoaderService,
    private http: HttpApiService
  ) { }

  addProduct(data: any) {
    this.product.next(data);
    // this.loader.stopLoader();
  }

  addCategory(data: any) {
    this.category.next(data);
    // this.loader.stopLoader();
  }

  addSubCategory(data: any) {
    this.subCategory.next(data);
    // this.loader.stopLoader();
  }

  addBrand(data: any) {
    this.brand.next(data);
    // this.loader.stopLoader();
  }


  saveCategoryDetails(data: any) {
    if (this.enableMock && environment.envType !== 'PROD') return of(false);
    return this.http.post(shopInventoryEndpoints.saveCategoryDetails, data);
  }

  getCategoryDetails(data: any) {
    if (this.enableMock && environment.envType !== 'PROD') return of(false);
    return this.http.post(shopInventoryEndpoints.getCategoryDetails, data);
  }

  getBrandDetails(data: any) {
    if (this.enableMock && environment.envType !== 'PROD') return of(false);
    return this.http.post(shopInventoryEndpoints.getBrandDetails, data);
  }










  // // Add a new customer
  // addCustomer(customerData: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.apiUrl, customerData, { headers });
  // }

  // // Get customer by ID
  // getCustomerById(customerId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${customerId}`);
  // }

  // // Update an existing customer
  // updateCustomer(customerId: string, customerData: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put(`${this.apiUrl}/${customerId}`, customerData, { headers });
  // }

  // // Delete a customer
  // deleteCustomer(customerId: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${customerId}`);
  // }
}
