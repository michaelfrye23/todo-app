import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-task-dialog',
  styleUrls: ['./update-dialog.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule,
    CommonModule
  ],
  template: `
    <h1 mat-dialog-title>Update Task</h1>
    <div mat-dialog-content>
      <form [formGroup]="taskForm">
        <mat-form-field appearance="fill">
          <mat-label>Task Name</mat-label>
          <input matInput [value]="data.name" readonly />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description"></textarea>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Due Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="deadline" />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-radio-group formControlName="priority" style="display: flex; justify-content: space-around; margin-top: 20px;">
          <mat-radio-button value="low">Low</mat-radio-button>
          <mat-radio-button value="medium">Medium</mat-radio-button>
          <mat-radio-button value="high">High</mat-radio-button>
        </mat-radio-group>

        <div mat-dialog-actions align="end">
          <button mat-button (click)="onCancel()">Cancel</button>
          <button mat-raised-button color="primary" (click)="onSave()" [disabled]="taskForm.invalid">Save</button>
        </div>
      </form>
    </div>
    
  `,
})
export class UpdateDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      description: [data.description, [Validators.required]],
      deadline: [data.deadline, [Validators.required]],
      priority: [data.priority, [Validators.required]],
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.data, ...this.taskForm.value };
      console.log(updatedTask);
      this.dialogRef.close(updatedTask);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
