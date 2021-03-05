import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcamentoAppComponent } from './orcamento-app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { QuoteComponent } from './components/quote/quote.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintComponent } from './components/print/print.component';
import { NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,    
  },
  {
    path: 'print',
    component: PrintComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    OrcamentoAppComponent, 
    HomeComponent, 
    HeaderComponent, 
    QuoteComponent, 
    FooterComponent, 
    ItemFormComponent, PrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbTypeaheadModule,
    NgbModalModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class OrcamentoAppModule { }
