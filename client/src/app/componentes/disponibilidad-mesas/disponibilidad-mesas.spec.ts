import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadMesas } from './disponibilidad-mesas';

describe('DisponibilidadMesas', () => {
  let component: DisponibilidadMesas;
  let fixture: ComponentFixture<DisponibilidadMesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibilidadMesas],
    }).compileComponents();

    fixture = TestBed.createComponent(DisponibilidadMesas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
