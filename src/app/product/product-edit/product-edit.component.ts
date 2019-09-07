import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  product: Product = new Product();
  productId:number;
  productEditForm: FormGroup;
  categories: Category[];

  createProductForm()
  {
    this.productEditForm = this.formBuilder.group({
      name:[this.product.name,Validators.required],
      categoryId:[this.product.categoryId,Validators.required],
      author:[this.product.author,Validators.required],
      pageCount:[this.product.pageCount,Validators.required],
      content:[this.product.content,Validators.required],
      publisher:[this.product.publisher,Validators.required],
      price:[this.product.price,Validators.required]
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getProductById(params['productId']);
      this.productId = params['productId'];
    });
    this.createProductForm();
    this.getCategories();
  }

  getProductById(productId) {
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
      this.createProductForm(); //ngoninit hatayı kaldırıyor
    });
    
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  edit()
  {
    if(this.productEditForm.valid)
    {
      this.product = Object.assign({},this.productEditForm.value);
      this.productService.updateProduct(this.productId,this.product);
    }
  }
}
