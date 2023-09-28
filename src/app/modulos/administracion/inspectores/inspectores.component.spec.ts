import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectoresComponent } from './inspectores.component';

describe('InspectoresComponent', () => {
  let component: InspectoresComponent;
  let fixture: ComponentFixture<InspectoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectoresComponent]
    });
    fixture = TestBed.createComponent(InspectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
