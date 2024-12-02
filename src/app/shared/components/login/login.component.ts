import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../../services/aut.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
  })
  export class LoginComponent {
    procesando: boolean = false;

  constructor(
    private router: Router,
    private authService: AutService
  ){

  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  iniciarSesion(){
    if (this.form.valid) {
      this.procesando = true;
      const {email, password} = this.form.getRawValue();
     /*  "email": "john@mail.com",
         "password": "changeme" */

      this.authService.login(email, password).subscribe({
        next: (data) => {
          //console.log(data);
          this.authService.setAccessToken(data.access_token, data.refresh_token);
        },
        error: (error) => {
          console.error(error);
          this.procesando = false;
          alert("credenciales invalidas")
        },
        complete: () => {
          this.router.navigateByUrl('/app/dashboard');
          this.procesando = false;
        }
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

}
