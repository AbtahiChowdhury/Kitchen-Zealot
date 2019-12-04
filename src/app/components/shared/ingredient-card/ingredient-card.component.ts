import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientsCartService } from 'src/app/services/ingredients-cart.service';

@Component({
  selector: 'ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.css']
})

export class IngredientCardComponent implements OnInit,OnDestroy {

  @Input('ingredient') ingredient: Ingredient;
  quantity:number = 0;
  quantity$:Subscription;
  constructor(private cartServe:IngredientsCartService) { }

  addToCart()
  {
    this.cartServe.addToCart(this.ingredient);
  }

  removeFromCart()
  {
    this.cartServe.removeFromCart(this.ingredient);
  }

  updateQuantity()
  {
    this.quantity$ = this.cartServe.getEmployee().subscribe(employee=>{
      if(!employee.supplyCart)
        employee.supplyCart = new Array();
      for(let cartItem of employee.supplyCart)
      {
        if(cartItem.ingredient.uid == this.ingredient.uid)
        {
          this.quantity = cartItem.quantity;
          return;
        }
      }
      this.quantity = 0;
    })
  }

  ngOnInit() 
  {
    this.updateQuantity();
  }

  ngOnDestroy()
  {
    this.quantity$.unsubscribe();
  }

}
