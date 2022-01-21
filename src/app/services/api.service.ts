import { FireService } from 'src/app/services/fire.service';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private fireService: FireService
  ) { }

  private delta: number = 0;
  public myDefinition = '';

  async registerDelta() {
    var resp = await firstValueFrom(this.http.get<any>(`${environment.apiHost}/timing`))
    var serverNow = new Date(resp.now);
    this.delta = serverNow.getTime() - new Date().getTime()

  }

  getNow() {
    return new Date(new Date().getTime() + this.delta)
  }

  async getSecsRemaining(to: Date) {
    return Math.ceil((to.getTime() - this.getNow().getTime()) / 1000);
  }

  startRoom(roomId: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/start`, { roomId, userId: this.fireService.user.id }));
  }

  enterRoom(roomId: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/enter`, { roomId, userId: this.fireService.user.id }));
  }

  leaveRoom(roomId: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/leave`, { roomId, userId: this.fireService.user.id }));
  }

  keepActive(roomId: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/keep-active`, { roomId, userId: this.fireService.user.id }));
  }

  sendDefinition(roomId: string, text: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/definition`, { roomId, userId: this.fireService.user.id, text }));
  }

  sendVote(roomId: string, text: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/vote`, { roomId, userId: this.fireService.user.id, text }));
  }

  sendMessage(roomId: string, text: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/chat/message`, { roomId, userId: this.fireService.user.id, text }));
  }

  claimHost(roomId: string, password: string) {
    if (!this.fireService.user) return;
    return firstValueFrom(this.http.post<any>(`${environment.apiHost}/room/claim-host`, { roomId, userId: this.fireService.user.id, password }));
  }

}
