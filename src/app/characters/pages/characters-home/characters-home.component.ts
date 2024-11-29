import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CharacterService } from '../../services/character.service';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'characters-page-home',
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './characters-home.component.html',
  styleUrl: './characters-home.component.css'
})
export class CharactersHomeComponent {
  private characterService = inject(CharacterService);
  public characters: any[] = [];
  public currentPage: number = 1;
  public maxPage: number = 1;
  public searchQuery: string = '';

  constructor() {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: number): void {
    this.characterService.getCharactersByPage(page).then((response) => {
      this.characters = response.results;
      this.maxPage = response.info.pages;
    });
  }

  searchCharacters(query: string): void {
    if (query) {
      this.characterService.searchCharacters(query).then((response) => {
        this.characters = response.results;
      });
    } else {
      this.getCharacters(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.getCharacters(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacters(this.currentPage);
    }
  }
}
