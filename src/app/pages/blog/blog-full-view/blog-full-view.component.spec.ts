import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFullViewComponent } from './blog-full-view.component';

describe('BlogFullViewComponent', () => {
  let component: BlogFullViewComponent;
  let fixture: ComponentFixture<BlogFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogFullViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
