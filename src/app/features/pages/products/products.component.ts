import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe,UpperCasePipe,FilterPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
          
  searchValue: string ='';

  ProductList:Products[]=[];
  constructor(private product:ProductsService, private cart:CartService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.product.getProducts().subscribe({
      next:(res)=>{
        this.ProductList = res.data;
        console.log(res.data);
      },error:(err)=>{
        console.log(err)
      }
    })
  }



  addProduct(productId:string){
    this.cart.addProductToCart(productId).subscribe({
      next:(res)=>{
      console.log(res)
      this.cart.cartNumber.next(res.numOfCartItems)
      this.toastr.success(res.message,'success',{
        closeButton:true,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-left'
      })
      }
    })
  }
}
