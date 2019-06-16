import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  
  private _forecastData;
  private forecastDaysArray: [];

  constructor() { }

  ngOnInit() {
  }

  // When the @Inpur changed I updating the vars needed
  // Can also do ovservable instead of @Input 
  @Input() set forecastData(value: {}) {
    this._forecastData = value;
    this.forecastDaysArray = this._forecastData['forecast']['forecastday'];
    this.addForecastDayToObject(this.forecastDaysArray);
 }

  // Just adding a days of the week as word 
  addForecastDayToObject(forecastArray: []){
    for(let forecastDay of this.forecastDaysArray){
      let dayOfWeek = new Date(forecastDay['date']).getDay();
      forecastDay['stringDay'] = this.getDayInWeek(dayOfWeek);
    }
  }

  // Return's what is the day of he week in word
  getDayInWeek(dayNumber: number){
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
