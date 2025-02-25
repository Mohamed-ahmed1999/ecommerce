import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../shared/interface/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  imports: [ProductsComponent,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categoriesList:Category[]=[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customMainOptions: OwlOptions ={
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
     items:1,
    nav: true
  }



  constructor(private category:CategoriesService) { }
  ngOnInit(): void {

    this.getCategories()

  }


  getCategories() {
    this.category.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList=res.data
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
