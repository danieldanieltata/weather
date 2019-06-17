import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { LoginDialog } from '../../shared/dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginDialog);
  }

}
