import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
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
    CommonModule,
  ],

  styleUrls: ['./task-dialog.component.css']
})

export class TaskDialogComponent {
  taskForm: FormGroup;
  @Output() addTask = new EventEmitter<any>();
  task = {
    name: '',
    description: '',
    date: '',
    priority: 'Medium',
  };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator.bind(this)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      priority: ['medium', Validators.required],
    });
  }

  nameValidator(control: any): { [key: string]: boolean } | null {
    const taskExists = this.data.tasks.some(  
      (task: any) => task.name.toLowerCase() === control.value?.toLowerCase() 
    );
    return taskExists ? { 'duplicateName': true } : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Form Validity:', this.taskForm.valid);  
    console.log('Form Controls:', this.taskForm.controls);
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      console.log('New Task:', newTask);
      this.dialogRef.close(newTask);
    } else {
      console.log('Form is invalid');
      console.log(this.taskForm.errors); 
    }
  }

  submitTask(): void {
    this.addTask.emit(this.taskForm.value);
  }

  closeDialog(): void {

  }

}
