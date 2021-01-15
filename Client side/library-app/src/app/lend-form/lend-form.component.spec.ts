import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendFormComponent } from './lend-form.component';

describe('LendFormComponent', () => {
  let component: LendFormComponent;
  let fixture: ComponentFixture<LendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
