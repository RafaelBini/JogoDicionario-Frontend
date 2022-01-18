import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  constructor(
    private apiSevice: ApiService,
    private snack: MatSnackBar
  ) { }

  @Input() room: Room | undefined;
  selectedDefinitionText: string = '';
  finished = false;

  ngOnInit(): void {
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
    return this.room?.definitions.filter(d => d.text != this.apiSevice.myDefinition).sort((a, b) => a.text > b.text ? -1 : 1)
  }

}
