import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IShoppingList, genId} from '../models/shopping-list';
import { IShoppingItem } from '../models/shopping-item';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };



@Injectable({
    providedIn: 'root'
})
export class ShoppingListDataService {
   
    private myAppUrl = "http://localhost:49914/api/shoppingLists";
    constructor(private http: HttpClient) {

    }

    getShoppingLists(): Observable<IShoppingList[]> {

        return this.http.get<IShoppingList[]>(this.myAppUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }



    getShoppingList(id: string): Observable<IShoppingList> {
        if ( id === '0') {
            return of(this.initializeShoppingList());
        }
        const url = `${this.myAppUrl}/${id}`;
        return this.http.get<IShoppingList>(url)
        .pipe(
            tap(data => console.log('getShoppingList: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getShoppingItemsForShoppingList(id: string): Observable<IShoppingList> {
        
        const url = `${this.myAppUrl}/${id}` + '/shoppingItems';
        return this.http.get<IShoppingList>(url)
            .pipe(
                tap(data => console.log('All: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getShoppingItemForShoppingList(id: string, itemId: string): Observable<IShoppingItem> {
        if (id !== '' && itemId === '') {
            return of(this.initializeShoppingItem());
        }
        const url = `${this.myAppUrl}/${id}` + '/shoppingItems/' + `${itemId}`;
        return this.http.get<IShoppingItem>(url)
            .pipe(
                tap(data => console.log('All: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    
       
        

    addShoppingList(shoppingList: IShoppingList): Observable<HttpResponse<IShoppingList>> {

        return this.http.post<IShoppingList>(this.myAppUrl, shoppingList, { observe: 'response' })
            .pipe(
                tap(data => console.log('addShoppingList: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    addShoppingItem(shoppingItem: IShoppingItem): Observable<HttpResponse<IShoppingItem>> {

        return this.http.post<IShoppingItem>(this.myAppUrl, shoppingItem, { observe: 'response' })
            .pipe(
                tap(data => console.log('addShoppingItem: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteShoppingList(id: string): Observable<IShoppingList> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.myAppUrl}/${id}`;
        return this.http.delete<IShoppingList>(url, { headers }).pipe(
            tap(data => console.log('deleteShoppingList: ' + id)),
            catchError(this.handleError)
        );
    }

    deleteShoppingItem(id: string): Observable<IShoppingItem> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.myAppUrl}/${id}` + '/shoppingItems';
        return  this.http.delete<IShoppingItem>(url, { headers }).pipe(
            tap(data => console.log('deleteShoppingItem: ' + id)),
            catchError(this.handleError)
        );
    }
    
    updateShoppingList(shoppingList: IShoppingList): Observable<IShoppingList> {
        
        const url = `${this.myAppUrl}/${shoppingList.id}`;
        return this.http.put<IShoppingList>(url, shoppingList, httpOptions)
        .pipe(
            tap(() => console.log('updateShoppingList: ' + shoppingList.id)),
            //Return the shoppingList on an update
            map(() => shoppingList),
            catchError(this.handleError)
        );
    }

    updateShoppingItem(shoppingItem: IShoppingItem): Observable<IShoppingItem> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.myAppUrl}/${shoppingItem.id}`;
        return this.http.put<IShoppingItem>(url, shoppingItem, { headers })
        .pipe(
            tap(() => console.log('updateShoppingItem: ' + shoppingItem.id)),
            //Return the shoppingList on an update
            map(() => shoppingItem),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

    

    private initializeShoppingList(): IShoppingList {
        // Return an initialized object
        
        return {
            id: null,
            name: null,
            theme: null,
            createdDate: null,
            shoppingItems: null,
        };
    }

    private initializeShoppingItem(): IShoppingItem {

        return {
            id: null,
            name: null,
            category: null,
            price: null,
            shoppingListId: null
        }
    }


}
