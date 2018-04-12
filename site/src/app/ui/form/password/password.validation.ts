import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(ac: AbstractControl) {
        let password = ac.get('password').value; // to get value in input tag
        let confirmPassword = ac.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            ac.get('confirmPassword').setErrors({ MatchPassword: true });
        } else {
            ac.get('confirmPassword').setErrors(null);
            return null
        }
    }
}