import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from 'src/app/models/item';
import { Mimo } from 'src/app/models/mimo';
import { MimoService } from '../../services/mimo.service';

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

  mimos: Mimo[] = [];
  selectedItem: string = '';

  constructor(private _mimoService: MimoService, private modalService: NgbModal) { }

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

  searchMimo(content: any): void {   

    this._mimoService.getMimos(this.item.description)
      .subscribe(
        (data) => {
          this.mimos = data;
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        },
        (error) => {
          console.error(error);          
        }
      );
  }

  setItemDescription(): void {
    this.modalService.dismissAll();
  }
  
  onItemChange(valueOfDescription: any): void {
    var selectedDescription = valueOfDescription.target.value;
    
    this.item.description = selectedDescription; 
  }

}
