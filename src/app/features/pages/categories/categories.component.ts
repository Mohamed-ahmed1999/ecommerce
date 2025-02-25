import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../shared/interface/category';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoriesList:Category[]=[]
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
  this.getAllCategory()
  }


  getAllCategory(){

    this.categoriesService.getCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.categoriesList = res.data;
        console.log(res.data)

      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
