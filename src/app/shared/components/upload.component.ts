import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { HttpService } from './../../services/http/http.service';
import { AlertService } from './../../components/alert/alert.service';

@Component({
  selector: 'upload',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './views/upload.component.html',
  styleUrls: ['./assets/upload.component.css']
})
export class UploadComponent implements OnInit {

    @Input() disabled:boolean = false;
    @Input() label:string = "Arraste para cá, para fazer upload";
    @Input() maxFiles:number = 1;
    @Input() maxFileSize:number = 5000000;
    @Input() types:Array<any> = ['image/png','image/jpg', 'image/gif', 'image/jpeg'];
    @Input() url:string = 'upload';

    @Output() onResponse:EventEmitter<any> = new EventEmitter<any>();

    public droped:boolean = false;
    protected inputFile:HTMLInputElement;
    protected hasError:boolean = false;
    protected errors:Array<any> = [];

    constructor ( private http:HttpService, private notification:AlertService ) { }

    public ngOnInit() {
        this.createDynamicInputElement();
    }

    public onMouseOver(event:MouseEvent) {
        if ( ! this.disabled ) this.droped = true;
    }

    public onMouseLeave(event:MouseEvent) {
        if ( ! this.disabled ) this.droped = false;
    }

    public onDragOver(event:DragEvent) {
        event.preventDefault()
        if ( ! this.disabled ) this.droped = true;
    }

    public onDragLeave(event:DragEvent) {
        if ( ! this.disabled ) this.droped = false;
    }

    public onDragEnter(event:DragEvent) {
        return false;
    }

    public onDrop(event:DragEvent) {
        event.preventDefault();

        if ( this.disabled ) return false;

        let fileList = event.dataTransfer.files;

        this.upload(fileList);

        return false;
    }

    public onClick(event:MouseEvent) {
        if ( this.disabled ) return false;

        this.inputFile.click();
    }

    public onChange(event:Event) {

        if ( this.disabled ) return false;

        let target:HTMLInputElement = <HTMLInputElement> event.target;
        let fileList:FileList = target.files;

        this.upload(fileList);

        this.inputFile.value = null;

        return false;
    }

    private upload(fileList:FileList) {

        this.hasError = false;
        this.clearErrors();

        this.checkFilesLength(fileList);
        this.checkTypes(fileList);
        this.checkFilesMaxSize(fileList);

        if ( this.hasError  ) {
            this.droped = false;
            console.log('ERRORS: ', this.errors);
            return false;
        }

        let data = this.getFormData(fileList);

        this.http.upload(this.url, data)
                 .subscribe(
                     (data:any) => { this.onResponse.emit(data) },
                     (err:any)  => { this.alert(err, 'error') }
                 );

        this.droped = false;
    }

    private clearErrors() {
        this.errors.splice(0, this.errors.length);
    }

    private getErrors() {
        return this.errors;
    }

    private getFormData(fileList) {
        let formData = new FormData();
        for ( let i = 0; i < fileList.length ; i++ ) {
            formData.append(`files[]`, fileList[i]);
        }
        return formData;
    }

    private checkFilesLength(fileList) {
        if  ( fileList.length > this.maxFiles ) {
            this.errors.push({'limiteFiles': this.maxFiles });
            this.hasError = true;
        }
    }

    private checkTypes(fileList) {
        let validateType = true;
        for ( let i = 0; i < fileList.length ; i++ ) {
            let find = this.types.find( type => {
                return type == fileList[i].type
            });

            validateType = typeof find !== "undefined";

            if ( ! validateType ) {
                this.errors.push({'fileType': this.types.join(',') });
                this.hasError = true;
                break;
            }
        }
    }

    private checkFilesMaxSize(fileList) {
        let validateMaxSize = true;
        for ( let i = 0; i < fileList.length ; i++ ) {
            validateMaxSize = fileList[i].size <= this.maxFileSize;

            if ( ! validateMaxSize )  {
                this.errors.push({'maxFileSize': this.maxFileSize});
                this.hasError = true;
                break;
            }
        }
    }

    private createDynamicInputElement() {
        this.inputFile = <HTMLInputElement> document.createElement('input');
        this.inputFile.type = 'file';
        this.inputFile.multiple = (this.maxFiles > 1);
        this.inputFile.disabled = this.disabled;
        this.inputFile.accept = this.types.join(',');
        let context = this;
        this.inputFile.onchange = function (event:Event) {
            return context.onChange(event);
        }
    }

    private alert(data:any, type:string) {
        this.notification.alert(data.message, type);
    }
}
