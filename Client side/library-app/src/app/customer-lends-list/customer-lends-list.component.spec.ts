import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLendsListComponent } from './customer-lends-list.component';

describe('CustomerLendsListComponent', () => {
  let component: CustomerLendsListComponent;
  let fixture: ComponentFixture<CustomerLendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
