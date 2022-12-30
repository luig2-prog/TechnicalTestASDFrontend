import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMuestraComponent } from './add-edit-muestra.component';

describe('AddEditMuestraComponent', () => {
  let component: AddEditMuestraComponent;
  let fixture: ComponentFixture<AddEditMuestraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMuestraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
