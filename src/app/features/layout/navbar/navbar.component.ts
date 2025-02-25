import { Component, Input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  isLogin:boolean = false;

      cartNumber!:number;
  constructor(public _AuthService:AuthService, private cart:CartService){}

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:(res)=>{
        if(res !== null){
          this.isLogin = true; 

        }else{
          this.isLogin = false;
        }
      }
    })
  
this.cart.cartNumber.subscribe({
  next:(res)=>{
    this.cartNumber = res

  }
})
  }
}
