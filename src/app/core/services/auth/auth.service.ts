import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser() {
    return this.userData.asObservable();
  }
  

userData:BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);
  constructor(private _http:HttpClient,@Inject(PLATFORM_ID) Id:object,private router:Router) { 

    if(isPlatformBrowser(Id)){
      if(localStorage.getItem('userToken') !== null){
        this.decodeUserData()
      }
    }
  }


  register(FormData:Auth):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,FormData)
  }

  login(FormData:Auth){
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,FormData)
  }
  
  decodeUserData(){
    const token = localStorage.getItem('userToken')||'';
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log(this.userData)

  }


  logOut(){

    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/login'])
  }
}
