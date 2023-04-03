import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { TrelloService } from 'src/app/trello.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService){}

  ngOnInit() : void{

  }

  login(){

    if(this.email == '') {
      alert('Veuillez renseigner votre email')
      return;

  }

    if(this.password == '') {
      alert('Veuillez renseigner votre mot de passe')
      return;
      
  }

  this.auth.login(this.email, this.password)
  this.email = '';
  this.password = '';
  

  }
  

}
