import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { V1Service } from '../../../services/v1.service';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  transactionForm: FormGroup;
  UserUid: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private v1Service: V1Service
  ) {
    this.transactionForm = this.fb.group({
      date: [null, Validators.required],
      type: [null, Validators.required],
      UserUid: [null, Validators.required],
      status: ['Cycle Balance', Validators.required],
      points: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.UserUid = this.route.snapshot.paramMap.get('id') || '';
    this.transactionForm.patchValue({
      UserUid: this.UserUid,
    });

  }


  addTransaction(): void {

    if (this.transactionForm.invalid)
      return console.log('error', this.transactionForm);

    const transactionData = {
      UserUid: this.UserUid,
      ...this.transactionForm.value,
      date: new Date(this.transactionForm.value.date).toISOString(),
    };

    this.v1Service.addTransaction(transactionData).subscribe({
      next: (response) => {
        alert('Transaction added successfully!');
        this.transactionForm.reset();
      },
      error: (err) => {
        console.error('Error adding transaction:', err);
        alert('Failed to add transaction. Please try again later.');
      }
    });
  }
}
