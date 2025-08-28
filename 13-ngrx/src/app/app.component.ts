import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './author/author.reducer';
import { Store } from '@ngrx/store';
import { Author } from './author/model/author.model';
import { addAuthor, addAuthors } from './author/author.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  authors$: Observable<Author[]>;
  firstName: string;
  lastName: string;

  constructor(private store: Store<{ authors: State }>) {
    // It comes from StoreModule.forRoot({ authors: authorReducer }) 
    this.authors$ = this.store.select(state => state.authors.authors);
  }

  ngOnInit() {
    this.authors$.subscribe(authors => {
      console.log('Authors from the store:', authors);
    });
  }

  addNewAuthor() {
    console.log(this.firstName + ' ' + this.lastName);
    const newAuthor: Author = { firstName: this.firstName, lastName: this.lastName };

    // this.store.dispatch(addAuthor({ author: newAuthor}));
    this.store.dispatch(addAuthors({ authors: [newAuthor] }));
  }
}
