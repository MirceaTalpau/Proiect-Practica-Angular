import { AuthService } from './../../_core/services/auth-service/auth.service';
import { AuthComponent } from './../auth/auth.component';
import { HttpClient } from '@angular/common/http';
import { forbiddenNameValidator } from 'src/app/_core/validators/user-name.validator';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.AuthService
        .register(this.validateForm.value)
        .subscribe((response: any) => {
          console.log(response);
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: UntypedFormBuilder,
    private AuthService: AuthService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [
        null,
        [Validators.email, Validators.required, Validators.minLength(5)],
      ],
      password: [null, [Validators.required, Validators.minLength(5)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      fname: [
        null,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(3),
        ],
      ],
      lname: [
        null,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(3),
        ],
      ],
    });
  }
}
