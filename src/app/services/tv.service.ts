import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) { }

  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = '667850abdd0cea028093e73ffe673173';

   //TV Shows
  searchTVShows(query: string): Observable<any>{
    return this.http.get(`${this.API_URL}/search/tv?api_key=${this.API_KEY}&query=${query}`);
  }
  
  getTrendingTVShows(): Observable<any>{
    return this.http.get(`${this.API_URL}/trending/tv/week?api_key=${this.API_KEY}`);
  }

  getTVShowDetails(tvId: string): Observable<any>{
    return this.http.get(`${this.API_URL}/tv/${tvId}?api_key=${this.API_KEY}`);
  }
  
  getTVShowTrailer(tvId: string) {
    return this.http.get(`${this.API_URL}/tv/${tvId}/videos?api_key=${this.API_KEY}`);
  }

  getTVCredits(tvId: string) {
    return this.http.get(`${this.API_URL}/tv/${tvId}/credits?api_key=${this.API_KEY}`);
  }
  getTVGenre() {
    return this.http.get(`${this.API_URL}/genre/tv/list?api_key=${this.API_KEY}`);
  }
  getTVSeasonDetails(tvId: string, seasonNumber: number) {
    return this.http.get(`${this.API_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${this.API_KEY}`);
  }
  
  getTVSeasonTrailer(tvId: string, seasonNumber: number) {
    return this.http.get(`${this.API_URL}/tv/${tvId}/season/${seasonNumber}/videos?api_key=${this.API_KEY}`);
  }
  getPopularActors() {
    return this.http.get(`${this.API_URL}/person/popular?api_key=${this.API_KEY}`);
  }

  getTVShowVideos(tvId: number) {
    return this.http.get(`${this.API_URL}/tv/${tvId}/videos?api_key=${this.API_KEY}`);
  }

  getPersonCredits(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/person/${id}/combined_credits?api_key=${this.API_KEY}`);
  }

  getPopularTvShows(): Observable<any> {
    return this.http.get(`${this.API_URL}/tv/popular?api_key=${this.API_KEY}`);
  }
  
  getMediaDetails(type: string, id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${type}/${id}?api_key=${this.API_KEY}`);
  }

  getMediaVideos(type: string, id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${type}/${id}/videos?api_key=${this.API_KEY}`);
  }
  
  getTvEpisodes(tvId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tv/${tvId}/season/1?api_key=${this.API_KEY}`);
  }
  getAllTvSeasons(tvId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tv/${tvId}?api_key=${this.API_KEY}`);
  }
  
  getSeasonDetails(tvId: string, seasonNumber: number): Observable<any> {
    return this.http.get(`${this.API_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${this.API_KEY}`);
  }
  getTvByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/discover/tv?with_genres=${genreId}&api_key=${this.API_KEY}`);
  }
  getTvGenres(): Observable<any> {
    return this.http.get(`${this.API_URL}/genre/tv/list?api_key=${this.API_KEY}`);
  }
  getPersonDetails(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/person/${id}?api_key=${this.API_KEY}`);
  }
  getTVWatchProviders(tvId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tv/${tvId}/watch/providers?api_key=${this.API_KEY}`);
  }
}
