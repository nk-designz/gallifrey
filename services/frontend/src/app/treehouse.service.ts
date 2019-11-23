import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post, PostListEntry } from './post';
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
      errorMessage = error.error.message;
    } else {
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

  GetRandomPostId(): Observable<Array<PostListEntry>> {
    return this.http.get<Array<PostListEntry>>(this.baseurl + '/random/1')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetNewestPostId(postNumber: number): Observable<Array<PostListEntry>> {
    return this.http.get<Array<PostListEntry>>(this.baseurl + '/newest/' + postNumber)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
