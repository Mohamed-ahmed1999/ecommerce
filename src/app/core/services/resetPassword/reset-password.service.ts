import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../../shared/interface/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }
  
  verfyEmail(payload:Auth):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,payload)
  }

  verfyCode(payload:Auth):Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,payload)
  }

  restPassword(payload:Auth):Observable<any>{
    return this.http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,payload)
  }
}
