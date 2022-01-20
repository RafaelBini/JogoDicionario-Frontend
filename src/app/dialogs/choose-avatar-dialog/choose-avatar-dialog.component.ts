import { FireService } from 'src/app/services/fire.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-avatar-dialog',
  templateUrl: './choose-avatar-dialog.component.html',
  styleUrls: ['./choose-avatar-dialog.component.scss']
})
export class ChooseAvatarDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ChooseAvatarDialogComponent>,

  ) {

  }

  imgUrls: string[] = [
    "assets/avatars/buchudo.png",
    "assets/avatars/cami.png",
    "assets/avatars/girafa.png",
    "assets/avatars/hipo.png",
    "assets/avatars/kela.png",
    "assets/avatars/padrao.png",
    "assets/avatars/poingue.png",
    "assets/avatars/zebra.png",
  ]



  ngOnInit(): void {

  }

  selectImgUrl(imgUrl: string) {
    this.dialogRef.close(imgUrl)
  }



}
