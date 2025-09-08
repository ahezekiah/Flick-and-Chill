import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genre-results',
  imports: [CommonModule],
  templateUrl: './genre-results.component.html',
  styleUrl: './genre-results.component.scss'
})
export class GenreResultsComponent implements OnInit {
  results: any[] = [];
  type: string = '';
  genreName: string = '';

  constructor(private location: Location, private movieService: MovieService, private tvService: TvService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const genreId = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.routeConfig?.path || '';
    this.type = path.includes('tv') ? 'tv' : 'movie';

    const genreFetch = this.type === 'movie'
      ? this.movieService.getMovieGenres()
      : this.tvService.getTvGenres();

    genreFetch.subscribe((data: any) => {
      const genreList = data.genres || [];
      this.genreName = genreList.find((g: { id: number; }) => g.id === +genreId!)?.name || 'Genre';
    });

    if (this.type === 'movie') {
      this.movieService.getMoviesByGenre(+genreId!).subscribe((data: any) => {
        this.results = data.results;
      });
    } else {
      this.tvService.getTvByGenre(+genreId!).subscribe((data: any) => {
        this.results = data.results;
      });
    }
  }

  goToDetails(item: any) {
    this.router.navigate(['/details', this.type, item.id]);
  }

  goBack() {
    this.location.back();
  }
}
