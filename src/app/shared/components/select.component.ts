import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { HttpService } from './../../services/http/http.service';
import { AlertService } from './../../components/alert/alert.service';

@Component({
  selector: 'ee-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './views/select.component.html',
  styleUrls: ['./assets/select.component.css']
})
export class SelectComponent implements OnInit {

    @Input() url:string;
    @Input() default:any;
    @Input() key:any;
    @Input() label:any = "Selecione um item";
    @Input() icon:string = 'icon-globe icons';
    @Input() required = "false";
    @Input() allOptions:boolean = true;

    @Output() onChange:EventEmitter<any> = new EventEmitter<any>();

    public expanded:boolean = false;

    constructor( private httpService: HttpService) {
    }

    public ngOnInit() {
    }

    public onFocus() {
        this.expanded = true;
    }

    public onFocusOut() {
        this.expanded = false;
    }

    public validation() {
        return false;
    }
}
