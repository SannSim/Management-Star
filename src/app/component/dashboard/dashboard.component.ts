import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Boards } from 'src/app/boards';
import { Lists } from 'src/app/lists';
import { AuthService } from 'src/app/shared/auth.service';
import { TrelloService } from 'src/app/trello.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lists:Lists[]=[]


  constructor(private auth: AuthService, public trello: TrelloService,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
  //  this.getAllBrd();
  this.actRoute.params.subscribe(({id})=>{
    this.trello.getBoard(id).subscribe((d) => {
      this.trello.getAllLists(id).subscribe(lists => {
        this.lists=lists
        const cardObservables = this.lists.map(list=>this.trello.getAllCards(list.id));
        forkJoin(cardObservables).subscribe(cards => {
          this.lists.forEach((list, index) => {
            list.cards = cards[index];
          })
        })
      })

    })
  })
    
  }

  nouvelleTache: {[key: string]: string} = {};


  ajouterTache(idliste: string) {
    if (this.nouvelleTache[idliste].trim() !== '') {
      this.trello.createCard(idliste,this.nouvelleTache[idliste]);
      this.nouvelleTache[idliste] = '';
      setTimeout(() => {
        location.reload();
      }, 300); // rafraîchissement après 1 seconde (1000 ms)
    }
  }

  suppTache(idcarte:string) {
    if (idcarte.trim() !== '') {
      this.trello.deleteCard(idcarte);
      setTimeout(() => {
        location.reload();
      }, 500); // rafraîchissement après 1 seconde (1000 ms)
    }
  }

  nouvelleListe: string='';

  ajouterListe() {
    this.actRoute.params.subscribe(({id})=>{
    if (this.nouvelleListe.trim() !== '') {
      this.trello.createList(id,this.nouvelleListe)
      this.nouvelleListe = '';
      setTimeout(() => {
        location.reload();
      }, 300); // rafraîchissement après 1 seconde (1000 ms)
    }
  });
  }

  suppListe(idliste:string) {
    if (idliste.trim() !== '') {
      console.log(idliste);
      this.trello.deleteList(idliste);
      setTimeout(() => {
        location.reload();
      }, 500); // rafraîchissement après 1 seconde (1000 ms)
    }
  }


  


  

 

  Logout() {
    this.auth.logout();
  }
}
