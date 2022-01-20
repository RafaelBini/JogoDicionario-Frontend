import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  constructor(
    private apiSevice: ApiService,
    private snack: MatSnackBar,
    private cookieService: CookieService
  ) { }

  @Input() room: Room | undefined;
  selectedDefinitionText: string = '';
  finished = false;
  correctDefinition = false;

  ngOnInit(): void {
    if (this.cookieService.get('correctDefinition')) this.correctDefinition = true;
  }

  selectDefinition(definitionText: string) {
    this.selectedDefinitionText = definitionText;
  }

  finish() {
    if (this.selectedDefinitionText == '') return;
    this.apiSevice.sendVote(this.room?.id || '', this.selectedDefinitionText)?.then(() => {
      this.finished = true;
    })
      .catch((ex: any) => {
        if (ex.error.msg.includes("self"))
          this.snack.open("Você não pode votar em sí mesmo!", undefined, { duration: 3500 })
      });
  }

  getDefinitions() {
    var myDefinition = this.apiSevice.myDefinition || this.cookieService.get('myDefinition')
    var set = new Set(this.room?.definitions.map(d => d.text));
    var arryNoDup = [...set];
    return arryNoDup.map(a => { return { text: a } }).filter(d => d.text != myDefinition)
  }

}
