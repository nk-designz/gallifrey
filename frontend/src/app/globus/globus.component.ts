import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globus',
  templateUrl: './globus.component.html',
  styleUrls: ['./globus.component.styl']
})
export class GlobusComponent implements OnInit {

  title = 'Nearby Posts';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.lat = position.coords.latitude,
              this.lng = position.coords.longitude;
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
  }

}
