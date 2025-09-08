import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [CommonModule] // ✅ Ensure CommonModule is included
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe(data => {
      this.movies = data.results;
    });
  }

  viewDetails(movieId: number) {
    this.router.navigate([`/movie/${movieId}`]);
  }
}
