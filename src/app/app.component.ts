import { Component, OnInit } from '@angular/core';
import { ApiService, IProduct } from './api.service';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,JsonPipe,CommonModule,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: any = null;
  error: string = '';

  constructor(public service: ApiService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe(data=>{
    this.service.AllProducts=data;
    })
    

  }

  Edit(id:string)
  {
    this.service.Product=(this.service.AllProducts.find(x => x._id == id)) as IProduct;
  }
  Delete(id:string)
  {
    this.service.DeleteEmployee(id).subscribe(data=>{
  
      this.service.getProducts().subscribe(data=>{
        this.service.AllProducts=data;
         
        })
     
         
      })
  }

  ProductAdd(Product:IProduct)
  {
    
  this.service.SaveEmployee(Product).subscribe(data=>{
  
  this.service.getProducts().subscribe(data=>{
    this.service.AllProducts=data;
     
    })
 
    this.service.Product._id='';
    this.service.Product.name='';
    this.service.Product.image='';
    this.service.Product.price=0;
  })
  }

}
