import { ApiService } from 'src/app/services/api.service';
import { Room } from './../../models/room';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  @Input() room: Room | undefined;
  myDefinition = '';
  isDefinitionSent = false;

  ngOnInit(): void {
  }

  async sendDefinition() {
    if (this.isDefinitionSent) return;
    try {
      this.isDefinitionSent = true;
      await this.apiService.sendDefinition(this.room?.id || '', this.myDefinition);
      this.apiService.myDefinition = this.myDefinition;
    }
    catch (ex) {
      this.isDefinitionSent = false;
    }

  }

}
