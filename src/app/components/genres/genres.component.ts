import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { TvService } from '../../services/tv.service';



@Component({
  selector: 'app-genres',
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule to imports
  standalone: true,
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent implements OnInit {
  movieGenres: any[] = [];
  tvGenres: any[] = [];

  constructor(private movieService: MovieService, private tvService: TvService, private router: Router) {}

  ngOnInit() {
    this.movieService.getMovieGenres().subscribe((data: any) => this.movieGenres = data.genres);
    this.tvService.getTvGenres().subscribe((data: any) => this.tvGenres = data.genres);
  }

  goToMovieGenre(genreId: number) {
    this.router.navigate(['/genres/movie', genreId]);
  }

  goToTvGenre(genreId: number) {
    this.router.navigate(['/genres/tv', genreId]);
  }


}
