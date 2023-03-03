import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { Component } from '@angular/core';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;

  constructor(
    fireService: FireService,
    apiService: ApiService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        event.url
        console.log('this.isLoading = true; ')
        this.isLoading = true;
      }
      else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        console.log('this.isLoading = false; ')
        this.isLoading = false;
      }
    })
    apiService.registerDelta();
  }

}
