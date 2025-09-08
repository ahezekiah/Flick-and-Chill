import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../pipes/safe.pipe';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../../services/tv.service';

@Component({
  selector: 'app-tv-details',
  imports: [CommonModule, SafePipe],
  standalone: true,
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.scss'
})
export class TvDetailsComponent implements OnInit {
  tv: any;
  trailerUrl: string = '';
  selectedSeason: any;
  seasonTrailer: string = '';
  tvTrailers: string[] = [];
  cast: any[] = [];
  crew: any[] = [];
  genres: string = ''; // ✅ Store genres as a string

  constructor(private route: ActivatedRoute, private tvService: TvService, private location: Location) {}

  ngOnInit() {
    const tvId = this.route.snapshot.paramMap.get('id');
    if (tvId) {
      this.tvService.getTVShowDetails(tvId).subscribe((data: any) => {
        this.tv = data;
        this.genres = data.genres.map((genre: any) => genre.name).join(', '); // ✅ Process genres correctly
      });

      this.tvService.getTVCredits(tvId).subscribe((creditData: any) => {
        this.cast = creditData.cast.slice(0, 10); // ✅ Show only top 10 cast members
        this.crew = creditData.crew.slice(0, 5); // ✅ Show only top 5 crew members
      });

      this.tvService.getTVSeasonTrailer(tvId, this.selectedSeason).subscribe((trailerData: any) => {
        if (trailerData.results.length > 0) {
          this.seasonTrailer = `https://www.youtube.com/embed/${trailerData.results[0].key}`;
        }
      });
      this.getTVShowTrailer(tvId);
    }
  }

  getTVShowTrailer(tvId: string) {
    this.tvService.getTVShowTrailer(tvId).subscribe((data: any) => {
      if (data.results.length > 0) {
        const trailer = data.results.find((video: { type: string; site: string }) => 
          video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
      }
    });
  }
  
  selectSeason(seasonNumber: number) {
    const tvId = this.route.snapshot.paramMap.get('id');
    if (tvId) {
      this.tvService.getTVSeasonDetails(tvId, seasonNumber).subscribe((data: any) => {
        this.selectedSeason = data;
      });
    }   
  }

  getTVShowTrailers() {
    this.tvService.getTVShowVideos(this.tv.id).subscribe((data: any) => {
      this.tv = data.results.filter((video: any) => video.type === 'Trailer');
    });
    this.getTVShowTrailers();
  }
  selectedTab: string = 'details';
    setSelectedTab(tab: string) {
    this.selectedTab = tab;
}
goBack() {
  this.location.back();
}
}