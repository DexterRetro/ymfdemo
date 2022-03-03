import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpValidationComponent } from './sign-up-validation.component';

describe('SignUpValidationComponent', () => {
  let component: SignUpValidationComponent;
  let fixture: ComponentFixture<SignUpValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
