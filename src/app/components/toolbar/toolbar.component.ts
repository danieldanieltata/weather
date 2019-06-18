import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoginDialog } from '../../shared/dialogs/login-dialog/login-dialog.component';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { ComponentsSyncService } from '../../shared/services/components-sync.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  private userAuthenticatedData: {};

  constructor(private dialog: MatDialog, private _syncService: ComponentsSyncService, private _authService: AuthenticationService) { }

  ngOnInit() {
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginDialog);

    
    dialogRef.afterClosed().subscribe(data => {
        if(data){
          this._syncService.sendAuthenticationUpdate(data); // Letting know to other components that user is athenticated
          this.userAuthenticatedData = data;
        }
    });

  }

  // Seinding a logout request, if returning a good feedback, refreshing the page
  logout(){
      this._authService.logout().subscribe(response => {
          if(response['userLoggedOut']) window.location.reload();
      });
  }

}
