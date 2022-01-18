import { RemovedDialogComponent } from './../../dialogs/removed-dialog/removed-dialog.component';
import { InactiveDialogComponent } from './../../dialogs/inactive-dialog/inactive-dialog.component';
import { EditMeComponent } from './../../dialogs/edit-me/edit-me.component';
import { Room } from './../../models/room';
import { FireService } from 'src/app/services/fire.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireService: FireService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  public room?: Room;
  public countdown: number = 0;

  public inactiveDialogRef: MatDialogRef<InactiveDialogComponent> | undefined;
  private roomListener: Subscription | undefined;

  async ngOnInit() {

    if (!this.fireService.user?.name) {
      var diagRef = this.dialog.open(EditMeComponent, {
        disableClose: true
      })
      await firstValueFrom(diagRef.afterClosed());
    }

    var params = await firstValueFrom(this.route.paramMap)
    var roomId = params.get('roomId') || '';

    this.roomListener = this.fireService.listenRoom(roomId).subscribe(room => {

      if (this.getMeAtRoom()?.inactive && !room?.users.find(u => u.hash == this.fireService.getMyHash())) {
        this.inactiveDialogRef?.close();
        this.dialog.open(RemovedDialogComponent);
        this.router.navigate(['']);
        return;
      }
      else if (room == undefined) {
        this.fireService.createRoom(roomId);
        return;
      }
      else if (!room.users.find(u => u.hash == this.fireService.getMyHash())) {
        this.apiService.enterRoom(roomId);
      }

      this.room = room

      if (this.getMeAtRoom()?.inactive && !this.inactiveDialogRef) {

        this.inactiveDialogRef = this.dialog.open(InactiveDialogComponent, {
          data: this.room.id
        })
        this.inactiveDialogRef.afterClosed().subscribe(() => {
          this.inactiveDialogRef = undefined
        })
      }

    })

    this.startCountdown();
  }
  ngOnDestroy(): void {
    this.roomListener?.unsubscribe();
  }

  startCountdown() {
    setInterval(async () => {
      if (!this.room || this.room.step == 0 || !this.room.stepEndAt) {
        this.countdown = 0;
        return;
      }

      this.countdown = await this.apiService.getSecsRemaining(this.room.stepEndAt?.toDate())

    }, 1000)
  }

  getMeAtRoom() {
    if (!this.room) return undefined;
    return this.room?.users.find(u => u.hash == this.fireService.getMyHash())
  }

}
