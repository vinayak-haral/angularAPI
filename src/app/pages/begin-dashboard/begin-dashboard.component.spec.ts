import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginDashboardComponent } from './begin-dashboard.component';

describe('BeginDashboardComponent', () => {
  let component: BeginDashboardComponent;
  let fixture: ComponentFixture<BeginDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
