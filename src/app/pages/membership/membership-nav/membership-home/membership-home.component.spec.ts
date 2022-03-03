import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipHomeComponent } from './membership-home.component';

describe('MembershipHomeComponent', () => {
  let component: MembershipHomeComponent;
  let fixture: ComponentFixture<MembershipHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
