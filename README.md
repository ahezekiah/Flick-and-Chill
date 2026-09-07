# Flick & Chill

Flick & Chill is an Angular movie and TV discovery application powered by **The Movie Database (TMDB) API**. The app lets users browse trending and popular movies and TV shows, search for titles, explore genres and actors, watch trailers, view cast and crew information, and see available streaming, rental, and purchase providers.

The project is built with Angular 19, TypeScript, SCSS, Angular Router, Angular SSR, RxJS, and Express.

---

## Features

- Browse trending movies
- Browse trending TV shows
- View popular movies and TV shows
- Search for movies and TV shows
- View detailed movie information
- View detailed TV show information
- Browse movie and TV genres
- View titles by genre
- Browse popular actors
- View actor/person details and credits
- Watch movie and TV trailers
- View movie cast and crew
- View TV show information and seasons
- View streaming providers
- View rental providers
- View purchase providers
- Responsive Angular navigation
- Server-side rendering support
- Dynamic server-rendered detail routes
- SCSS styling
- TMDB poster and profile images

---

## Technology Stack

- Angular 19
- TypeScript
- SCSS
- Angular Router
- Angular HttpClient
- Angular SSR
- RxJS
- Express
- Zone.js
- TMDB API
- YouTube embedded trailers
- Netlify Angular Runtime

---

## How the Application Works

Flick & Chill uses Angular components to display movie, television, genre, actor, trailer, search, and detail pages.

The application communicates with TMDB through two Angular services:

```text
src/app/services/movie.service.ts
src/app/services/tv.service.ts
```

These services use Angular's `HttpClient` to request data from TMDB.

The basic application flow is:

```text
User opens Flick & Chill
        ↓
Angular loads the Home page
        ↓
MovieService and TvService request TMDB data
        ↓
TMDB returns movie / TV data
        ↓
Angular components display the results
        ↓
User selects a movie, show, actor, genre, or trailer
        ↓
Angular Router opens the corresponding page
        ↓
Additional TMDB requests load detailed information
```

Movie posters, TV posters, actor photos, and provider logos are loaded from TMDB's image service.

---

## Main Navigation

The navigation bar provides access to:

- Home
- Movies
- TV Shows
- Genres
- Trailers
- Actors
- Search

The navbar component is located at:

```text
src/app/components/navbar/
```

---

## Pages and Routes

The project contains the following Angular routes:

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/movie` | Movie listing |
| `/movie/:id` | Individual movie details |
| `/tv` | TV show listing |
| `/tv/:id` | Individual TV show details |
| `/search` | Search movies and TV shows |
| `/trailers` | Movie and TV trailers |
| `/genres` | Movie and TV genres |
| `/genres/movie/:id` | Movies in a selected genre |
| `/genres/tv/:id` | TV shows in a selected genre |
| `/actors` | Popular actors |
| `/person/:id` | Actor/person details |
| `/details/:type/:id` | Generic media details |

The route configuration is located in:

```text
src/app/app.routes.ts
```

Server rendering behavior is configured in:

```text
src/app/app.routes.server.ts
```

---

## Home Page

The Home page is located at:

```text
src/app/components/home/
```

When the page loads, it retrieves trending movies and trending TV shows.

The application shuffles the returned results and displays five random movies and five random TV shows.

Selecting a movie navigates to:

```text
/movie/:id
```

Selecting a TV show navigates to:

```text
/tv/:id
```

Because the results are shuffled, the selection shown on the Home page can change between page loads.

---

## Movies

The movie section is handled by:

```text
src/app/components/movie-list/
```

Movie data is retrieved through:

```text
src/app/services/movie.service.ts
```

The movie service contains requests for:

- Trending movies
- Popular movies
- Movie search
- Movie details
- Movie videos
- Movie trailers
- Movie credits
- Movie genres
- Movies by genre
- Person details
- Popular people
- Combined credits
- Watch providers

Movie poster images are loaded from TMDB using URLs such as:

```text
https://image.tmdb.org/t/p/w500
```

---

## Movie Details

Movie detail pages are located at:

```text
src/app/components/movie-details/
```

The route is:

```text
/movie/:id
```

When a movie is selected, the application uses its TMDB ID to retrieve additional information.

The movie detail page can load:

- Movie information
- Genres
- Cast
- Crew
- Trailers
- Streaming providers
- Rental providers
- Purchase providers

The cast list is limited to the first 10 returned cast members.

The crew list is limited to the first 5 returned crew members.

Watch-provider results prefer the United States region when available, followed by Canada, the United Kingdom, or another available region.

---

## TV Shows

The TV section is handled by:

```text
src/app/components/tv-list/
```

TV data is retrieved through:

```text
src/app/services/tv.service.ts
```

The TV service contains requests for:

- Trending TV shows
- Popular TV shows
- TV search
- TV details
- TV videos
- TV trailers
- TV credits
- TV genres
- TV shows by genre
- Season details
- Person details
- Popular people
- Combined credits
- Watch providers

---

## TV Show Details

TV detail pages are located at:

```text
src/app/components/tv-details/
```

The route is:

```text
/tv/:id
```

The page uses the selected TMDB TV ID to retrieve detailed information.

Depending on the available TMDB data, the page can display information about the show, trailers, seasons, and watch providers.

---

## Search

The Search page is located at:

```text
src/app/components/search/
```

The route is:

```text
/search
```

The page searches both movies and TV shows.

When a user enters a search term, the application sends requests through both:

```text
MovieService
TvService
```

Movie results and TV results are stored separately.

When the Search page first loads, it also retrieves trending movies and TV shows, shuffles the results, and uses them as recommendations.

Selecting a result opens the corresponding movie or TV detail page.

---

## Genres

The Genres page is located at:

```text
src/app/components/genres/
```

The route is:

```text
/genres
```

The page retrieves both:

- Movie genres
- TV genres

Selecting a movie genre navigates to:

```text
/genres/movie/:id
```

Selecting a TV genre navigates to:

```text
/genres/tv/:id
```

Genre results are displayed by:

```text
src/app/components/genre-results/
```

---

## Actors

The Actors page is located at:

```text
src/app/components/actors/
```

The route is:

```text
/actors
```

Actor/person information is retrieved from TMDB.

Selecting an actor navigates to:

```text
/person/:id
```

Person details are handled by:

```text
src/app/components/person-details/
```

The application can also retrieve combined credits for a person so their movie and television work can be displayed.

---

## Trailers

The Trailers page is located at:

```text
src/app/components/trailers/
```

The route is:

```text
/trailers
```

When the page loads, it retrieves trending movies and TV shows.

It then:

1. Randomly selects five movies.
2. Requests videos for those movies.
3. Filters the returned videos to trailers.
4. Randomly selects five TV shows.
5. Requests videos for those shows.
6. Filters those results to trailers.

Trailer videos are displayed using YouTube embeds.

---

## SafePipe

The project contains a custom Angular pipe:

```text
src/app/pipes/safe.pipe.ts
```

This pipe is used when displaying embedded trailer URLs so trusted video resources can be used by Angular templates.

---

## TMDB API

Flick & Chill uses **The Movie Database API** as its primary data source.

Base API URL:

```text
https://api.themoviedb.org/3
```

TMDB provides the project with:

- Movies
- TV shows
- Trending content
- Search results
- Genres
- Actors
- Credits
- Trailers
- Seasons
- Images
- Watch-provider information

The project also uses TMDB's image service:

```text
https://image.tmdb.org/t/p/
```

### API Key

The application requires a TMDB API key for its requests.

For security, API keys should not be published in a public README or committed directly to a public repository.

If you are setting up your own copy of this project, create a TMDB API key and configure the application to use it.

A recommended production improvement is to move the key into an Angular environment configuration or a server-side API layer rather than keeping it directly inside the Angular service files.

---

## Angular SSR

The project includes Angular Server-Side Rendering.

SSR-related files include:

```text
src/server.ts
src/main.server.ts
src/app/app.config.server.ts
src/app/app.routes.server.ts
```

Dynamic routes use server rendering:

```text
movie/:id
tv/:id
person/:id
details/:type/:id
genres/movie/:id
genres/tv/:id
```

Other routes use prerendering through the wildcard server route.

This prevents parameterized routes from requiring static prerender parameters for every possible TMDB ID.

---

## Project Structure

```text
Flick-and-Chill-master/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── actors/
│   │   │   ├── footer/
│   │   │   ├── genre-results/
│   │   │   ├── genres/
│   │   │   ├── home/
│   │   │   ├── media-details/
│   │   │   ├── movie-details/
│   │   │   ├── movie-list/
│   │   │   ├── navbar/
│   │   │   ├── person-details/
│   │   │   ├── search/
│   │   │   ├── trailers/
│   │   │   ├── tv-details/
│   │   │   └── tv-list/
│   │   ├── pipes/
│   │   │   └── safe.pipe.ts
│   │   ├── services/
│   │   │   ├── movie.service.ts
│   │   │   └── tv.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts
│   │   └── app.routes.server.ts
│   ├── assets/
│   │   ├── avfvi1ctl.webp
│   │   ├── movie.jpg
│   │   └── placeholder.jpg
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   └── styles.scss
├── .vscode/
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

---

## Important Files

| File | Purpose |
| --- | --- |
| `src/main.ts` | Browser application entry point |
| `src/main.server.ts` | Server-side Angular entry point |
| `src/server.ts` | Express/Angular SSR server |
| `src/app/app.routes.ts` | Client application routes |
| `src/app/app.routes.server.ts` | SSR and prerender route configuration |
| `src/app/app.config.ts` | Angular application providers |
| `src/app/services/movie.service.ts` | TMDB movie API requests |
| `src/app/services/tv.service.ts` | TMDB TV API requests |
| `src/app/components/home/` | Home page |
| `src/app/components/movie-list/` | Movie listing |
| `src/app/components/movie-details/` | Movie details |
| `src/app/components/tv-list/` | TV listing |
| `src/app/components/tv-details/` | TV details |
| `src/app/components/search/` | Movie and TV search |
| `src/app/components/genres/` | Genre listing |
| `src/app/components/genre-results/` | Results for selected genres |
| `src/app/components/actors/` | Popular actors |
| `src/app/components/person-details/` | Person details and credits |
| `src/app/components/trailers/` | Movie and TV trailers |
| `src/app/pipes/safe.pipe.ts` | Safe embedded-resource URLs |
| `src/styles.scss` | Global SCSS styling |
| `angular.json` | Angular build configuration |
| `package.json` | Dependencies and npm scripts |

---

## Requirements

Before running the project locally, install:

- Node.js
- npm
- Git
- A code editor such as VS Code
- A TMDB API key

You can verify Node and npm with:

```bash
node --version
npm --version
```

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd Flick-and-Chill-master
```

If you downloaded the project as a ZIP, extract it and open the extracted project directory instead.

### 2. Install Dependencies

Run:

```bash
npm install
```

This installs the dependencies from `package.json`.

### 3. Configure TMDB Access

The project requires a TMDB API key for movie and television requests.

Before running your own copy, configure a valid TMDB API key for the movie and TV services.

The relevant service files are:

```text
src/app/services/movie.service.ts
src/app/services/tv.service.ts
```

Do not commit a private API key to a public repository.

### 4. Start the Development Server

Run:

```bash
npm start
```

or:

```bash
npx ng serve
```

Angular will start the local development server.

Open:

```text
http://localhost:4200
```

in your browser.

Changes to the Angular source files will automatically trigger a development rebuild.

---

## Local Routes

Once the development server is running, pages can be accessed through URLs such as:

```text
http://localhost:4200/
http://localhost:4200/movie
http://localhost:4200/tv
http://localhost:4200/search
http://localhost:4200/genres
http://localhost:4200/trailers
http://localhost:4200/actors
```

Dynamic pages use TMDB IDs, for example:

```text
http://localhost:4200/movie/123
http://localhost:4200/tv/123
http://localhost:4200/person/123
```

The exact content displayed depends on whether the ID exists in TMDB.

---

## Build the Project

Create a production build with:

```bash
npm run build
```

or:

```bash
npx ng build
```

The configured build output is:

```text
dist/angular-movie-app
```

---

## Run the SSR Production Build

First build the application:

```bash
npm run build
```

Then start the generated SSR server:

```bash
npm run serve:ssr:angular-movie-app
```

The script runs:

```text
node dist/angular-movie-app/server/server.mjs
```

---

## Run Tests

Run the Angular unit tests with:

```bash
npm test
```

The project includes Jasmine/Karma test files for the application components, services, and pipe.

---

## Development Scripts

The `package.json` includes:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Angular development server |
| `npm run build` | Build the application |
| `npm run watch` | Build continuously using the development configuration |
| `npm test` | Run Angular tests |
| `npm run serve:ssr:angular-movie-app` | Start the built SSR server |

---

## Main Dependencies

The project uses:

```text
Angular 19
Angular Router 19
Angular SSR 19
Angular Animations 19
RxJS 7.8
Express 4
TypeScript 5.7
Zone.js 0.15
Netlify Angular Runtime
```

The Angular packages are configured around version `19.1`.

---

## Data Storage

This version of Flick & Chill does not contain a local application database.

Movie and TV information is retrieved from TMDB when the application runs.

The project does not currently implement:

- User registration
- User login
- User profiles
- Saved favorites
- Personal watchlists
- Reviews stored in a database
- LocalStorage-based account data

The application primarily acts as a media discovery interface over TMDB data.

---

## Internet Requirement

An internet connection is required for the main application features.

The app loads remote data and resources from services including:

- TMDB API
- TMDB image servers
- YouTube trailer embeds

Without an internet connection, movie data, television data, posters, actor images, provider information, and trailers may not load.

---

## Current Limitations

- TMDB access requires an API key.
- API configuration should be moved to a safer environment or server-side setup before public production use.
- The application depends on TMDB availability and internet access.
- Search results depend on TMDB's current data.
- Watch-provider availability varies by country and by title.
- Not every movie or TV show has a trailer.
- Not every title has streaming-provider data.
- There is no application database.
- There is no authentication system.
- Users cannot currently save favorites or personal watchlists.
- Some data is represented with flexible `any` types instead of dedicated TypeScript interfaces.
- Several components make independent API requests that could be consolidated or cached in a larger production application.

---

## Future Improvements

Possible future improvements include:

- Move the TMDB API key into secure environment/server configuration
- Add TypeScript interfaces for TMDB responses
- Add loading skeletons
- Add detailed API error messages
- Add pagination
- Add infinite scrolling
- Add movie favorites
- Add TV show favorites
- Add personal watchlists
- Add watched status
- Add user ratings
- Add user reviews
- Add authentication
- Add a backend database
- Add account synchronization
- Add filtering by release year
- Add filtering by rating
- Add sorting options
- Add more detailed actor information
- Add recommendations and similar titles
- Add improved provider-region selection
- Add caching
- Improve accessibility
- Expand automated testing
- Add production environment configuration
- Improve mobile responsiveness

---

## Summary

Flick & Chill is an Angular 19 movie and television discovery application that uses the TMDB API to provide current entertainment information.

Users can browse movies and TV shows, search for titles, explore genres, discover actors, view detailed media information, watch trailers, inspect cast and crew information, and see available streaming, rental, and purchase providers.

The project demonstrates Angular standalone components, Angular routing, HttpClient API integration, TypeScript, SCSS, RxJS, server-side rendering, dynamic routes, custom pipes, Express SSR hosting, and third-party media API integration.

To run the project locally:

```bash
npm install
npm start
```

Then open:

```text
http://localhost:4200
```

in a browser.

