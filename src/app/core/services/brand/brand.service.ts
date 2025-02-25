import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

constructor(private http:HttpClient) { }

  getBrands():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  getSpecificBrands(id:string):Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
}

