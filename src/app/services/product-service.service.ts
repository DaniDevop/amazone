import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAllProduct } from '../utils/Api';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private url=""
  constructor(private httpClient:HttpClient) { }



  getAllProduct(){
    return this.httpClient.get(getAllProduct)
  }
}
