import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { EmployeeService } from './employee.service';
import { Ingredient } from '../interfaces/ingredient';
import { take, switchMap } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class IngredientsCartService 
{
  constructor(private authServe:AuthService,private emplServe:EmployeeService) 
  { 

  }

  addToCart(ingredient:Ingredient)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.emplServe.getEmployee(user.uid).pipe(take(1)).subscribe(employee=>{
        if(!employee.supplyCart)
          employee.supplyCart = new Array();
        for(let cartItem of employee.supplyCart)
        {
          if(cartItem.ingredient.uid == ingredient.uid)
          {
            cartItem.quantity += 1;
            this.emplServe.updateEmployee(user.uid,employee);
            return;
          }
        }
        employee.supplyCart.push({ingredient:ingredient,quantity:1});
        this.emplServe.updateEmployee(user.uid,employee);
      });
    });
  }

  removeFromCart(ingredient:Ingredient)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.emplServe.getEmployee(user.uid).pipe(take(1)).subscribe(employee=>{
        for(let cartIndex = 0;cartIndex<employee.supplyCart.length;cartIndex++)
        {
          if(employee.supplyCart[cartIndex].ingredient.uid == ingredient.uid)
          {
            employee.supplyCart[cartIndex].quantity -= 1;
            if(employee.supplyCart[cartIndex].quantity == 0)
            {
              employee.supplyCart.splice(cartIndex,1);
            }
            this.emplServe.updateEmployee(user.uid,employee);
            return;
          }
        }
      });
    });
  }

  getEmployee()
  {
    return this.authServe.user$.pipe(switchMap(user=>{
      return this.emplServe.getEmployee(user.uid)
    }));
  }
  updateCart(employee:Employee)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.emplServe.updateEmployee(user.uid,employee);
    })
  }
  
}
