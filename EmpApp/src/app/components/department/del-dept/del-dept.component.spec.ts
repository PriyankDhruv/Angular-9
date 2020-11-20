import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelDeptComponent } from './del-dept.component';

describe('DelDeptComponent', () => {
  let component: DelDeptComponent;
  let fixture: ComponentFixture<DelDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
