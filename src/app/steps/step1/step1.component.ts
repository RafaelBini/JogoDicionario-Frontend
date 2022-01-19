import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { Room } from './../../models/room';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  constructor(
    private apiService: ApiService,
    private snack: MatSnackBar,
    private cookieService: CookieService
  ) { }

  @Input() room: Room | undefined;
  myDefinition = '';
  isDefinitionSent = false;

  ngOnInit(): void {
    this.cookieService.delete('correctDefinition', `/${this.room?.id}`);
    this.cookieService.delete('myDefinition', `/${this.room?.id}`);
  }

  async sendDefinition() {
    if (this.isDefinitionSent) return;

    if (this.myDefinition.length < 5) {
      this.snack.open('Definição muito curta!', undefined, { duration: 4000 })
      return;
    }

    try {
      this.isDefinitionSent = true;
      const HAS_FINAL = this.myDefinition[this.myDefinition.length - 1].match(/[!\.\?]/g)
      this.myDefinition = `${this.myDefinition[0].toUpperCase()}${this.myDefinition.slice(1)}${HAS_FINAL ? '' : '.'}`
      var resp = await this.apiService.sendDefinition(this.room?.id || '', this.myDefinition);
      this.cookieService.set('myDefinition', this.myDefinition, new Date().getTime() + (1000 * 60 * 2), `/${this.room?.id}`);
      if (resp.correctDefinition) {
        this.cookieService.set('correctDefinition', 'true', new Date().getTime() + (1000 * 60 * 2), `/${this.room?.id}`);
      }

    }
    catch (ex: any) {
      this.snack.open(ex.error.msg, undefined, { duration: 3500 });
      this.isDefinitionSent = false;
    }

  }

}
