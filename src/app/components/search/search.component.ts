import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,  
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule] // ✅ Add CommonModule and FormsModule
})
export class SearchComponent implements OnInit {
  query: string = '';  
  searchMovieResults: any[] = [];
  searchTVResults: any[] = [];
  recommendedMovies: any[] = [];
  recommendedTVShows: any[] = [];


  constructor(private movieService: MovieService, private router: Router, private tvService: TvService) {}

  ngOnInit() {
    this.getRecommendedMoviesAndTV(); // ✅ Load recommended movies and TV shows
  }

  search() {
    if (this.query.trim() !== '') {
      this.movieService.searchMovies(this.query).subscribe((data: any) => {
        this.searchMovieResults = data.results;
      });

      if (this.query.trim()) {
        console.log('Searching for:', this.query);
        // Call API to fetch movie/TV show results
      }
      this.tvService.searchTVShows(this.query).subscribe((data: any) => {
        this.searchTVResults = data.results;
      });
    } else {
      this.searchMovieResults = [];
      this.searchTVResults = [];
    }
  }
  


  getRecommendedMoviesAndTV() {
    this.movieService.getTrendingMovies().subscribe((data: any) => {
      this.recommendedMovies = this.shuffleArray(data.results).slice(0, 5);
    });
  
    this.tvService.getTrendingTVShows().subscribe((data: any) => {
      this.recommendedTVShows = this.shuffleArray(data.results).slice(0, 5);
    });
  }
  
  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }
  

  viewMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  viewTVShowDetails(tvId: number) {
    this.router.navigate(['/tv', tvId]);
  }
}





