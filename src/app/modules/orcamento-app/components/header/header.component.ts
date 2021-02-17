import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  now: string;

  @Input() quoteId: string;

  constructor() { }

  ngOnInit(): void {
    let dateNow = new Date();
    this.now = dateNow.toLocaleString();    
  }

}
