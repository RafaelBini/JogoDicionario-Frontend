
import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public fireService: FireService) {

  }
  ngOnInit(): void {

  }

  updateUser() {
    this.fireService.updateMe({
      name: this.fireService.user?.name,
      imgUrl: this.fireService.user?.imgUrl
    });
  }

}
