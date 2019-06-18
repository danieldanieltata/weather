import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../../services/authentication.service';

import { SignupDialog } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialog implements OnInit {

  private username: string;
  private password: string;

  constructor(private dialogRef: MatDialogRef<LoginDialog>, @Inject(MAT_DIALOG_DATA) public data, private _authService: AuthenticationService,
                          private dialog: MatDialog, private snackBar:MatSnackBar) { }

  ngOnInit() {}

  openSignupDialog(){
      const dialog = this.dialog.open(SignupDialog)
  }

  checkCredentials(){
      if(!this.username || !this.password){
        this.snackBar.open('You have to fill all of the fields', '', {duration: 2000});
        return;
      }

      this._authService.login(this.username, this.password).subscribe(response => {
          if(response['userAuthenticated']){
            this.snackBar.open('Hello ' + this.username,'', {duration: 2000});
            this.dialogRef.close(response);
          }
          else this.snackBar.open('Username or password are wrong', '', {duration: 2000});
      });
  }

}
