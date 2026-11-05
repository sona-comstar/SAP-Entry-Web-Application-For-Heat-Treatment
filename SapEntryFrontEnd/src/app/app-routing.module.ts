import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeatTreatmentSapEntryComponent} from "./heat-treatment-sap-entry/heat-treatment-sap-entry.component";
import { GearShopSapEntryComponent } from './gear-shop-sap-entry/gear-shop-sap-entry.component';

const routes: Routes = [
  { path: '', component: GearShopSapEntryComponent },
  //  { path: 'gear-shop', component: GearShopSapEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
