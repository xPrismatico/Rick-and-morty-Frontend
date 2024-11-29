import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { ResponseAPI, Result } from '../../interfaces/ResponseAPI_GetAll';

@Component({
  selector: 'character-button',
  imports: [HttpClientModule],
  providers: [CharacterService],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  private characterService: CharacterService = inject(CharacterService)
  public characters: Result[] = [];
  private currentPage: number = 1;
  private totalPages: number = 1;

  constructor() {
    this.obtenerCharacters();
    //console.log('Lista: ',this.characters);
  }

  async obtenerCharacters() {
    try{
      const response = await this.characterService.getAllCharacters(this.currentPage);
      this.characters = response.results;
      this.totalPages = response.info.pages;
      console.log('Personajes:', this.characters);
    }catch (error){
      console.log('Error en obtenerCharacters', error);
    }
    /*
    this.characterService.getAllCharacters(this.currentPage).then((characters) => {
      console.log(characters);
    }).catch((error) => {
      console.log(error);
    });
    */
  }

  nextPage() {
    if (this.currentPage < this.totalPages)
    this.currentPage++;
    this.obtenerCharacters();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.obtenerCharacters();
    }
  }

  // Getters
  getCurrentPage(): number{
    return this.currentPage;
  }
  getTotalPages(): number{
    return this.totalPages;
  }

  getCharacters(): Result[]{
    return this.characters;
  }
}
