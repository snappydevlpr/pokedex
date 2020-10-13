import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {PokemonJSON,pokemonGridView} from './pokemon'


@Injectable({
  providedIn: 'root'
})
export class PokedexAgentService {

  constructor(private http: HttpClient) { 
  }

  pokemonCollectionGrid:BehaviorSubject<pokemonGridView[]>

  getPokemonByName(id:String){
    return this.http.get("https://pokeapi.co/api/v2/pokemon/"+id)
  }
}
