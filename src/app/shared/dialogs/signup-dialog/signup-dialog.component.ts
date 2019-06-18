import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})

export class SignupDialog implements OnInit {

  private username: string;
  private fullname: string;
  private password: string;

  constructor(private dialogRef: MatDialogRef<SignupDialog>, @Inject(MAT_DIALOG_DATA) public data, private _authService: AuthenticationService,
                       private snackBar: MatSnackBar) { }

  ngOnInit() {}

  signupUser(){
      if(!this.username || !this.password || !this.fullname){
        this.snackBar.open('You have to fill all of the fields', '', {duration: 2000});
        return;
      }

      this._authService.signup(this.username, this.fullname, this.password).subscribe(response => {
          if(response['userSignup']){
              this.snackBar.open('You are now signed up!', '', {duration: 2000});
              this.dialogRef.close();
          }
          else this.snackBar.open('User already in use', '', {duration: 2000});

      });
  }

}
