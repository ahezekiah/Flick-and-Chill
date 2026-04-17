import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // ✅ Import CommonModule
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { SafePipe } from '../../pipes/safe.pipe';  // ✅ Import SafePipe

@Component({
  selector: 'app-movie-details',
  standalone: true, // ✅ Ensure this is a standalone component
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports: [CommonModule, SafePipe] // ✅ Add CommonModule to enable *ngIf
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  genres: string = ''; // ✅ Store genres as a string
  trailerUrl: string = '';
  movieTrailers: string[] = [];
  selectedTab: string = 'details';

  streamingProviders: any[] = [];
  rentProviders: any[] = [];
  buyProviders: any[] = [];
  providerRegion: string = '';
  providerLink: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) {}

  ngOnInit(): void {
    const movieId: string = this.route.snapshot.paramMap.get('id') ?? ''; // ✅ Ensures it's always a string
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((data: any) => {
        this.movie = data;
        this.genres = data.genres.map((genre: any) => genre.name).join(', '); // ✅ Process genres correctly
      });

      this.movieService.getMovieCredits(movieId).subscribe((creditData: any) => {
        this.cast = creditData.cast.slice(0, 10); // ✅ Show only top 10 cast members
        this.crew = creditData.crew.slice(0, 5); // ✅ Show only top 5 crew members
      });

      this.movieService.getMovieTrailers(movieId).subscribe(data => {
        this.movieTrailers = data.results
          .filter((video: any) => video.type === 'Trailer')
          .map((video: any) => `https://www.youtube.com/embed/${video.key}`);
      });
    }
      this.getMovieTrailer(movieId); // ✅ Fetch trailer
      this.getMovieWatchProviders(movieId); // ✅ Fetch watch providers
    }

    switchTab(tab: string) {
      this.selectedTab = tab;
    }

    getMovieTrailer(movieId: string) {
      this.movieService.getMovieTrailer(movieId).subscribe((data: any) => {
        if (data.results.length > 0) {
          // 🔹 Add explicit type for video
          // const trailer = data.results.find((video: { type: string; site: string }) => 
          //   video.type === "Trailer" && video.site === "YouTube"
          // );
          const trailer = data.results.find((video: any) => video.type === 'Trailer');
          if (trailer) {
            this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
          } else {
            this.trailerUrl = '';
          }
        }
      });
    }

    getMovieTrailers() {
      this.movieService.getMovieVideos(this.movie.id).subscribe((data: any) => {
        this.movieTrailers = data.results.filter((video: any) => video.type === 'Trailer');
      });
      this.getMovieTrailers();
    }
    
  getMovieWatchProviders(movieId: string) {
  this.movieService.getMovieWatchProviders(movieId).subscribe((data: any) => {
    console.log('movieId:', movieId);
    console.log('MOVIE WATCH PROVIDERS RESPONSE:', data);

    const results = data?.results || {};
    console.log('AVAILABLE MOVIE REGIONS:', Object.keys(results));

    const providers =
      results['US'] ||
      results['CA'] ||
      results['GB'] ||
      Object.values(results)[0];

    if (!providers) {
      console.log('No movie providers found');
      this.streamingProviders = [];
      this.rentProviders = [];
      this.buyProviders = [];
      this.providerLink = '';
      return;
    }

    this.streamingProviders = (providers as any).flatrate || [];
    this.rentProviders = (providers as any).rent || [];
    this.buyProviders = (providers as any).buy || [];
    this.providerLink = (providers as any).link || '';
  });
}

    goBack() {
      this.location.back();
    }
  }


  
  


