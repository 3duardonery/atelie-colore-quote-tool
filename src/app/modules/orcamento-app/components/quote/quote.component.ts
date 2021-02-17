import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';

import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  addItemFormIsVisibled: boolean = false;
  address: Address = {
    city: '',
    complement: '',
    neighborhood: '',
    number: '',
    state: '',
    street: ''
  };
  customer: Customer = {
    cpf: '',
    name: '',
    phone: ''
  };  
  order: Order = {
    deliveryUntil: '',
    owner: '',
    printAge: '',
    printName: '',
    requestAt: '',
    theme: '',
    height: ''
  };
  item: Item = {
    description: '',
    paper: '',
    quantity: 0,
    state: '',
    totalValue: 0,
    unitValue: 0
  };
  items: Array<Item> = [];
  quote: Quote = {
    address: this.address,
    customer: this.customer,
    items: this.items,
    order: this.order,
    quantity: 0,
    value: 0,
    id: ''
  };
  quoteFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    this.quoteFormGroup = this._formBuilder
      .group({
        customerName: new FormControl(this.quote.customer.name, [Validators.required]),
        cpf: new FormControl(this.customer.cpf),
        phone: new FormControl(this.customer.phone),
        address: new FormControl(this.address.street),
        number: new FormControl(this.address.number),
        complement: new FormControl(this.address.complement),
        neighborhood: new FormControl(this.address.neighborhood),
        city: new FormControl(this.address.city),
        state: new FormControl(this.address.state),
        printName: new FormControl(this.order.printName),
        requestAt: new FormControl(this.order.requestAt),
        deliveryAt: new FormControl(this.order.deliveryUntil),
        theme: new FormControl(this.order.theme),
        printAge: new FormControl(this.order.printAge),
        seller: new FormControl(this.order.owner),        
      });
  }

  showAddItemForm(): void {
    this.addItemFormIsVisibled = true;
  }

  printQuote(value: FormData): void {
    console.log(value);    
  }

  addNewItem(item: Item): void {
    this.items.push(item);
  }

  hideAddItemForm(hide: boolean): void {
    this.addItemFormIsVisibled = hide;
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

}
