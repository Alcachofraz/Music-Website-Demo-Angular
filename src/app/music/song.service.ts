import { Injectable } from '@angular/core';
import { Song } from '../song';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SongService {
  private musicUrl = 'api/music'; // URL to Web API

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getMusic(): Observable<Song[]> {
    return this.http.get<Song[]>(this.musicUrl)
      .pipe(
        tap(_ => this.log('Fetched music.')),
        catchError(this.handleError<Song[]>('getMusic', []))
      );
  }

  /** GET movie by id. Will 404 if id not found */
  getSong(id: number): Observable<Song> {
    const url = `${this.musicUrl}/${id}`;
    return this.http.get<Song>(url)
      .pipe(
        tap(_ => this.log(`Fetched song with id=${id}.`)),
        catchError(this.handleError<Song>(`getSong id=${id}`))
      );
  }

  updateSong(song: Song): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.musicUrl, song, httpOptions).pipe(
      tap(_ => this.log(`Updated song with id=${song.id}.`)),
      catchError(this.handleError<any>('updateSong'))
    );
  }

  addSong(song: Song): Observable<Song> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Song>(this.musicUrl, song, httpOptions)
      .pipe(
        tap((newSong: Song) => this.log(`Added song with id=${newSong.id} name= ${newSong.name} url=${newSong.url}`)),
        catchError(this.handleError<Song>('addSong'))
      );
  }

  deleteMovie(song: Song | number): Observable<Song> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const id = typeof song === 'number' ? song : song.id;
    const url = `${this.musicUrl}/${id}`;
    return this.http.delete<Song>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted song with id=${id}.`)), catchError(this.handleError<Song>('deleteSong')));
  }

  searchMusic(term: string): Observable<Song[]> {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Song[]>(`${this.musicUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`Found songs matching "${term}".`)),
        catchError(this.handleError<Song[]>('searchMusic',
          []))
      );
  }


  private log(message: string) {
    this.messageService.add(`SongService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable
 * result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user
      // consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
