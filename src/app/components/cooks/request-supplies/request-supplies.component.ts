import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Observable } from 'rxjs';
import { IngredientCartItem } from 'src/app/interfaces/ingredient-cart-item';
import { take, isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-request-supplies',
  templateUrl: './request-supplies.component.html',
  styleUrls: ['./request-supplies.component.css']
})
export class RequestSuppliesComponent implements OnInit 
{
  inventory$:Observable<IngredientCartItem[]>;
  constructor(private inventoryServe:InventoryService) 
  { 
    this.inventory$ = this.inventoryServe.inventoryObservable;
  }

  ngOnInit(){
  }

  addRequested(inventoryItem:IngredientCartItem)
  {
    inventoryItem.requestedQuantity += 1;
    this.inventoryServe.update(inventoryItem);
  }

  removeRequested(inventoryItem:IngredientCartItem)
  {
    inventoryItem.requestedQuantity -= 1;
    if(inventoryItem.requestedQuantity < 0)
        inventoryItem.requestedQuantity = 0;
      this.inventoryServe.update(inventoryItem);
  }

  request()
  {
    
  }

}
