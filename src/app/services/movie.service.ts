import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Ensures the service is globally available
})
export class MovieService {
  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = '667850abdd0cea028093e73ffe673173'; // Replace with your actual API key

  constructor(private http: HttpClient) {} // ✅ Inject HttpClient

  //Movies
  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/trending/movie/week?api_key=${this.API_KEY}`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${id}?api_key=${this.API_KEY}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`);
  }

  getMovieTrailer(movieId: string) {
    return this.http.get(`${this.API_URL}/movie/${movieId}/videos?api_key=${this.API_KEY}`);
  }

  getMovieCredits(movieId: string) {
    return this.http.get(`${this.API_URL}/movie/${movieId}/credits?api_key=${this.API_KEY}`);
  }

  getMovieGenre() {
    return this.http.get(`${this.API_URL}/genre/movie/list?api_key=${this.API_KEY}`);
  }
  
  getPersonDetails(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/person/${id}?api_key=${this.API_KEY}`);
  }
  
  getPopularActors() {
    return this.http.get(`${this.API_URL}/person/popular?api_key=${this.API_KEY}`);
  }

  getMovieTrailers(movieId: string) {
    return this.http.get<any>(`${this.API_URL}/movie/${movieId}/videos?api_key=${this.API_KEY}`);
  }
  
  getMovieVideos(movieId: number) {
    return this.http.get(`${this.API_URL}/movie/${movieId}/videos?api_key=${this.API_KEY}`);
  }
  
  getPersonCredits(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/person/${id}/combined_credits?api_key=${this.API_KEY}`);
  }
  
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/popular?api_key=${this.API_KEY}`);
  }
  
  getMediaDetails(type: string, id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${type}/${id}?api_key=${this.API_KEY}`);
  }

  getMediaVideos(type: string, id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${type}/${id}/videos?api_key=${this.API_KEY}`);
  }
  getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/discover/movie?with_genres=${genreId}&api_key=${this.API_KEY}`);
  }
  getMovieGenres(): Observable<any> {
    return this.http.get(`${this.API_URL}/genre/movie/list?api_key=${this.API_KEY}`);
  }
  
}


