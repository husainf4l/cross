import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usersv1Component } from './users-v1.component';


describe('Usersv1Component', () => {
  let component: Usersv1Component;
  let fixture: ComponentFixture<Usersv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usersv1Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Usersv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
