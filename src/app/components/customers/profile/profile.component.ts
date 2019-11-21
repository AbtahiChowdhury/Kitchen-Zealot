import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { take } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/customer';
import { CartItem } from 'src/app/interfaces/cart-item';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{
  userUid:string = "";
  userName:string = "";
  userPhone:string = "";
  userEmail:string = "";
  customerAddress:string = "";
  customerNameOnCard:string = "";
  customerCardNumber:string = "";
  customerCVV:number = 0;
  customerExpirationDate:string = "";
  customerCart:CartItem[] = null;

  constructor(private custServe:CustomerService) 
  { 
    this.custServe.getCurrentUser().pipe(take(1)).subscribe(user=>{
      this.userUid = user.uid;
      this.userName = user.name;
      this.userPhone = user.phone;
      this.userEmail = user.email;
    })

    this.custServe.getCurrentCustomer().pipe(take(1)).subscribe(customer=>{
      this.customerAddress = customer.address;
      this.customerNameOnCard = customer.nameOnCard;
      this.customerCardNumber = customer.cardNumber;
      this.customerCVV = customer.CVV;
      this.customerExpirationDate = customer.expirationDate;
      this.customerCart = customer.shoppingCart;
    })

  }

  ngOnInit() {
  }

  update(formValue)
  {
    let tempCust:Customer = {
      uid: this.userUid,
      address: formValue.address,
      cardNumber: formValue.cardNumber,
      CVV: formValue.CVV,
      nameOnCard: formValue.nameOnCard,
      expirationDate: formValue.expirationDate,
      shoppingCart: this.customerCart
    }
    this.custServe.updateCustomer(this.userUid.trim(),tempCust);
  }
}
