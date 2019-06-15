import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatInputModule,
         MatCardModule } from '@angular/material';

// Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SearchComponent } from './components/search/search.component';
import { CurrentWeatherCardComponent } from './components/current-weather-card/current-weather-card.component'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchComponent,
    CurrentWeatherCardComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
