import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Checkout } from '../../../shared/interface/checkout/checkout';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

   CheckOutList:Checkout[]=[]
  cartId!:string;
  constructor(private acticatedRoute:ActivatedRoute, private cart:CartService){
    acticatedRoute.params.subscribe({
      next:(res)=>{
        console.log(res['id'])
        this.cartId = res['id'];
      }
    })
  }
  checkOutForm:FormGroup = new FormGroup({
    details: new FormControl(null),
    city:new FormControl(null),
    phone: new FormControl(null),
  })

  
  sumbitForm(){
     this.cart.checkOut(this.cartId,this.checkOutForm.value).subscribe({
       next:(res)=>{
        console.log(res)
        window.location.href=res.session.url
       }
     })
  }
}
