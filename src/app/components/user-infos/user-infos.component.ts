import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../services/update-user.service';
import { CreateUserService } from '../../services/create-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserRequest } from '../../interfaces/user-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-infos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-infos.component.html',
  styleUrl: './user-infos.component.scss'
})
export class UserInfosComponent {
  userInfosForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  private readonly _updateUserService = inject(UpdateUserService);
  private readonly _createUserService = inject(CreateUserService);

  private readonly _router = inject(Router);

  updateUser() {
    this._updateUserService.updateUser(
      this.userInfosForm.value as IUserRequest).subscribe({
        next: () => {
          this.userInfosForm.setErrors({ 'update-success': true });
        },
        error: () => {
          this.userInfosForm.setErrors({ 'update-error': true });
        }
      });
  }

  createUser() {
    this._createUserService.createUser(this.userInfosForm.value as IUserRequest).subscribe({
      next: (value) => {
        this.userInfosForm.setErrors({ 'create-user-success': true });
      },
      error: (error: HttpErrorResponse) => {
        if(error.message.includes('Token não encontrado')) {
          this._router.navigate(['/']);
        }

        const ALREADY_EXISTING_USER = error.status === 409;
        if(ALREADY_EXISTING_USER) {
          return this.userInfosForm.setErrors({ 'existing-user-error': true });
        }

        this.userInfosForm.setErrors({ 'create-user-error': true });
      }
    });
  }
}
