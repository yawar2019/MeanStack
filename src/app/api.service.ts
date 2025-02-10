import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface IProduct
{
  _id:'',
  name:'',
  price:0,
  image:''
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  url="http://localhost:5000/";
  Product:IProduct={
    _id: '',
    name: '',
    price: 0,
    image: ''
  };
  AllProducts:IProduct[]=[];

  constructor(private http: HttpClient) {}

  // Method to fetch data from an API
  

  getProducts():Observable<any>
{
return this.http.get(this.url+'api/products');
}

SaveEmployee(Product:IProduct):Observable<any>
{
  if(Product._id)
    {
      return this.http.put(this.url+'api/products/'+Product._id,Product);
    }
    else{
      return this.http.post(this.url+'api/products',Product);
    }
}


DeleteEmployee(Id:any):Observable<any>
{
return this.http.delete(this.url+'api/products/'+Id);
}


}
