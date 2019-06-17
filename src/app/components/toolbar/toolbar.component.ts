import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { LoginDialog } from '../../shared/dialogs/login-dialog/login-dialog.component';

import { ComponentsSyncService } from '../../shared/services/components-sync.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private userAuthenticatedData: {};

  constructor(private dialog: MatDialog, private _syncService: ComponentsSyncService) { }

  ngOnInit() {
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginDialog);

    dialogRef.afterClosed().subscribe(data => {
      this._syncService.sendAuthenticationUpdate(data);
      this.userAuthenticatedData = data;
    });
  }

  ngOnDestroy(){
  }

}
