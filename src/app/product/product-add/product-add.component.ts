import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category-service';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  product: Product;
  productAddForm: FormGroup;
  categories:Category[];

  createProductForm()
  {
    this.productAddForm = this.formBuilder.group({
      name:["",Validators.required],
      categoryId:["",Validators.required],
      author:["",Validators.required],
      pageCount:["",Validators.required],
      content:["",Validators.required],
      publisher:["",Validators.required],
      price:["",Validators.required],
      imageUrl:["",Validators.required]
    })
  }
  ngOnInit() {
    this.getCategories();
    this.createProductForm();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  add()
  {
    if(this.productAddForm.valid)
    {
      this.product = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(this.product);
    }
  }

}
