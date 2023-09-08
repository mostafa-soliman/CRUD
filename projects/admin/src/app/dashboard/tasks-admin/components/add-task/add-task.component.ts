import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog
  ) {}

  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];
  ngOnInit(): void {}
}
