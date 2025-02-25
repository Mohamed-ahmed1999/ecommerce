import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
id:any;
productDetails!:Products;
details: any;

  constructor(private activatedRoute:ActivatedRoute,private product:ProductsService, private cart:CartService, private toastr:ToastrService){
    activatedRoute.params.subscribe(res=>{
      console.log(res['id'])
      this.id = res['id']
    })
  }


  ngOnInit(): void {

    this.getSpasififcProducts();
  }
  getSpasififcProducts(){
    this.product.getSpacificProduct(this.id).subscribe({
      next:(res)=>{
        console.log(res)
        this.productDetails = res.data
      }
    })
  }

  addProduct(productId:string){
    this.cart.addProductToCart(productId).subscribe({
      next:(res)=>{
      console.log(res)
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
