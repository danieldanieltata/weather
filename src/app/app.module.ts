import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatInputModule,
         MatCardModule,
         MatOptionModule,
         MatAutocompleteModule,
         MatButtonModule,
         MatTooltipModule,
         MatDialogModule,
         MatSnackBarModule } from '@angular/material';

// Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SearchComponent } from './components/search/search.component';
import { CurrentWeatherCardComponent } from './components/current-weather-card/current-weather-card.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { LoginDialog } from './shared/dialogs/login-dialog/login-dialog.component';
import { SignupDialog } from './shared/dialogs/signup-dialog/signup-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchComponent,
    CurrentWeatherCardComponent,
    ForecastComponent,
    LoginDialog,
    SignupDialog, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [LoginDialog, SignupDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
