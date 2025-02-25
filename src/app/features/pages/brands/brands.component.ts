import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { Brands } from '../../../shared/interface/brands/brands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  BrandsList:Brands[]=[]
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
   this.getAllBrands()
  }

  getAllBrands(){
    this.brandService.getBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.BrandsList = res.data;
        console.log(res.data)
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}