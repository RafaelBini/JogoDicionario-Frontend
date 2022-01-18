import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-edit-me',
  templateUrl: './edit-me.component.html',
  styleUrls: ['./edit-me.component.scss']
})
export class EditMeComponent implements OnInit {

  constructor(
    public fireService: FireService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<EditMeComponent>
  ) { }

  ngOnInit(): void {
  }


  done() {
    if (!this.fireService.user) return;
    else if (!this.fireService.user.name) return this.snack.open('O nickname é obrigatório!')
    else if (this.fireService.user.name.length <= 2) return this.snack.open('Nickname muito pequeno!')
    else if (this.fireService.user.name.length > 15) return this.snack.open('Nickname muito grande!')
    this.fireService.updateMe({
      name: this.fireService.user?.name,
      imgUrl: this.fireService.user?.imgUrl
    });
    this.dialogRef.disableClose = false;
    this.dialogRef.close();
    return true;
  }


}
