import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPlato } from './agregar-plato';

describe('AgregarPlato', () => {
  let component: AgregarPlato;
  let fixture: ComponentFixture<AgregarPlato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPlato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPlato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
