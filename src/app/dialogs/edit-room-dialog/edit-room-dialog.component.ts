import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './../../services/api.service';
import { Room } from './../../models/room';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  async save() {
    try {
      await this.apiService.updateRoom(this.room);
      this.dialogRef.close();
    }
    catch (ex: any) {
      this.snack.open(ex.error.msg, undefined, { duration: 2500 })
    }

  }

}
