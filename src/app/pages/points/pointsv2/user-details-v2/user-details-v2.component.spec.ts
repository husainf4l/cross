import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsV2Component } from './user-details-v2.component';

describe('UserDetailsV2Component', () => {
  let component: UserDetailsV2Component;
  let fixture: ComponentFixture<UserDetailsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
