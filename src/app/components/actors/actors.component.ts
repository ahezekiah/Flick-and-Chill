import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actors',
  imports: [CommonModule],
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {
  actors: any[] = [];

  constructor(private movieService: MovieService, private tvService: TvService, private router: Router) {}

  ngOnInit() {
    this.movieService.getPopularActors().subscribe((data: any) => {
      this.actors = data.results;
    });
    this.tvService.getPopularActors().subscribe((data: any) => {
      this.actors = data.results;
    });
  }

  goToPerson(id: number) {
    this.router.navigate(['/person', id]);
  }
}
