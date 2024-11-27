import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsDetailsv1Component } from './transactions-details-v1.component';


describe('TransactionsDetailsv1Component', () => {
  let component: TransactionsDetailsv1Component;
  let fixture: ComponentFixture<TransactionsDetailsv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDetailsv1Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionsDetailsv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
