import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TreehouseService {
  constructor(private http: HttpClient) {

  }

  private baseurl = 'http://api.gallifrey.local';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

  AddPost(data: Post): Observable<Post> {
    return this.http.post<Post>(this.baseurl + '/post', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.baseurl + '/post/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetRandomPostId(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.baseurl + '/random/1')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetNewestPostId(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.baseurl + '/newest/1')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
