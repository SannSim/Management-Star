import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  //se connecter
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('token', 'true');
        if (res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      })
      .catch((err) => {
        alert('ERROR');
        this.router.navigate(['/login']);
      });
  }


//s'enregistrer
register(email : string, password : string) {
  this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
    alert('Registration Succesful');
    this.router.navigate(['/login']);
    this.sendEmailForVerification(res.user);
  }, err => {
    alert(err.message);
    this.router.navigate(['/register']);
  })
}

//se déconnecter
logout() {
  this.fireauth.signOut().then( () =>{
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }, err => {
    alert(err.message);
  })
}

//mdp oublié

forgotPassword(email : string){
  this.fireauth.sendPasswordResetEmail(email).then( () =>{
    this.router.navigate(['/verify-email']);
  }, err =>{
    alert('Error');
  })
}

// verifier email
sendEmailForVerification(user: any) {
  user.sendEmailVerification().then(() => {
    this.router.navigate(['/verify-email']);
  }, (err: any) => {
    alert('Error. Not able to send mail');
  });
}

isLoggedIn(){
  return !!localStorage.getItem('token');
}
}