import { Component, OnInit } from '@angular/core';

import { DataService } from './shared/services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit{
  // TODO make most searched places like news slides 
  // TODO make a feature that you can choose which destentation you want and put them all tohgther

  // TODO: For now its hard coded, if I have more time for user system I will chage this per-user
  private mostSearchedPlaces = {'Tel Aviv': {}, 'Amsterdam': {}, 'Miami': {}};
  private mostSearchedPlacesKeys = Object.keys(this.mostSearchedPlaces);

  constructor(private _dataService: DataService){}

  ngOnInit(){
    for(let city of this.mostSearchedPlacesKeys){
        this._dataService.getCurrentWeather(city).subscribe(result => this.mostSearchedPlaces[city] = result);
    }   

    console.dir(this.mostSearchedPlaces)
  }
}
