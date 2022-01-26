import { ApiService } from './../../services/api.service';
import { Room } from './../../models/room';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-room-dialog',
  templateUrl: './edit-room-dialog.component.html',
  styleUrls: ['./edit-room-dialog.component.scss']
})
export class EditRoomDialogComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public room: Room,
    public dialogRef: MatDialogRef<EditRoomDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  async save() {
    await this.apiService.updateRoom(this.room);
    this.dialogRef.close();
  }

}
