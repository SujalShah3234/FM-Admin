import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators} from '@angular/forms';
import { LogindataService } from './logindata.service';
import { users } from '../users/users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-display',
  templateUrl: './login-display.component.html',
  styleUrls: ['./login-display.component.css']
})
export class LoginDisplayComponent implements OnInit {
loginForm: FormGroup;

constructor(private _router:Router, private _logindata: LogindataService) { }
hide: boolean = true;
ngOnInit() {
    this.loginForm = new FormGroup({
      u_email_id: new FormControl("sujalshah@gmail.com", [Validators.required, Validators.email]),
      u_password: new FormControl(1234, [Validators.required]),
    });
}

onLogin() {
    this._logindata.login(this.loginForm.value).subscribe(
      (x: users[]) => {
        if (x.length == 1){
            localStorage.setItem('u_email_id', this.loginForm.get('u_email_id').value);
            this._router.navigate(['/nav/']);
        }
        else {
          alert("Please Check Your Credentials!");
        }
      }
    );
  }
}
