import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  setempId(empCode: any) {
    throw new Error('Method not implemented.');
  }

  private baseUrlmst = environment.baseUrlmst;

  private consentDetails = new BehaviorSubject('');
  public consentDetailsCast = this.consentDetails.asObservable();

  constructor(private http: HttpClient) {
  }

  postmst(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(this.baseUrlmst + endpoint, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }

  userInfo(): any {
    let token: any;
    const IsEss = sessionStorage.getItem('landtoken');
    token = IsEss === '0' ? sessionStorage.getItem('MpJwtToken') : sessionStorage.getItem('jwt_token');
    if (token !== null) {
      return
      // jwt_decode(token);
    }
  }
}
