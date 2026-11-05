import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLoaderComponent } from './base-loader.component';

describe('BaseLoaderComponent', () => {
  let component: BaseLoaderComponent;
  let fixture: ComponentFixture<BaseLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
