import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { BasketComponent } from './basket/basket.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserOperationsComponent } from './user-operations/user-operations.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'productDetail/:productId', component: ProductDetailComponent },
      { path: 'products/:categoryId', component: ProductComponent },
      { path: 'product', component: ProductComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'users', component: UserOperationsComponent },
      { path: '', component: ProductComponent }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'productList', component: ProductListComponent },
      { path: 'productAdd', component: ProductAddComponent },
      { path: 'productEdit/:productId', component: ProductEditComponent },
      { path: 'admin', component: ProductListComponent, pathMatch: 'full' }

    ]
  },
  { path: '**', component: MainLayoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
