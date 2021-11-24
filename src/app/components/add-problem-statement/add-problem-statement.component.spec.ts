import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProblemStatementComponent } from './add-problem-statement.component';

describe('AddProblemStatementComponent', () => {
  let component: AddProblemStatementComponent;
  let fixture: ComponentFixture<AddProblemStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProblemStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProblemStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
