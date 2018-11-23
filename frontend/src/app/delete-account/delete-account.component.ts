import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
              public dialog: MatDialog, private dialogDel: MatDialogRef<DeleteAccountComponent>) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogDel.close();
  }

  onYesClick(){

  }
}
