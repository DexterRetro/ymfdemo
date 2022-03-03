import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAdminBlogComponent } from './membership-admin-blog.component';

describe('MembershipAdminBlogComponent', () => {
  let component: MembershipAdminBlogComponent;
  let fixture: ComponentFixture<MembershipAdminBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipAdminBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipAdminBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
