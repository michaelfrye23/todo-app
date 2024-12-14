import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
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
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { ChangeDetectorRef } from '@angular/core';



interface Task {
  name: string;
  description: string;
  date: string;  
  priority: string;  
}


@Component({
  selector: 'app-root',
  standalone: true,
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
    MatSnackBarModule,
  ],
  template: `
    <mat-toolbar color="primary" class="custom-toolbar">
      <span class="toolbar-title">FRAMEWORKS</span>
      <button mat-raised-button color="primary" (click)="openDialog()">
        ADD
        <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="listOfTasks" id="table">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let task">{{ task.name }}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let task">{{ task.description }}</td>
        </ng-container>

        <ng-container matColumnDef="deadline">
          <th mat-header-cell *matHeaderCellDef>Deadline</th>
          <td mat-cell *matCellDef="let task">{{ task.date | date:'shortDate' }}</td>
        </ng-container>

        <ng-container matColumnDef="priority">
          <th mat-header-cell *matHeaderCellDef>Priority</th>
          <td mat-cell *matCellDef="let task">{{ task.priority }}</td>
        </ng-container>

        <ng-container matColumnDef="complete">
          <th mat-header-cell *matHeaderCellDef>Is complete</th>
          <td mat-cell *matCellDef="let task">
            <mat-checkbox [(ngModel)]="task.complete" (change)="onCompleteChange(task)"></mat-checkbox>
          </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let task">
            <button mat-raised-button color="primary" *ngIf="!task.complete" (click)="openUpdateDialog(task)">UPDATE</button>
            <button mat-raised-button color="warn" (click)="deleteTask(task)">DELETE</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>

  `,
  styleUrls: ['./app.component.css']
  
})



export class AppComponent {
  displayedColumns: string[] = ['title', 'description', 'deadline', 'priority', 'complete', 'action'];
  listOfTasks = [
    { name: 'Task 1', description: 'Description 1', date: new Date(), priority: 'High', complete: false },
    { name: 'Task 2', description: 'Description 2', date: new Date(), priority: 'Low', complete: true },
  ];

  onCompleteChange(task: any) {
    console.log('Complete status changed for task', task);
  }

  openUpdateDialog(task: any): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { ...task }, 
    });

    dialogRef.afterClosed().subscribe((updatedTask) => {
      if (updatedTask) {
        const taskIndex = this.listOfTasks.findIndex((t) => t.name === updatedTask.name);
        if (taskIndex > -1) {
          this.listOfTasks = [
            ...this.listOfTasks.slice(0, taskIndex),
            updatedTask,
            ...this.listOfTasks.slice(taskIndex + 1),
          ];
          this.snackBar.open('Task successfully updated!', 'Close', {
            duration: 3000, 
            horizontalPosition: 'right', 
            verticalPosition: 'bottom', 
          });
        }
      }
    });
  }

  deleteTask(task: any) {
    this.listOfTasks = this.listOfTasks.filter(t => t !== task);
    console.log("Task Deleted")
  }

  taskList: Task[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private cdRef: ChangeDetectorRef) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: { tasks: this.listOfTasks },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listOfTasks = [...this.listOfTasks, result]; 
        this.snackBar.open('Task successfully added!', 'Close', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'bottom', 
        });
      }
    });
  }



}
