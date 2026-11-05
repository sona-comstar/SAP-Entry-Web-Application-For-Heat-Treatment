import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearShopSapEntryComponent } from './gear-shop-sap-entry.component';

describe('GearShopSapEntryComponent', () => {
  let component: GearShopSapEntryComponent;
  let fixture: ComponentFixture<GearShopSapEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GearShopSapEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GearShopSapEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
