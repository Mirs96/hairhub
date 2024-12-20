import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonTitleComponent } from './salon-title.component';

describe('SalonTitleComponent', () => {
  let component: SalonTitleComponent;
  let fixture: ComponentFixture<SalonTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
