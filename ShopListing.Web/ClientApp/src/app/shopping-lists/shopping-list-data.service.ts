import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ShoppingList, ShoppingItem, ShoppingListResolved} from '../models/shopping-list';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };



@Injectable({
    providedIn: 'root'
})
export class ShoppingListDataService {
   
    private myAppUrl = "http://localhost:49914/api/shoppingLists";
    private endpoint = 'shoppingItems';

    public shoppingList: ShoppingList;
    

    httpOptions = {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json'
        })
      };
      
    constructor(private http: HttpClient) {

    }

    getShoppingLists(): Observable<ShoppingList[]> {

        return this.http.get<ShoppingList[]>(this.myAppUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }



    getShoppingList(id: string): Observable<ShoppingList> {
        if ( id === '0') {
            return of(this.initializeShoppingList());
        }
        const url = `${this.myAppUrl}/${id}`;
        return this.http.get<ShoppingList>(url)
        .pipe(
            tap(data => console.log('getShoppingList: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getShoppingItemsForShoppingList(id: string): Observable<ShoppingList> {
        
        const url = `${this.myAppUrl}/${id}/${this.endpoint}`;
        return this.http.get<ShoppingList>(url)
            .pipe(
                tap(data => console.log('All: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getShoppingItem(id: string, itemId: string): Observable<any> {
        
        if (id !== '' && itemId === '0') {
            return of(this.initializeShoppingItem());
        }
        const url = `${this.myAppUrl}/${id}/${this.endpoint}/${itemId}`;
        return this.http.get(url)
            .pipe(
                tap(data => console.log('All: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    
       
        

    addShoppingList(shoppingList: ShoppingList): Observable<HttpResponse<ShoppingList>> {

        return this.http.post<ShoppingList>(this.myAppUrl, shoppingList, { observe: 'response' })
            .pipe(
                tap(data => console.log('addShoppingList: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    addShoppingItemToShoppingList(id: ShoppingItem, shoppingItem: ShoppingItem): Observable<HttpResponse<ShoppingItem>> {
        
        
        return this.http.post<ShoppingItem>(`${this.myAppUrl}/${id}/${this.endpoint}`, shoppingItem, { observe: 'response' })
            .pipe(
                tap(data => console.log('addShoppingItem: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteShoppingList(id: string): Observable<ShoppingList> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.myAppUrl}/${id}`;
        return this.http.delete<ShoppingList>(url, { headers }).pipe(
            tap(data => console.log('deleteShoppingList: ' + id)),
            catchError(this.handleError)
        );
    }

    deleteShoppingItem(id: string, itemId: string): Observable<ShoppingItem> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.myAppUrl}/${id}/${this.endpoint}/${itemId}`;
        return  this.http.delete<ShoppingItem>(url, { headers }).pipe(
            tap(data => console.log('deleteShoppingItem: ' + id)),
            catchError(this.handleError)
        );
    }
    
    updateShoppingItem(id: ShoppingItem, shoppingItem: ShoppingItem): Observable<any> {
        
        const url = `${this.myAppUrl}/${id}/${this.endpoint}/${shoppingItem.id}`;
        return this.http.put(url, shoppingItem, {headers: new HttpHeaders({'Content-Type': 'application/json'})} )
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError<T>(operation = 'operation', result?: T){
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
      
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
      
            // Let the app keep running by returning an empty result.
            return of(result as T);
    }
}

    

    private initializeShoppingList(): ShoppingList {
        // Return an initialized object
        
        return {
            id: null,
            name: null,
            theme: null,
            createdDate: null,
            shoppingItems: null,
        };
    }

    private initializeShoppingItem(): ShoppingItem {

        return {
            id: null,
            name: null,
            category: null,
            price: null,
            shoppingListId: null
        }
    }


}
