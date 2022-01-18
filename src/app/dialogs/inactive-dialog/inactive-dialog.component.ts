import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inactive-dialog',
  templateUrl: './inactive-dialog.component.html',
  styleUrls: ['./inactive-dialog.component.scss']
})
export class InactiveDialogComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public roomId: string,
  ) { }

  ngOnInit(): void {
  }

  keep() {
    this.apiService.keepActive(this.roomId);
  }

}
