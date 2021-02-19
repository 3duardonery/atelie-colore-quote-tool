import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  @Input() visibled: boolean;
  @Output() addItem = new EventEmitter<Item>();
  @Output() hide = new EventEmitter<boolean>();

  item: Item = {
    description: '',
    paper: '',
    quantity: 0,
    state: '', 
    totalValue: 0,
    unitValue: 0,
    height: 'Tradicional'
  }

  constructor() { }

  ngOnInit(): void {
  }

  addNewItem(): void {
    this.calculate();
    this.addItem.emit({...this.item});
  }

  cancel(hide: boolean): void {
    this.hide.emit(false);
  }

  calculate(): void {
    this.item.totalValue = this.item.unitValue * this.item.quantity;
  }

}
