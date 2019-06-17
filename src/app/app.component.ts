import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';  


import { DataService } from './shared/services/data-service.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { ComponentsSyncService } from './shared/services/components-sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, AuthenticationService, ComponentsSyncService]
})
export class AppComponent implements OnInit, OnDestroy{
  // TODO: make most searched places like news slides 
  // TODO: make a feature that you can choose which destentation you want and put them all tohgther
  // TODO: the user should be able to press the one of the most searched places and get forecast
  private mostSearchedPlaces : {};
  private lastSearchedDestinations: {};
  private forecastData: {}

  private authenticationUpdatesSubsciption: Subscription;

  constructor(private _dataService: DataService, private _syncService: ComponentsSyncService){
      this.mostSearchedPlaces =  {'Tel Aviv': {}, 'Amsterdam': {}, 'Madrid': {}};
  }

  ngOnInit(){
    for(let city in this.mostSearchedPlaces){
        this._dataService.getCurrentWeather(city).subscribe(result => this.mostSearchedPlaces[city] = result);
    }   

    this.authenticationUpdatesSubsciption = this._syncService.getAuthenticationUpdates().subscribe(authData => {
        if(!authData['lastSearchedDestinations']) return;

        this.lastSearchedDestinations = {}; 
        for(let place of authData['lastSearchedDestinations']){
          let shortedNameOfPlace = place.split(',')[0];
          this._dataService.getCurrentWeather(place).subscribe(result => this.lastSearchedDestinations[shortedNameOfPlace] = result);
        }      
    });
  }

  
  //This is event that comes from the search-component, when the user-
  //want to get he's data I'm getting the data and passing to the forecase-component
  getNewCity(cityName){
    this._dataService.getForecast(cityName).subscribe(result => this.forecastData = result);
  }

  ngOnDestroy(){
    this.authenticationUpdatesSubsciption.unsubscribe();
  }

}
