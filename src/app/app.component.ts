import { Component, OnChanges } from '@angular/core';
import { WeatherService } from './weather.service';
import { LocationService } from './location.service'
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService,
  LocationService]
})
export class AppComponent implements OnChanges {
  position: any;
  lon: number = 43.8047818;
  lat: number = -79.8745539;
  constructor(private weatherService: WeatherService,
              private locationService: LocationService) {}
  title = 'Weather';
  ngOnChanges(){
    this.locationService.getLocation().subscribe(
      (position: {}) => {
        this.position = position;
        this.lon = this.position.coords.longitude;
        this.lat = this.position.coords.latitude;
      },
      (error: any) => console.log('error')
    );
  }
}
