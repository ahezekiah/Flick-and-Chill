import { Location, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-media-details',
  imports: [CommonModule, SafePipe],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss'
})
export class MediaDetailsComponent implements OnInit{
  media: any;
  genres: string = ''; 
  trailerUrl: string | null = null;
  tvEpisodes: any[] = [];
  actors: any[] = [];
  

  constructor(private location: Location, private route: ActivatedRoute, private movieService: MovieService, private tvService: TvService) { }

  ngOnInit() { 
    const id = this.route.snapshot.paramMap.get('id') || '';
    const type = this.route.snapshot.paramMap.get('type') || '';
    const endpoint = type === 'tv' ? 'tv' : 'movie';

    const tvId = this.route.snapshot.paramMap.get('id');
    const movieId: string = this.route.snapshot.paramMap.get('id') ?? ''; // ✅ Ensures it's always a string
    if (tvId) {
      this.tvService.getTVShowDetails(tvId).subscribe((data: any) => {
        this.media = data;
        this.genres = data.genres.map((genre: any) => genre.name).join(', '); // ✅ Process genres correctly
      });
    }
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((data: any) => {
        this.media = data;
        this.genres = data.genres.map((genre: any) => genre.name).join(', '); // ✅ Process genres correctly
      });
    }

    this.movieService.getMediaDetails(endpoint, id).subscribe((data: any) => {
      this.media = data;
    });
    this.tvService.getMediaDetails(endpoint, id).subscribe((data: any) => {
      this.media = data;
    });

    this.movieService.getMediaVideos(endpoint, id).subscribe((data: any) => {
      const movieTrailer = data.results.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (movieTrailer) {
        this.trailerUrl = 'https://www.youtube.com/embed/' + movieTrailer.key;
      }
    });
    this.tvService.getMediaVideos(endpoint, id).subscribe((data: any) => {
      const tvTrailer = data.results.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (tvTrailer) {
        this.trailerUrl = 'https://www.youtube.com/embed/' + tvTrailer.key;
      }
    });

    if (type === 'tv') {
      this.tvService.getTvEpisodes(id).subscribe((data: any) => {
        this.tvEpisodes = data.episodes || [];
      });
    }

  }

  goBack() { 
    this.location.back();
  }

}
