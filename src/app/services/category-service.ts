import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
  })
export class CategoryService {
    constructor(private httpClient: HttpClient){}

    path = "http://localhost:8000/api/";

    getCategories():Observable<Category[]>{
        return this.httpClient.get<Category[]>(this.path+'categories');
    }
}
