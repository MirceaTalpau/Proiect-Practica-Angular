import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private readonly serverUrl = 'http://localhost:3000';

  constructor(private httpClient:HttpClient) { }

  getMovies(): Observable <any>{
    return this.httpClient.get(`${this.serverUrl}/movies`);
  }

  addMovie(movieInfo: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/movies`, movieInfo);
  }

  deleteMovie(movieId: number): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/movies/${movieId}`);
  }

}
