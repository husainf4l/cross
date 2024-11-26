import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDetailsV2Component } from './transactions-details-v2.component';

describe('TransactionsDetailsV2Component', () => {
  let component: TransactionsDetailsV2Component;
  let fixture: ComponentFixture<TransactionsDetailsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDetailsV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsDetailsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
