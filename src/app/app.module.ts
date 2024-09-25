import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from './layout/layout.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonDialogContentComponent } from './shared/shared-component/common-dialog-content/common-dialog-content.component';
import { MaterialModule } from './shared/shared-module/material/material.module';
import { LoaderComponent } from './shared/shared-component/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    CommonDialogContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
