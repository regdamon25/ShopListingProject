import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IShoppingList } from './shopping-list';
import { IShoppingItem } from './shopping-item';
@Injectable({
    providedIn: 'root'
})
export class ShoppingListDataService {
    private myAppUrl = "http://localhost:49914/api/shoppingLists";
    constructor(private http: HttpClient)
    {

    }

    getShoppingLists(): Observable<IShoppingList[]> {
        
        return this.http.get<IShoppingList[]>(this.myAppUrl)
        .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    
    

    getShoppingListDetails(id: number): Observable<IShoppingList> {
        const url = `${this.myAppUrl}/${id}`;
       return this.http.get<IShoppingList>(url)
       .pipe(
           tap(_ => console.log(`fetched ShoppingList id=${id}`)),
           catchError(this.handleError)
       );
    }

    getShoppingItemsForShoppingList(id: number): Observable<IShoppingItem[]> {
        const url = `${this.myAppUrl}/${id}` + '/shoppingItems';
        return this.http.get<IShoppingItem[]>(url)
        .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getShoppingItemForShoppingList(id: number, shoppingItemId: number): Observable<IShoppingItem> {
        const url = `${this.myAppUrl}/${id}` + '/shoppingItems' + `${shoppingItemId}`;
        return this.http.get<IShoppingItem>(url)
        .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    addShoppingList(shoppingList: any): Observable<IShoppingList> {
        return this.http.post<IShoppingList>(this.myAppUrl, shoppingList).pipe(
            tap((shoppingListId: IShoppingList) => console.log(`added ShoppingList w/ id=${shoppingListId.id}`)),
            catchError(this.handleError)
        );
    }

    updateShoppingList(id: number, shoppingList: any): Observable<any> {
        const url = `${this.myAppUrl}/${id}`;
        return this.http.put(url, shoppingList).pipe(
            tap(_ => console.log(`updated ShoppingList id=${id}`)),
            catchError(this.handleError)
        );
    }

    deleteShoppingList(id: number): Observable<IShoppingList> {
        const url = `${this.myAppUrl}/${id}`;
        return this.http.delete<IShoppingList>(url).pipe(
            tap(_ => console.log(`deleted ShoppingList id=${id}`)),
            catchError(this.handleError)
        );
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }
}