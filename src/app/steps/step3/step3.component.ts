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
    if (!this.room) return [];
    return this.room.users.filter(u => u.votedUserName == userName)
  }

  getOrderedDefinitions() {
    return this.room?.definitions.sort((a, b) => {
      return this.getVoters(b.userName).length - this.getVoters(a.userName).length;
    })
  }

  votedCorrect() {
    return this.getMeAtRoom().votedUserName == 'Definição Correta';
  }

  getMeAtRoom() {
    if (!this.room) return undefined;
    return this.room?.users.find(u => u.hash == this.fireService.getMyHash())
  }

}
