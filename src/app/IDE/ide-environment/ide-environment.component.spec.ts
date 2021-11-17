import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeEnvironmentComponent } from './ide-environment.component';

describe('IdeEnvironmentComponent', () => {
  let component: IdeEnvironmentComponent;
  let fixture: ComponentFixture<IdeEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeEnvironmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
