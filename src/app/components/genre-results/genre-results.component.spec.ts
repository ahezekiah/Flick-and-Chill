import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreResultsComponent } from './genre-results.component';

describe('GenreResultsComponent', () => {
  let component: GenreResultsComponent;
  let fixture: ComponentFixture<GenreResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
