import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'alert-notification',
  encapsulation: ViewEncapsulation.None,
  template: '<ng2-toasty [position]="position"></ng2-toasty>'
})
export class AlertComponent implements OnInit {

  @Input() position:string;

  constructor() { }

  ngOnInit() {
  }

}
