import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { Observable } from 'rxjs';
import { IngredientCartItem } from 'src/app/interfaces/ingredient-cart-item';
import { take } from 'rxjs/operators';
import { SupplyRequestsService } from 'src/app/services/supply-requests.service';
import { SupplyRequest } from 'src/app/interfaces/supply-request';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-request-supplies',
  templateUrl: './request-supplies.component.html',
  styleUrls: ['./request-supplies.component.css']
})
export class RequestSuppliesComponent implements OnInit 
{
  inventory$:Observable<IngredientCartItem[]>;
  requests$:Observable<SupplyRequest[]>;
  userid:string;
  constructor(private inventoryServe:InventoryService,private supplyRequestsServe:SupplyRequestsService,private authServe:AuthService,private emplServe:EmployeeService) 
  { 
    this.inventory$ = this.inventoryServe.inventoryObservable;
    this.authServe.user$.pipe(take(1)).subscribe(user=>{ 
      this.userid = user.uid
    });

    this.requests$ = this.supplyRequestsServe.requestsObservable;
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
    this.inventoryServe.dummyChange();
    this.inventoryServe.inventoryObservable.pipe(take(1)).subscribe(inventory=>{
      let contentsTemp = new Array();
      for(let item of inventory)
      {
        if(item.requestedQuantity != 0)
        {
          let copy = Object.assign({}, item);
          contentsTemp.push(copy);
          item.requestedQuantity = 0;
          this.inventoryServe.update(item);
        }
      }
      let request:SupplyRequest =
      {
        requestedBy: this.userid,
        requestedOn: new Date(),
        status:"Requested",
        contents:contentsTemp
      } 
      this.supplyRequestsServe.create(request);
    });
  }

  supplyRatingChange(request:SupplyRequest,value:string)
  {
    request.supplyRating = Number(value);
    this.supplyRequestsServe.update(request);
    this.emplServe.updateAverageSalesRating(request.completedBy);
  }

}
