import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';

import { Quote } from 'src/app/models/quote';
import { Uf } from 'src/app/models/uf';
import { LocalStorageService } from '../../services/local-storage.service';
import { QuoteService } from '../../services/quote.service';
import { UfService } from '../../services/uf.service';

const ufKey = 'ufs';

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
    theme: ''
  };
  item: Item = {
    description: '',
    paper: '',
    quantity: 0,
    state: '',
    totalValue: 0,
    unitValue: 0,
    height: ''
  };
  items: Array<Item> = [];
  quote: Quote = {
    address: this.address,
    customer: this.customer,
    items: this.items,
    order: this.order,
    quantity: 0,
    value: 0,
    id: '',
    freight: 0
  };
  quoteFormGroup: FormGroup;

  ufs: Uf[] = [];

  

  @Input() quoteId: string;

  constructor(private _formBuilder: FormBuilder, 
    private _router: Router, 
    private _quoteService: QuoteService,
    private _ufService: UfService,
    private _localStorage: LocalStorageService) { }

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
        freight: new FormControl(this.quote.freight)       
      });

      this.getUfFromFunction();     
  }

  getUfFromFunction()  {
    
    if (this._localStorage.getItem(ufKey) == null) {
      this._ufService.getUf()
        .subscribe(
          (data) => {
            this.ufs = data;
            this._localStorage.saveItem(ufKey, this.ufs);
            console.log(this.ufs);
                     
          },
          (error) => {
            console.error(error);            
          }
        );        
    } else {
      this.ufs = this._localStorage.getItem(ufKey);
    }
  }

  showAddItemForm(): void {
    this.addItemFormIsVisibled = true;
  }

  printQuote(value: FormData): void {
    this.address.street = value['address'];
    this.address.number = value['number'];
    this.address.neighborhood = value['neighborhood'];
    this.address.complement = value['complement'];
    this.address.city = value['city'];
    this.address.state = value['state'];

    this.order.deliveryUntil = value['deliveryAt'];
    this.order.owner = value['seller'];
    this.order.printAge = value['printAge'];
    this.order.printName = value['printName'];
    this.order.requestAt = value['requestAt'];
    this.order.theme = value['theme'];

    this.customer.cpf = value['cpf'];
    this.customer.name = value['customerName'];
    this.customer.phone = value['phone'];

    this.quote.freight = Number.parseFloat(value['freight']);

    this.quote.address = this.address;
    this.quote.order = this.order;
    this.quote.customer = this.customer;
    this.quote.items = this.items;
    this.quote.id = this.quoteId;
    let totalUnit = 0;
    let totalValue = 0;
    this.quote.items.forEach(x => {
      totalUnit += x.quantity;
      totalValue += x.totalValue;
    });
    this.quote.quantity = totalUnit;
    this.quote.value = totalValue;

    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/home/print'])
    );

    this._quoteService.saveQuote(this.quote);

    window.open(url, "_blank");
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
