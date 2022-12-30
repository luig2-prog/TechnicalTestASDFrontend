import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasTableComponent } from './maestras-table.component';

describe('MaestrasTableComponent', () => {
  let component: MaestrasTableComponent;
  let fixture: ComponentFixture<MaestrasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestrasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
