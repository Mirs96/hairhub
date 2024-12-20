import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonMapComponent } from './salon-map.component';

describe('SalonMapComponent', () => {
  let component: SalonMapComponent;
  let fixture: ComponentFixture<SalonMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
