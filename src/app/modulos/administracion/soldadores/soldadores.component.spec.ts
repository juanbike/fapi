import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldadoresComponent } from './soldadores.component';

describe('SoldadoresComponent', () => {
  let component: SoldadoresComponent;
  let fixture: ComponentFixture<SoldadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldadoresComponent]
    });
    fixture = TestBed.createComponent(SoldadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
