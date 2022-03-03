import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExpandedComponent } from './about-expanded.component';

describe('AboutExpandedComponent', () => {
  let component: AboutExpandedComponent;
  let fixture: ComponentFixture<AboutExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutExpandedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
