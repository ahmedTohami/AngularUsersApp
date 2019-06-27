import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { debounceTime, take, map } from 'rxjs/operators';

// export class UniqeNameValidator {
//     static NameShouldBeUnique(control: AbstractControl): Promise<ValidationErrors> | null {
//         //simulate checking the db
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 if (control.value == 'ahmed') {
//                     console.log('not unique')
//                     resolve({ ShouldBeUnique: true })
//                 }
//                 else {
//                     console.log('in null')
//                     resolve(null)
//                 }
//             }, 3000);
//         })
//     }
// }



export class EmailExistValidator {

    static email(db: AngularFireDatabase) {
        return (control: AbstractControl) => {
            const _email = (control.value as string).toLowerCase()
            return db.list('/users', ref => ref.orderByChild('email').equalTo(_email))
                .valueChanges()  //get observable
                .pipe(
                    debounceTime(1000),//give hime 1 second to finish typing
                    take(1), //take first match
                    map(arr => arr.length ? { UserEmailAvailable: false } : null)  //if exist we found match
                )
        }
    }
}

export class NameExistValidator {

    static username(db: AngularFireDatabase) {
        return (control: AbstractControl) => {
            const _name = (control.value as string).toLowerCase()
            return db.list('/users', ref => ref.orderByChild('name').equalTo(_name))
                .valueChanges()  //get observable
                .pipe(
                    debounceTime(1000),//give hime 1 second to finish typing
                    take(1), //take first match
                    map(arr => arr.length ? { UserNameAvailable: false } : null)  //if exist we found match
                )
        }
    }
}


// export class UniqeEmailValidator {
//     static EmailShouldBeUnique(control: AbstractControl): Promise<ValidationErrors> | null {
//         //simulate checking the db
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 if (control.value == 'ahmed@gmail.com') {
//                     console.log('not unique')
//                     resolve({ ShouldBeUnique: true })
//                 }
//                 else {
//                     console.log('in null')
//                     resolve(null)
//                 }
//             }, 3000);
//         })
//     }
// }