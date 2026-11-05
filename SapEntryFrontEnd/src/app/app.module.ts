import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeatTreatmentSapEntryComponent } from './heat-treatment-sap-entry/heat-treatment-sap-entry.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {VirtualScrollerModule} from "primeng/virtualscroller";
import { DialogModule } from 'primeng/dialog';
import {BaseLoaderComponent} from "./base-loader/base-loader.component";
import { FloatLabelModule } from 'primeng/floatlabel'; 
import { MessageService } from 'primeng/api';
import { GearShopSapEntryComponent } from './gear-shop-sap-entry/gear-shop-sap-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    HeatTreatmentSapEntryComponent,
    GearShopSapEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    RippleModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    BaseLoaderComponent,
    VirtualScrollerModule,
    DialogModule,
    FloatLabelModule,
  ],
  providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
