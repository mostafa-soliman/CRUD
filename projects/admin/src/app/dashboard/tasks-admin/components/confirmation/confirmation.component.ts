import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(
    public dialog: MatDialogRef<ConfirmationComponent>,
    public matDialog: MatDialog
  ) {}
  confirm() {
    this.matDialog.closeAll();
  }
  close() {
    this.dialog.close();
  }
}
