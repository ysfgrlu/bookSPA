import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { NgxEditorModule } from 'ngx-editor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { BasketComponent } from './basket/basket.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserOperationsComponent } from './user-operations/user-operations.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    NavComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductFilterPipe,
    ProductAddComponent,
    BasketComponent,
    ProductListComponent,
    ProductEditComponent,
    UserOperationsComponent,
    AdminLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
