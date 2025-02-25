import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseUrl';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token: any
  cartNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id: object) {

    if (isPlatformBrowser(Id)) {
      this.token = { token: localStorage.getItem('userToken') || '' }
    }

    this.getProductToCart().subscribe({
      next: (res) => {
        this.cartNumber.next(res.numOfCartItems)
      }
    })
  }

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(`${baseUrl.BaseUrl}/cart`,
      { productId: productId },
      {
        headers:this.token
       }



    )

  }

  getProductToCart(): Observable<any> {
    return this.http.get(`${baseUrl.BaseUrl}/cart`,
      {
        headers:this.token
       }



    )

  }

  updateProductToCart(productId: string, count: number): Observable<any> {
    return this.http.put(`${baseUrl.BaseUrl}/cart/${productId}`,
      { count: count },
      {
        headers:this.token
       }



    )

  }


  removeProduct(productId: string): Observable<any> {
    return this.http.delete(`${baseUrl.BaseUrl}/cart/${productId}`,
       {
        headers:this.token
       }


    )

  }


  clearCart(): Observable<any> {
    return this.http.delete(`${baseUrl.BaseUrl}/cart`,
      {
        headers:this.token
       }


    )

  }

  checkOut(cartId: any, payload: any): Observable<any> {
    return this.http.post(`${baseUrl.BaseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddres: payload
    },
    {
      headers:this.token
     }
    )

  }




}
