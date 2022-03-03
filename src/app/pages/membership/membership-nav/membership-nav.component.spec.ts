import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipNavComponent } from './membership-nav.component';

describe('MembershipNavComponent', () => {
  let component: MembershipNavComponent;
  let fixture: ComponentFixture<MembershipNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
