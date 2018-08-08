import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    onEdit: boolean = true;
    onSave: boolean = false;
    showField: boolean = false;
    showText = '';


    editForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.editForm = this.fb.group({
            fullName: ['', [Validators.required]]
        });

    }
    ngOnInit() {

    }
    onClickEdit() {
        this.showField = true;
        this.onSave = true;
        this.onEdit = false;
    }

    onClickSave(form){
       
        if(form.valid){
          this.showField = false;
          this.onSave = false;
          this.onEdit = true;
          this.showText = form.value.fullName;
        }else{
            this.validateAllFormFields(form);
        }
    }
  

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
