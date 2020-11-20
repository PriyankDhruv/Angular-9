import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelEmpComponent } from './del-emp.component';

describe('DelEmpComponent', () => {
  let component: DelEmpComponent;
  let fixture: ComponentFixture<DelEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
