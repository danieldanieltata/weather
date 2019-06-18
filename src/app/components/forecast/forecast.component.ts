import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ComponentsSyncService } from '../../shared/services/components-sync.service';
import { DataService } from '../../shared/services/data-service.service';

import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  
  private _forecastData;
  private forecastDaysArray: [];
  
  @Input() isAuthenticated: boolean;


  constructor(private _dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {}

  // When the @Input changed I updating the vars needed
  // Can also do ovservable instead of @Input 
  @Input() set forecastData(value: {}) {
    this._forecastData = value;
    this.forecastDaysArray = this._forecastData['forecast']['forecastday'];
    this.addForecastDayToObject(this.forecastDaysArray);
 }

 // Making a selected destination
  makeSelectedDestination(){
    this._dataService.makeSelectedDestination(this._forecastData.location.name).subscribe(response => {
        if(response['isMakeSelected']) this.snackBar.open('Destination in now marked as selected!', '', {duration: 2000});
    });
  }

  // Just adding a days of the week as word 
  addForecastDayToObject(forecastArray: []){
      for(let i in this.forecastDaysArray){
        let forecastDay: {} = this.forecastDaysArray[i];
        
        let dayOfWeek = new Date(forecastDay['date']).getDay();
        forecastDay['stringDay'] = this.getDayInWeek(dayOfWeek);
      }
  }

  // Return's what is the day of he week in word
  getDayInWeek(dayNumber: number) : string{
      let weekdays = new Array(7);
      weekdays[0] = "Sunday";
      weekdays[1] = "Monday";
      weekdays[2] = "Tuesday";
      weekdays[3] = "Wednesday";
      weekdays[4] = "Thursday";
      weekdays[5] = "Friday";
      weekdays[6] = "Saturday";

      return weekdays[dayNumber];
  }

}
