import { Room } from 'src/app/models/room';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-podium-dialog',
  templateUrl: './podium-dialog.component.html',
  styleUrls: ['./podium-dialog.component.scss']
})
export class PodiumDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public room: Room
  ) { }

  podiumDetails = [
    { maxHeight: 10, height: '5px' },
    { maxHeight: 10, height: '5px' }
  ]


  ngOnInit(): void {
    // Calc heights
    const maxHeight = (300 - 62);


    this.podiumDetails[0].maxHeight = maxHeight;
    this.podiumDetails[1].maxHeight = (this.room.users[1].score / this.room.users[0].score) * maxHeight;

    if (this.room.users.length >= 3) {
      this.podiumDetails.push({ maxHeight: 10, height: '5px' });
      this.podiumDetails[2].maxHeight = (this.room.users[2].score / this.room.users[0].score) * maxHeight;
    }


    var currHeight = 5;
    const interv = setInterval(() => {

      for (let podium of this.podiumDetails) {
        if (currHeight <= podium.maxHeight) {
          podium.height = `${currHeight}px`
        }
      }

      if (currHeight >= maxHeight) {
        clearInterval(interv);
      }

      currHeight++;

    }, 7)

  }



}
