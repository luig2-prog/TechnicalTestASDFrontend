import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesTableComponent } from './clientes-table.component';

describe('ClientesTableComponent', () => {
  let component: ClientesTableComponent;
  let fixture: ComponentFixture<ClientesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
