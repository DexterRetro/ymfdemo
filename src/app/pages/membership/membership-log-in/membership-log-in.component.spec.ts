import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipLogInComponent } from './membership-log-in.component';

describe('MembershipLogInComponent', () => {
  let component: MembershipLogInComponent;
  let fixture: ComponentFixture<MembershipLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
