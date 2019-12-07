import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { IngredientCartItem } from 'src/app/interfaces/ingredient-cart-item';
import { IngredientsCartService } from 'src/app/services/ingredients-cart.service';
import { take } from 'rxjs/operators';

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
  constructor(private ingredientServe:IngredientsService,private cartServe:IngredientsCartService) { 
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
