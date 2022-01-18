import { ApiService } from './services/api.service';
import { Component } from '@angular/core';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    fireService: FireService,
    apiService: ApiService
  ) {
    apiService.registerDelta();
  }

}
