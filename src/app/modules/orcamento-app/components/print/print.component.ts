import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  quote: Quote;
  totalValue: number;

  constructor() { }

  ngOnInit(): void {
    this.loadQuoteFromStorage();
    window.print();
  }

  loadQuoteFromStorage(): void {
    this.quote = JSON.parse(localStorage.getItem('quote'));
    this.totalValue = this.quote.freight + this.quote.value;
  }
}
