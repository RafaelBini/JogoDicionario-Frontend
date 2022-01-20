import { ChooseAvatarDialogComponent } from './../../dialogs/choose-avatar-dialog/choose-avatar-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    public fireService: FireService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {

  }

  updateUser() {
    this.fireService.updateMe({
      name: this.fireService.user?.name,
      imgUrl: this.fireService.user?.imgUrl
    });
  }

  chooseImg() {
    var diagRef = this.dialog.open(ChooseAvatarDialogComponent)
    diagRef.afterClosed().subscribe(newImgUrl => {
      if (this.fireService.user && newImgUrl) {
        this.fireService.user.imgUrl = newImgUrl;
        this.updateUser();
      }
    })
  }

}
