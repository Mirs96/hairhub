import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonHubComponent } from './salon-hub.component';

describe('SalonHubComponent', () => {
  let component: SalonHubComponent;
  let fixture: ComponentFixture<SalonHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonHubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
