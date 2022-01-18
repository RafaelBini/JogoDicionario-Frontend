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
  ) { }

  @Input() room: Room | undefined;

  ngOnInit(): void {
  }

  startRoom() {
    this.apiService.startRoom(this.room?.id || '');
    this.apiService.keepActive(this.room?.id || '');
  }

}
