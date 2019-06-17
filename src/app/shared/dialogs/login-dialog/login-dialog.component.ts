import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthenticationService } from '../../services/authentication.service';
import { ComponentsSyncService } from '../../services/components-sync.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialog implements OnInit {

  private username: string;
  private password: string;

  constructor(private dialogRef: MatDialogRef<LoginDialog>, @Inject(MAT_DIALOG_DATA) public data, private _authService: AuthenticationService, private _syncService: ComponentsSyncService) { }

  ngOnInit() {
  }

  checkCredentials(){
    this._authService.login(this.username, this.password).subscribe(response => {
      if(response['userAuthenticated']){
        this.dialogRef.close(response);
      }
    });
  }

}
