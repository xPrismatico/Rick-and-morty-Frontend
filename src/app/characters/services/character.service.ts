import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPI } from '../interfaces/ResponseAPI_GetAll';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl: string = 'https://rickandmortyapi.com/api/character';
  public errors: string[] = [];
  private http = inject(HttpClient);

  // Metodo para obtener los personajes
  async getAllCharacters(page: number): Promise<ResponseAPI> {
    try{

      // queryParam
      const queryParams = new HttpParams().set('page', page.toString());

      const response = await firstValueFrom(
        this.http.get<ResponseAPI>(this.baseUrl,{params: queryParams})
      );
      return response;
    }catch (error){
      console.log('Error en getAllCharacters', error);
      let e = error as HttpErrorResponse;

      this.errors.push(e.message);
      return Promise.reject(error);
    }

  }

  // Método para buscar personajes por nombre
  async searchCharacters(name: string): Promise<ResponseAPI> {
    try {
      const queryParams = new HttpParams().set('name', name);

      const response = await firstValueFrom(
        this.http.get<ResponseAPI>(this.baseUrl, { params: queryParams })
      );

      return response;
    } catch (error) {
      console.error('Error en searchCharacters:', error);
      const e = error as HttpErrorResponse;
      this.errors.push(e.message);

      return Promise.reject(error);
    }
  }

  async getCharactersByPage(page: number): Promise<ResponseAPI> {
    try {
      const queryParams = new HttpParams().set('page', page.toString());
      const response = await firstValueFrom(
        this.http.get<ResponseAPI>(this.baseUrl, { params: queryParams })
      );
      return response;
    } catch (error) {
      console.error('Error en getCharactersByPage:', error);
      throw error;
    }
  }

}
