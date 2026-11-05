import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTreatmentSapEntryComponent } from './heat-treatment-sap-entry.component';

describe('HeatTreatmentSapEntryComponent', () => {
  let component: HeatTreatmentSapEntryComponent;
  let fixture: ComponentFixture<HeatTreatmentSapEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeatTreatmentSapEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeatTreatmentSapEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
