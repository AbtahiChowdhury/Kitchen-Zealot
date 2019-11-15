import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class MenuCartLinkService {

  constructor(private cartServe:CartService) { }
}
