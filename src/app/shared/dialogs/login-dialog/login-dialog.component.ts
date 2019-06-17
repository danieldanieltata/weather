import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialog implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginDialog>, @Inject(MAT_DIALOG_DATA) public data ) { }

  ngOnInit() {
  }

}
