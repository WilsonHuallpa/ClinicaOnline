import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuClinicaComponent } from './menu-clinica.component';

describe('MenuClinicaComponent', () => {
  let component: MenuClinicaComponent;
  let fixture: ComponentFixture<MenuClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuClinicaComponent]
    });
    fixture = TestBed.createComponent(MenuClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
