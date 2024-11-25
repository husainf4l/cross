import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsV2Component } from './transactions-v2.component';

describe('TransactionsV2Component', () => {
  let component: TransactionsV2Component;
  let fixture: ComponentFixture<TransactionsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
