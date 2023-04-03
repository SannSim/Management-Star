import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService){}

    ngOnInit(): void{}
    
    register(){

      if(this.email == '') {
        alert('Veuillez renseigner votre email')
        return;
  
    }
  
      if(this.password == '') {
        alert('Veuillez renseigner votre mot de passe')
        return;
        
    }
  
    this.auth.register(this.email, this.password)
    this.email = '';
    this.password = '';
    
  
  }
}