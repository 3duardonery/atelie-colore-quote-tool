import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quoteId: string;

  constructor() { }

  ngOnInit(): void {
    this.quoteId = Guid.create().toString().split('-')[0];
  }

}
