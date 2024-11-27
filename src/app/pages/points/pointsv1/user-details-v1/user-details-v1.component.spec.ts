import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsv1Component } from './user-details-v1.component';

describe('UserDetailsv1Component', () => {
  let component: UserDetailsv1Component;
  let fixture: ComponentFixture<UserDetailsv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsv1Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
