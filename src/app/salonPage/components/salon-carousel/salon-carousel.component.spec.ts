import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonCarouselComponent } from './salon-carousel.component';

describe('SalonCarouselComponent', () => {
  let component: SalonCarouselComponent;
  let fixture: ComponentFixture<SalonCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
