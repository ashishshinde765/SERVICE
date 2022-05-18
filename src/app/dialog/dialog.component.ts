import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  Lists!: FormGroup;
  constructor(
    private FormBuilde: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.Lists = this.FormBuilde.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  SaveToBucket() {
    if (this.Lists.valid) {
      this.api.postProduct(this.Lists.value).subscribe({
        next: (res) => {
          alert(' Posted Successfully');
          this.Lists.reset();
          this.dialogRef.close('save');
        },
        error: (err) => {
          alert('Error While Posting');
        },
      });
    }
  }
}
