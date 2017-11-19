import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FloorData } from './floor-data';
import { requestOptionsProvider } from './default-request-options.service';

import { AppComponent } from './app.component';

import { FloorListComponent } from './floor/floor-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    // InMemoryWebApiModule.forRoot(FloorData),
    MaterialModule
  ],
  declarations: [
    AppComponent,
    FloorListComponent
  ],
  providers: [requestOptionsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

