import { FireService } from 'src/app/services/fire.service';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  constructor(
    private fireService: FireService
  ) { }

  @Input() room: Room | undefined;

  ngOnInit(): void {

  }

  getVoters(userName: string) {
    return this.room?.users.filter(u => u.votedUserName == userName)
  }

  getMyVotedUserName() {
    return this.getMeAtRoom().votedUserName;
  }

  getMeAtRoom() {
    if (!this.room) return undefined;
    return this.room?.users.find(u => u.hash == this.fireService.getMyHash())
  }

}
