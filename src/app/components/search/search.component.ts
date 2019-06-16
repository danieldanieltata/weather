import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../shared/services/data-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() cityToGet: EventEmitter<string> = new EventEmitter();

  private resultsOfSearch

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  // On input has changed sending request to server to get search data
  // Doing this only when the length is bigger then 3 because only that the api return good data
  onSearchChange(cityToSearch: string){
    
    if(cityToSearch.length > 3){
      this._dataService.searchPlace(cityToSearch).subscribe(result => this.resultsOfSearch = result);
    }
    else
      this.resultsOfSearch = [];

  }

  // On the user selected he's option I'm emitting to the app component
  onSelectionChange(event){
    this.cityToGet.emit(event.source.value);
  }

}
