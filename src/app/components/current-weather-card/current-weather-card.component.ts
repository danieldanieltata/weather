import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather-card',
  templateUrl: './current-weather-card.component.html',
  styleUrls: ['./current-weather-card.component.css']
})
export class CurrentWeatherCardComponent implements OnInit {

  @Input() weatherData;

  private cityName: string;
  private cityWeatherData: {};
  
  private keyFound: boolean = false;

  constructor() { 
  }

  ngOnInit() {
    this.cityName = this.weatherData.key;
    this.cityWeatherData = this.weatherData.value.current;

    if(this.cityWeatherData)
      this.keyFound = true;
    

  }

}
