import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';

@Component({
  selector: 'app-person-details',
  imports: [CommonModule],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent implements OnInit {
  personCredits: any[] = [];
  personName: string = '';
  personId!: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private tvService: TvService, private router: Router, private location: Location) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getPersonCredits(id).subscribe(data => {
      this.personCredits = data.cast.concat(data.crew).sort(() => 0.5 - Math.random()).slice(0, 20);
    });
    this.tvService.getPersonCredits(id).subscribe(data => {
      this.personCredits = data.cast.concat(data.crew).sort(() => 0.5 - Math.random()).slice(0, 20);
    });


    this.personId = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.getPersonDetails(this.personId).subscribe((data: any) => {
      this.personName = data.name;
      // populate additional data if needed
    });
  }

  goToMediaDetails(item: any) {
    const type = item.media_type === 'movie' ? 'movie' : 'tv';
    this.router.navigate(['/details', type, item.id]);
  }
  goBack() {
    this.location.back();
  }
}

