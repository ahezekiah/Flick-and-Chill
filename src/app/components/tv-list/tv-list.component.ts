import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TvService } from '../../services/tv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tv-list.component.html',
  styleUrl: './tv-list.component.scss'
})
export class TvListComponent implements OnInit {
  tvShows: any[] = [];

  constructor(private tvService: TvService, private router: Router) {}

  ngOnInit() {
    this.tvService.getTrendingTVShows().subscribe(data => {
      this.tvShows = data.results;
    });
  }

  viewDetails(tvShowId: number) {
    this.router.navigate([`/tv/${tvShowId}`]);
  }

}
