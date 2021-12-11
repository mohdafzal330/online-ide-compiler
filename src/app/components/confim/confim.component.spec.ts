import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimComponent } from './confim.component';

describe('ConfimComponent', () => {
  let component: ConfimComponent;
  let fixture: ComponentFixture<ConfimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
