import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableCrudIndexdbComponent } from './table-crud-indexdb/table-crud-indexdb.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TableCrudIndexdbComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{ provide: Window, useValue: window }]
})
export class AppModule { }
