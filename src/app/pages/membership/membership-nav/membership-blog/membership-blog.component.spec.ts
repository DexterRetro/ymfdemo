import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipBlogComponent } from './membership-blog.component';

describe('MembershipBlogComponent', () => {
  let component: MembershipBlogComponent;
  let fixture: ComponentFixture<MembershipBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
