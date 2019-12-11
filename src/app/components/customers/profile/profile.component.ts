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
  customerCVV:string = "";
  customerExpirationDate:string = "";
  customerCart:CartItem[] = null;
  customerRank:string = "";

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
      this.customerNameOnCard = customer.paymentDetails.nameOnCard;
      this.customerCardNumber = customer.paymentDetails.cardNumber;
      this.customerCVV = customer.paymentDetails.CVV;
      this.customerExpirationDate = customer.paymentDetails.expirationDate;
      this.customerCart = customer.shoppingCart;
      this.customerRank = customer.rank;
    })

  }


  ngOnInit() {
  }

  update(formValue)
  {
    let tempCust:Customer = {
      uid: this.userUid,
      address: formValue.address,
      paymentDetails:{
        cardNumber: formValue.cardNumber,
        CVV: formValue.CVV,
        nameOnCard: formValue.nameOnCard,
        expirationDate: formValue.expirationDate
      },
      shoppingCart: this.customerCart
    }
    this.custServe.updateCustomer((this.userUid.trim()),tempCust);
  }
}
