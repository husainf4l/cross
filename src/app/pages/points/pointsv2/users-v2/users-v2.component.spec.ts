import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersV2Component } from './users-v2.component';

describe('UsersV2Component', () => {
  let component: UsersV2Component;
  let fixture: ComponentFixture<UsersV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
