import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsalonComponent } from './topsalon.component';

describe('TopsalonComponent', () => {
  let component: TopsalonComponent;
  let fixture: ComponentFixture<TopsalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopsalonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopsalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
