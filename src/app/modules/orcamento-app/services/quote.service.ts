import { Injectable } from '@angular/core';
import { Quote } from 'src/app/models/quote';

const QUOTE_KEY: string = 'quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor() { }

  saveQuote(quote: Quote): void {
    this.clearQuote();
    localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
  }

  loadQuote(): Quote {
    let quote = JSON.parse(localStorage.get(QUOTE_KEY));
    return quote;
  }

  clearQuote(): void {
    localStorage.removeItem(QUOTE_KEY);
  }
}
