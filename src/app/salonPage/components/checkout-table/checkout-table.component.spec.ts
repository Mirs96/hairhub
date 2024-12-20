import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTableComponent } from './checkout-table.component';

describe('CheckoutTableComponent', () => {
  let component: CheckoutTableComponent;
  let fixture: ComponentFixture<CheckoutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
