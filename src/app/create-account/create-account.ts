import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../enviroment';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css'] // fixed: styleUrl → styleUrls
})
export class CreateAccount {
  baseUrlIdentity = environment.baseUrlIdentity + '/users';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      street: ['', Validators.required],
      postal_code: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formValues = this.registerForm.value;

    const payload = {
      username: formValues.username,
      email: formValues.email,
      phone: formValues.phone,
      password: formValues.password,
      address: {
        street: formValues.street,
        postal_code: formValues.postal_code,
        city: formValues.city,
        country: formValues.country
      }
    };

    this.http.post(this.baseUrlIdentity, payload).subscribe({
      next: () => alert('Registration successful!'),
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed.');
      }
    });
  }
}
