import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Credentials } from '../models/credentials';

export interface DialogData {
  animal: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {

 // credentials = new Credentials('', '');

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(DialogComponentDialogComponent, {data: {animal: 'username'}});
  }
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
