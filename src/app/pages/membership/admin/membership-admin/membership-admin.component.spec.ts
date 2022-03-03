import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAdminComponent } from './membership-admin.component';

describe('MembershipAdminComponent', () => {
  let component: MembershipAdminComponent;
  let fixture: ComponentFixture<MembershipAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
