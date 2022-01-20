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



  ngOnInit(): void {
  }

  getOrderedUsers() {
    return this.room.users.sort((a, b) => b.score - a.score)
  }

}
