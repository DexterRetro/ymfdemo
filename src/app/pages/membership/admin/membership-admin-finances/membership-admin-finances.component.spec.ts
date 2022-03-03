import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAdminFinancesComponent } from './membership-admin-finances.component';

describe('MembershipAdminFinancesComponent', () => {
  let component: MembershipAdminFinancesComponent;
  let fixture: ComponentFixture<MembershipAdminFinancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipAdminFinancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipAdminFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
