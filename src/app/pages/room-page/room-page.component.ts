import { EditRoomDialogComponent } from './../../dialogs/edit-room-dialog/edit-room-dialog.component';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PodiumDialogComponent } from './../../dialogs/podium-dialog/podium-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { RemovedDialogComponent } from './../../dialogs/removed-dialog/removed-dialog.component';
import { InactiveDialogComponent } from './../../dialogs/inactive-dialog/inactive-dialog.component';
import { EditMeComponent } from './../../dialogs/edit-me/edit-me.component';
import { Room } from './../../models/room';
import { FireService } from 'src/app/services/fire.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
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
    private dialog: MatDialog,
    private snack: MatSnackBar

  ) { }

  public room?: Room;
  public countdownPercentage: number = 0;
  hostUser: any;
  amIHost: boolean = false;

  public inactiveDialogRef: MatDialogRef<InactiveDialogComponent> | undefined;
  private roomListener: Subscription | undefined;
  public messageText = ''
  justChangedStep = false;

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

      if (room.step == 0 && this.room?.step == 3) {
        this.dialog.open(PodiumDialogComponent, {
          data: room
        })
      }

      this.room = room

      if (this.getMeAtRoom()?.inactive && !this.inactiveDialogRef) {

        this.inactiveDialogRef = this.dialog.open(InactiveDialogComponent, {
          data: this.room.id,
          disableClose: true
        })
        this.inactiveDialogRef.afterClosed().subscribe(() => {
          this.inactiveDialogRef = undefined
        })
      }

      this.hostUser = this.room.users[0];
      this.amIHost = this.room.users[0].hash == this.fireService.getMyHash()
      this.room.users = this.room.users.sort((a, b) => b.score - a.score)

      this.room.messages.reverse()

    })

    this.startCountdown();
  }
  ngOnDestroy(): void {
    this.roomListener?.unsubscribe();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return this.room?.step == 0;
  }

  startCountdown() {
    setInterval(async () => {
      if (!this.room || this.room.step == 0 || !this.room.stepEndAt) {
        this.countdownPercentage = 100;

        return;
      }

      const SECS_REMAINING = await this.apiService.getSecsRemaining(this.room.stepEndAt?.toDate())
      const MAX_TIME = (this.room as any)[`maxTimeStep${this.room.step}`];
      const NEW_COUNT_DOWN_PERCENTAGE = (SECS_REMAINING / MAX_TIME)
      if (NEW_COUNT_DOWN_PERCENTAGE > this.countdownPercentage) {
        this.justChangedStep = true;
        window.scrollTo(0, 0)
      }
      else {
        this.justChangedStep = false;
      }
      this.countdownPercentage = NEW_COUNT_DOWN_PERCENTAGE
    }, 500)
  }

  getMeAtRoom() {
    if (!this.room) return undefined;
    return this.room?.users.find(u => u.hash == this.fireService.getMyHash())
  }

  async leaveRoom() {

    var diag = this.dialog.open(ConfirmDialogComponent, {
      data: {
        isDanger: true,
        title: 'Tem certeza de vai sair?',
        content: 'Ao sair, você perderá todos os seus pontos.'
      }
    })

    diag.afterClosed().subscribe(async result => {
      if (result) {
        await this.router.navigate(['']);
        setTimeout(() => {
          this.apiService.leaveRoom(this.room?.id || '');
        }, 1500);
      }

    })





  }


  messageInputKeyup(event: any) {
    if (event.key == 'Enter') this.sendMessage()
  }
  async sendMessage() {
    if (!this.messageText) return;

    try {
      if (this.messageText.includes("/host")) {
        var password = this.messageText.split('/')[0];
        await this.apiService.claimHost(this.room?.id || '', password);
        this.messageText = '';
        return;
      }
      else if (this.messageText.includes("/reset")) {
        var password = this.messageText.split('/')[0];
        await this.apiService.reset(this.room?.id || '', password);
        this.messageText = '';
        return;
      }

      await this.apiService.sendMessage(this.room?.id || '', this.messageText)

      this.messageText = '';
    }
    catch (ex: any) {
      this.snack.open(ex.error.msg, undefined, { duration: 3600 })
    }

  }

  openEditRoom() {
    this.dialog.open(EditRoomDialogComponent, {
      data: { ...this.room }
    })
  }

}
