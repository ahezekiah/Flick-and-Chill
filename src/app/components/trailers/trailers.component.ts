import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { SafePipe } from '../../pipes/safe.pipe';  // ✅ Import SafePipe
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule



@Component({
  selector: 'app-trailers',
  imports: [SafePipe, CommonModule], // ✅ Ensure SafePipe and CommonModule are included
  templateUrl: './trailers.component.html',
  styleUrl: './trailers.component.scss'
})
export class TrailersComponent {
  @Input() trailers: string[] = [];
  tvTrailers: any[] = [];
  movieTrailers: any[] = [];

  constructor(private movieService: MovieService, private tvService: TvService) {}

  ngOnInit(): void {
    this.getMovieTrailers();
    this.getTVShowTrailers();
  }

  getMovieTrailers() {
    this.movieService.getTrendingMovies().subscribe((movies: any) => {
      if (movies.results.length) {
        // Pick 5 random movies
        const randomMovies = movies.results.sort(() => 0.5 - Math.random()).slice(0, 5);
        randomMovies.forEach((movie: any) => {
          this.movieService.getMovieVideos(movie.id).subscribe((data: any) => {
            const trailers = data.results.filter((video: any) => video.type === 'Trailer');
            this.movieTrailers.push(...trailers); // Add multiple trailers
          });
        });
      }
    });
  }

  getTVShowTrailers() {
    this.tvService.getTrendingTVShows().subscribe((shows: any) => {
      if (shows.results.length) {
        // Pick 5 random TV shows
        const randomShows = shows.results.sort(() => 0.5 - Math.random()).slice(0, 5);
        randomShows.forEach((show: any) => {
          this.tvService.getTVShowVideos(show.id).subscribe((data: any) => {
            const trailers = data.results.filter((video: any) => video.type === 'Trailer');
            this.tvTrailers.push(...trailers); // Add multiple trailers
          });
        });
      }
    });
  }
}
