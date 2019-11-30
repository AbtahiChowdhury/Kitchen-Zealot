import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit,OnDestroy
{
  id:string;
  product:Product = {title:"",price:null,imageUrl:""};
  subscription:Subscription;
  constructor(private productServe:ProductService,private aRoute:ActivatedRoute,private router:Router,private authServe:AuthService) 
  { 
    this.id = this.aRoute.snapshot.paramMap.get("uid");
    if(this.id)
      this.subscription = this.productServe.lookup(this.id).subscribe(p =>{
        this.product = p;
      })
  }

  save(formValue)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.product.addedBy = user.uid;
      this.product.title = formValue.title;
      this.product.price = formValue.price;
      this.product.imageUrl = formValue.imageUrl;
      this.product.averageRating = null;
      this.product.status = "ACTIVE";
      this.product.category = formValue.category;
      if(this.id)
      {
        this.productServe.update(this.id,this.product);
      }
      else
      {
        this.productServe.create(this.product);
      }
      
      this.router.navigateByUrl("/cook/modify-menu");
    })
  }

  delete()
  {
    if(confirm('Are you sure you want to delete this product'))
    {
      this.productServe.delete(this.id);
      this.router.navigateByUrl("/cook/modify-menu");
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.id)
      this.subscription.unsubscribe();
  }

}
