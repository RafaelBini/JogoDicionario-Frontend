import { FireService } from 'src/app/services/fire.service';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.scss']
})
export class Step0Component implements OnInit {

  constructor(
    private apiService: ApiService,
    private fireService: FireService
  ) { }

  @Input() room: Room | undefined;

  ngOnInit(): void {
  }

  amIHost() {
    if (!this.room) return false
    else if (this.room?.users.length <= 0) return false;
    return this.room?.users[0].hash == this.fireService.getMyHash()
  }

  getHost() {
    if (!this.room) return false
    return this.room?.users[0]
  }

  startRoom() {
    this.apiService.startRoom(this.room?.id || '');
    this.apiService.keepActive(this.room?.id || '');
  }

}
