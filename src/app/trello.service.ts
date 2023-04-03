import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Lists } from 'src/app/lists';
import { Cards } from 'src/app/cards';
import { Boards } from 'src/app/boards';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {

  constructor(private http: HttpClient) { }

  public APIKey = '762f3adc455651b61608d70e17161c0a';
  public APIToken = 'ATTA864a24a3bf7a53ab3926a7131ce70b4c477a96555adc824f38a80728c4e214683E636561';

  public listsurl1 = 'https://api.trello.com/1/lists/';
  public listsurlcletoken = `/?key=${this.APIKey}&token=${this.APIToken}`;

  public cardsurl1 = 'https://api.trello.com/1/cards/';
  public cardsurlcletoken = `/?key=${this.APIKey}&token=${this.APIToken}`;

  public boardurl1 = 'https://api.trello.com/1/boards/';
  public boardurlcletoken = `/?key=${this.APIKey}&token=${this.APIToken}`;

  public allcardsurl1 = 'https://api.trello.com/1/lists/';
  public allcardsurlcletoken = `/cards?key=${this.APIKey}&token=${this.APIToken}`;

  public alllistsurl1 = 'https://api.trello.com/1/boards/';
  public alllistsurlcletoken = `/lists?key=${this.APIKey}&token=${this.APIToken}`;

  public allboardsurl1 = `https://api.trello.com/1/members/me/boards?key=${this.APIKey}&token=${this.APIToken}`;

  getList(id: string): Observable<Lists> {
    return this.http.get<Lists>(this.listsurl1 + id + this.listsurlcletoken);
  }

  getCard(id: string): Observable<Cards> {
    return this.http.get<Cards>(this.cardsurl1 + id + this.cardsurlcletoken);
  }

  getBoard(id: string): Observable<Boards> {
    return this.http.get<Boards>(this.boardurl1 + id + this.boardurlcletoken);
  }

  getAllBoards(): Observable<Boards[]> {
    return this.http.get<Boards[]>(this.allboardsurl1);
  }

  getAllLists(boardsid: string): Observable<Lists[]> {
    return this.http.get<Lists[]>(this.alllistsurl1 + boardsid + this.alllistsurlcletoken);
  }

  getAllCards(listsid: string): Observable<Cards[]> {
    return this.http.get<Cards[]>(this.allcardsurl1 + listsid + this.allcardsurlcletoken);
  }

  createCard(idList: string, cardName: string) {

    fetch(`https://api.trello.com/1/cards?name=${cardName}&idList=${idList}&key=${this.APIKey}&token=${this.APIToken}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then(text => console.log(text))
      .catch(err => console.error(err));
  }

  deleteCard(cardId: string) {
    fetch(`https://api.trello.com/1/cards/${cardId}?key=${this.APIKey}&token=${this.APIToken}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
  }

  createList(idBoard: string, listName: string) {

    fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${idBoard}&key=${this.APIKey}&token=${this.APIToken}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then(text => console.log(text))
      .catch(err => console.error(err));
  }

  deleteList(listId: string) {
    fetch(`https://api.trello.com/1/lists/${listId}/closed?value=true&key=${this.APIKey}&token=${this.APIToken}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
  }

  createBoard(boardName: string) {

    fetch(`https://api.trello.com/1/boards/?name=${boardName}&key=${this.APIKey}&token=${this.APIToken}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(
          `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then(text => console.log(text))
      .catch(err => console.error(err));
  }

  deleteBoard(boardId: string) {
    fetch(`https://api.trello.com/1/boards/${boardId}?key=${this.APIKey}&token=${this.APIToken}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
  }
}
