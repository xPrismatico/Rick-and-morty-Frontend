import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseAPI } from '../interfaces/ResponseAPI_GetAll';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl: string = 'https://rickandmortyapi.com/api';
  public errors: string[] = [];
  private http = inject(HttpClient);

  // Metodo para obtener los personajes
  async getAllCharacters(page: number): Promise<ResponseAPI> {
    try{

      // queryParams
      const queryParams = new HttpParams().set('page', page.toString());


      //https://rickandmortyapi.com/api/character?page=2
      const response = await firstValueFrom(
        this.http.get<ResponseAPI>(`${this.baseUrl}/character`,{params: queryParams})
      );
      return Promise.resolve(response);
      // No overload matches this call Overload 1 of 15, url:
      // Type ArrayBuffer is missing the following properties from type ResponseAPI: info, results
    }catch (error){
      console.log('Error en getAllCharacters', error);
      let e = error as HttpErrorResponse;

      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
