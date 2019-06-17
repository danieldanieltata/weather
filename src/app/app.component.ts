import { Component, OnInit } from '@angular/core';

import { DataService } from './shared/services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit{
  // TODO: make most searched places like news slides 
  // TODO: make a feature that you can choose which destentation you want and put them all tohgther
  // TODO: the user should be able to press the one of the most searched places and get forecast
  // EDGE CASE cant search by country only by city
  // TODO: For now its hard coded, if I have more time for user system I will chage this per-user
  private mostSearchedPlaces = {'Tel Aviv': {}, 'Amsterdam': {}, 'Madrid': {}};
  private forecastData: {}

  constructor(private _dataService: DataService){}

  ngOnInit(){
    for(let city in this.mostSearchedPlaces){
        this._dataService.getCurrentWeather(city).subscribe(result => this.mostSearchedPlaces[city] = result);
    }   
    //this._dataService.getForecast('orlando').subscribe(result => this.forecastData = result);
  }

  /*
  This is event that comes from the search-component, when the user
  want to get he's data I'm getting the data and passing to the forecase-component
  */
  getNewCity(cityName){
    this._dataService.getForecast(cityName).subscribe(result => this.forecastData = result);
  }

}
