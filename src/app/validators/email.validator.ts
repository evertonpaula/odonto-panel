import { FormControl } from '@angular/forms';

export class EmailValidator {

   static isValidMailFormat(control: FormControl){
        if (control.value == null ) return null;
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if ( control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "email": true };
        }

        return null;
    }

}
