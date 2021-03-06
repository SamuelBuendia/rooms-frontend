import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/modules/toast/_services/toast.service';
import { AuthService } from 'src/app/modules/auth';
import { FunctionaryModel as Model } from '../../_models/functionary.model';
import { FunctionaryService as ModelsService } from '../../_services/functionary.service';

@Component({
  selector: 'app-functionary-edit',
  templateUrl: './functionary-edit.component.html',
  styleUrls: ['./functionary-edit.component.scss']
})
export class FunctionaryEditComponent implements OnInit, OnDestroy {
  public id: number;
  public model: Model;
  public previous: Model;
  public formGroup: FormGroup;
  public requesting: boolean;

  public tabs = {
    BASIC_TAB: 0,
  };

  public name: AbstractControl;
  public last_name: AbstractControl;
  public identification_number: AbstractControl;
  public phone: AbstractControl;
  public mobile: AbstractControl;
  public address: AbstractControl;
  public institutional_email: AbstractControl;
  public personal_email: AbstractControl;
  public birth_date: AbstractControl;
  public profession: AbstractControl;
  public active: AbstractControl;
  public user: AbstractControl;

  public activeTabId: number;
  private subscriptions: Subscription[] = [];

  public saveAndExit;

  constructor(
    private fb: FormBuilder,
    private modelsService: ModelsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.activeTabId = this.tabs.BASIC_TAB; // 0 => Basic info | 1 => Profile
    this.saveAndExit = false;
    this.requesting = false;

    this.formGroup = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      identification_number: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      institutional_email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      personal_email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      birth_date: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      profession: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      active: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      user: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    });
    this.name = this.formGroup.controls['name'];
    this.last_name = this.formGroup.controls['last_name'];
    this.identification_number = this.formGroup.controls['identification_number'];
    this.phone = this.formGroup.controls['phone'];
    this.mobile = this.formGroup.controls['mobile'];
    this.address = this.formGroup.controls['address'];
    this.institutional_email = this.formGroup.controls['institutional_email'];
    this.personal_email = this.formGroup.controls['personal_email'];
    this.birth_date = this.formGroup.controls['birth_date'];
    this.profession = this.formGroup.controls['profession'];
    this.active = this.formGroup.controls['active'];
    this.user = this.formGroup.controls['user'];
  }

  ngOnInit(): void {
    this.id = undefined;
    this.model = undefined;
    this.previous = undefined;
    this.get();
  }

  get() {
    this.requesting = true;
    const sb = this.route.paramMap.pipe(
      switchMap(params => {
        // get id from URL
        this.id = Number(params.get('id'));
        if (this.id || this.id > 0) {
          return this.modelsService.getById(this.id);
        }
        return of({ 'functionary': new Model() });
      }),
      catchError((error) => {
        this.requesting = false;
        let messageError = [];
        if (!Array.isArray(error.error)) {
          messageError.push(error.error);
        } else {
          messageError = error.error;
        }
        Object.entries(messageError).forEach(
          ([key, value]) => this.toastService.growl('error', key + ': ' + value)
        );
        return of({ 'functionary': new Model() });
      }),
    ).subscribe((response: any) => {
      this.requesting = false;
      if (response) {
        this.model = response.functionary;
        if (response.users) {
          this.model.user = response.users[0];
        }
        this.previous = Object.assign({}, this.model);
        this.loadForm();
      }
    });
    this.subscriptions.push(sb);
  }

  loadForm() {
    if (this.model.id) {
      this.name.setValue(this.model.name);
      this.last_name.setValue(this.model.last_name);
      this.identification_number.setValue(this.model.identification_number);
      this.phone.setValue(this.model.phone);
      this.mobile.setValue(this.model.mobile);
      this.address.setValue(this.model.address);
      this.institutional_email.setValue(this.model.institutional_email);
      this.personal_email.setValue(this.model.personal_email);
      this.birth_date.setValue(new Date(this.model.birth_date));
      this.profession.setValue(this.model.profession);
      this.active.setValue(this.model.active);
      if (this.model.user) {
        this.user.setValue(this.model.user);
      }
    }
    this.formGroup.markAllAsTouched();
  }

  reset() {
    if (this.previous) {
      this.model = Object.assign({}, this.previous);
      this.loadForm();
    }
  }

  save(saveAndExit) {
    this.saveAndExit = saveAndExit;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formValues = this.formGroup.value;
      this.model = Object.assign(this.model, formValues);
      if (this.id) {
        this.edit();
      } else {
        this.create();
      }
    }
  }

  edit() {
    this.requesting = true;
    let model = this.model;
    model.birth_date = this.formatDate(this.birth_date.value);
    model.active = this.model.active;
    if (this.model.user) {
      model.user = this.model.user.id;
    }

    const sbUpdate = this.modelsService.patch(this.id, model).pipe(
      tap(() => {
        this.toastService.growl('success', 'success');
        if (this.saveAndExit) {
          this.router.navigate(['/functionarys']);
        }
      }),
      catchError((error) => {
        this.requesting = false;
        let messageError = [];
        if (!Array.isArray(error.error)) {
          messageError.push(error.error);
        } else {
          messageError = error.error;
        }
        Object.entries(messageError).forEach(
          ([key, value]) => this.toastService.growl('error', key + ': ' + value)
        );
        return of(this.model);
      })
    ).subscribe(response => {
      this.requesting = false;
      this.model = response.functionary
    });
    this.subscriptions.push(sbUpdate);
  }

  create() {
    this.requesting = true;

    let model = this.model;
    model.active = this.active.value;

    model.birth_date = undefined;
    if (this.birth_date.value) {
      model.birth_date = this.formatDate(this.birth_date.value);
    }

    if (this.model.user) {
      model.user = this.model.user.id;
    }

    const sbCreate = this.modelsService.post(model).pipe(
      tap(() => {
        this.toastService.growl('success', 'success');
        if (this.saveAndExit) {
          this.router.navigate(['/functionarys']);
        } else {
          this.formGroup.reset()
        }
      }),
      catchError((error) => {
        this.requesting = false;
        let messageError = [];
        if (!Array.isArray(error.error)) {
          messageError.push(error.error);
        } else {
          messageError = error.error;
        }
        Object.entries(messageError).forEach(
          ([key, value]) => this.toastService.growl('error', key + ': ' + value)
        );
        return of(this.model);
      })
    ).subscribe(response => {
      this.requesting = false;
      this.model = response.functionary as Model
    });
    this.subscriptions.push(sbCreate);
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  public getValidClass(valid) {
    let stringClass = 'form-control form-control-lg form-control-solid';
    if (valid) {
      stringClass += ' is-valid';
    } else {
      stringClass += ' is-invalid';
    }
    return stringClass;
  }

  public formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    if (hours.length < 2) {
      hours = '0' + hours;
    }

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    return [year, month, day].join('-');
  }
}
