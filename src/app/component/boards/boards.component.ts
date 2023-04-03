import { Component,OnInit } from '@angular/core';
import { Boards } from 'src/app/boards';
import { TrelloService } from 'src/app/trello.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit{

  constructor(private auth: AuthService, public trello: TrelloService) { }


  boards:Boards[]=[]


  ngOnInit(): void {
  this.getAllBrd();    
  }
  getAllBrd(){
    this.trello.getAllBoards().subscribe(res=>{
      this.boards=res
    })
  }

  nouveauBoard: string='';

  ajouterBoard() {
    if (this.nouveauBoard.trim() !== '') {
      this.trello.createBoard(this.nouveauBoard)
      this.nouveauBoard = '';
      setTimeout(() => {
        location.reload();
      }, 300); // rafraîchissement après 1 seconde (1000 ms)
    }
  }

  suppBoard(idboard:string,event: MouseEvent) {
    event.stopImmediatePropagation();
    if (idboard.trim() !== '') {
      console.log(idboard);
      this.trello.deleteBoard(idboard);
      setTimeout(() => {
        location.reload();
      }, 500); // rafraîchissement après 1 seconde (1000 ms)
    }
  }

  Logout() {
    this.auth.logout();
  }
  
}
