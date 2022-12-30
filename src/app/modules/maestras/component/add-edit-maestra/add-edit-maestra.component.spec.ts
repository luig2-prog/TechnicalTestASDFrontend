import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMaestraComponent } from './add-edit-maestra.component';

describe('AddEditMaestraComponent', () => {
  let component: AddEditMaestraComponent;
  let fixture: ComponentFixture<AddEditMaestraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMaestraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMaestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
