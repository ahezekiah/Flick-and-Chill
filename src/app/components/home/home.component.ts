import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-home',
  imports: [CommonModule], // ✅ Ensure CommonModule is included
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  randomMovies: any[] = [];
  randomTVShows: any[] = [];


  constructor(private movieService: MovieService, private tvService: TvService, private router: Router) {}

  ngOnInit() {
    this.getRandomMovies();
    this.getRandomTVShows();
  }

  getRandomMovies() {
    this.movieService.getTrendingMovies().subscribe((data: any) => {
      this.randomMovies = this.shuffleArray(data.results).slice(0, 5); // Get 5 random movies
    });
  }

  getRandomTVShows() {
    this.tvService.getTrendingTVShows().subscribe((data: any) => {
      this.randomTVShows = this.shuffleArray(data.results).slice(0, 5); // Get 5 random TV shows
    });
  }

  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  viewMovieDetails(movieId: number) {
    this.router.navigate([`/movie/${movieId}`]);
  }

  viewTVShowDetails(tvShowId: number) {
    this.router.navigate([`/tv/${tvShowId}`]);
  }
}

