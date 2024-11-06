import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsUsersComponent } from './points-users.component';

describe('PointsUsersComponent', () => {
  let component: PointsUsersComponent;
  let fixture: ComponentFixture<PointsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
