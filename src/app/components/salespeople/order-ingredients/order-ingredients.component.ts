import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { IngredientCartItem } from 'src/app/interfaces/ingredient-cart-item';
import { IngredientsCartService } from 'src/app/services/ingredients-cart.service';
import { take } from 'rxjs/operators';
import { SupplyOrdersService } from 'src/app/services/supply-orders.service';
import { SupplyOrder } from 'src/app/interfaces/supply-order';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-order-ingredients',
  templateUrl: './order-ingredients.component.html',
  styleUrls: ['./order-ingredients.component.css']
})
export class OrderIngredientsComponent implements OnInit,OnDestroy {
  supplyCart$:Subscription;
  subtotal:number = 0;
  tax:number = 0;
  total:number = 0;
  supplyCart:IngredientCartItem[] = null;
  ingredients$:Observable<Ingredient[]>;
  constructor(private ingredientServe:IngredientsService,private cartServe:IngredientsCartService,private orderServe:SupplyOrdersService,private router:Router,private emplServe:EmployeeService) { 
    this.ingredients$ = this.ingredientServe.ingredientsObservable;
  }

  ngOnInit() 
  {
    this.supplyCart$ = this.cartServe.getEmployee().subscribe(employee=>{
      this.supplyCart = employee.supplyCart;
      this.subtotal = 0;
      for(let cartItem of employee.supplyCart)
      {
        this.subtotal += cartItem.ingredient.price * cartItem.quantity;
      }
      this.tax = this.subtotal * .08875;
      this.total = this.subtotal+this.tax;
    });
  }

  order()
  {
    this.cartServe.getEmployee().pipe(take(1)).subscribe(employee=>{
      let tempOrder:SupplyOrder = {
        orderedOn:new Date(),
        orderedBy:employee.uid,
        contents:employee.supplyCart
      }
      this.orderServe.create(tempOrder);
      employee.supplyCart = [];
      this.emplServe.updateEmployee(employee.uid,employee);
      this.router.navigateByUrl("/salesperson/requested");
    })
  }

  removeAll(ingredient:Ingredient)
  {
    this.cartServe.getEmployee().pipe(take(1)).subscribe(employee=>{
      for(let i = 0;i<employee.supplyCart.length;i++)
      {
        if(employee.supplyCart[i].ingredient.uid == ingredient.uid)
        {
          employee.supplyCart.splice(i,1);
          this.cartServe.updateCart(employee);
          return;
        }
    }
  })
  }

  ngOnDestroy()
  {
    this.supplyCart$.unsubscribe();
  }


}
