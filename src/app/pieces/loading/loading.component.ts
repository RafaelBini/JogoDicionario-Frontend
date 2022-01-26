import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() {
    const words = ['PUFINO', 'OSSATURA', 'CABROCHA', 'CORIFEU', 'IMPROBO', 'DIVERTICULITE', 'QUIPROCÓ', 'DISPEPSIA', 'RECEPISSE', 'MANGRAR', 'ECLAMPSE', 'TACITURNO']

    this.letters = words[Math.floor(Math.random() * words.length)];
  }

  letters = 'CHUDÃO';
  index = 0;

  ngOnInit(): void {
    setInterval(() => {
      if (this.index < this.letters.length - 1) this.index++;
      else this.index = 0;
    }, 1000)
  }

}
