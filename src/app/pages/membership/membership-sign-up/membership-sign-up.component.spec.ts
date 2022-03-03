import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSignUpComponent } from './membership-sign-up.component';

describe('MembershipSignUpComponent', () => {
  let component: MembershipSignUpComponent;
  let fixture: ComponentFixture<MembershipSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
