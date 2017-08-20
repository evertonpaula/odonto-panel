import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'show-error',
  encapsulation: ViewEncapsulation.None,
  template:`
    <div *ngIf="validation()">
      <div *ngFor="let error of getErrors()" class="alert alert-danger" role="alert">
            {{ error.message }}
      </div>
    </div>
  `
})
export class ShowErrorComponent {

    @Input() input:FormControl;
    @Input() name:string;

    public type:Object = {
        required: 'O campo :field é obrigatório',
        minlength: 'O campo :field deve conter ao menos :value caracteres',
        maxlength: 'O campo :field pode conter ao máximo :value caracteres',
        equal: 'O campo :field não confere',
        email: 'O campo :field não é um e-mail valido'
    };

    protected value:number=null;

    public validation() {
        return (this.input.touched && this.input.dirty && !this.input.valid)
    }

    public getErrors() {
        if ( this.validation() ) {
            let  errors = Object.keys(this.input.errors);
            if ( ! errors ) [ { message: ''} ];
            let messages = [];
            for(let i in errors) {
                let type = errors[i];
                let message:string;
                if (type == 'minlength' || type == 'maxlength') {
                    this.getMinOrMaxValues(type)
                    message = this.type[type].replace(':field', this.name).replace(':value', this.value)
                } else {
                    message = this.type[type].replace(':field', this.name).replace(':value', this.value)
                }
                messages.push({message})
            }
            return messages;
        }
    }

    protected getMinOrMaxValues(type:string) {
        this.value = this.input.errors[type].requiredLength;
    }
}
