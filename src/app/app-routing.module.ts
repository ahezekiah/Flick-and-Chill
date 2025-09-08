import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchComponent } from './components/search/search.component';
import { TvDetailsComponent } from './components/tv-details/tv-details.component';
import { TvListComponent } from './components/tv-list/tv-list.component';
import { HomeComponent } from './components/home/home.component';
import { TrailersComponent } from './components/trailers/trailers.component';
import { GenresComponent } from './components/genres/genres.component';
import { ActorsComponent } from './components/actors/actors.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { GenreResultsComponent } from './components/genre-results/genre-results.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'tv', component: TvListComponent },
  { path: 'tv/:id', component: TvDetailsComponent },
  { path: 'trailers', component: TrailersComponent },  // ✅ Trailers Page
  { path: 'genres', component: GenresComponent },  // ✅ Genres Page
  { path: 'actors', component: ActorsComponent },  // ✅ Actors Page
  { path: 'person/:id', component: PersonDetailsComponent },  // ✅ Person Details Page
  { path: 'details/:type/:id', component: MediaDetailsComponent},// ✅ Media Details Page
  { path: 'genres/movie/:id', component: GenreResultsComponent },
  { path: 'genres/tv/:id', component: GenreResultsComponent }, // ✅ Genre Results Page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

