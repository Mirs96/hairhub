import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalonComponent } from './main-salon.component';

describe('MainSalonComponent', () => {
  let component: MainSalonComponent;
  let fixture: ComponentFixture<MainSalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSalonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
