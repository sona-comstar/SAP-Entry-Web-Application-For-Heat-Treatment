import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SapServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitEntry(data: any): Observable<any> {
    const url = `${this.apiUrl}/heatTreatment`
    return this.http.post(url, data);
  }
  getDropdownValues(): Observable<{ [key: string]: string }> {
    const url = `${this.apiUrl}/dropdown`;
    return this.http.get<{ [key: string]: string }>(url);
  }
// Add this method to fetch sheet names
getSheetNames(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/sheet-names`);
}

// Modify the existing method to accept a parameter
getDropdownValuesForGearShop(sheetName: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/dropdownGearShop`, {
    params: { sheetName: sheetName }
  });
}
  // // Gear Shop API's

  // getDropdownValuesForGearShop(): Observable<{ [key: string]: string }> {
  //   const url = `${this.apiUrl}/dropdownGearShop`;
  //   return this.http.get<{ [key: string]: string }>(url);
  // }

  submitEntryGearShop(data: any): Observable<any> {
    const url = `${this.apiUrl}/gearShop`
    return this.http.post(url, data);
  }

}
