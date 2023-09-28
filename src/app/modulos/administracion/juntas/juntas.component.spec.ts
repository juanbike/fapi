import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuntasComponent } from './juntas.component';

describe('JuntasComponent', () => {
  let component: JuntasComponent;
  let fixture: ComponentFixture<JuntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuntasComponent]
    });
    fixture = TestBed.createComponent(JuntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
