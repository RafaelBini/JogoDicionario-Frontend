import { MatSnackBar } from '@angular/material/snack-bar';
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
    private fireService: FireService,
    private snack: MatSnackBar
  ) { }

  @Input() room: Room | undefined;
  @Input() hostUser: any;
  @Input() amIHost: boolean = false;

  ngOnInit(): void {
  }



  startRoom() {
    this.apiService.startRoom(this.room?.id || '');
    this.apiService.keepActive(this.room?.id || '');
  }

  getLink() {
    return `${location.href}`
  }

  copy() {
    this.snack.open("Link copiado!", undefined, { duration: 2800 })
  }

}
