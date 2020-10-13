import { Observable } from 'rxjs';
import { PokedexAgentService } from './pokedex-agent.service';
import { Component } from '@angular/core';
import { PokemonJSON, pokemonGridView, selectedPokemon} from './pokemon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';
  pokedexPokemon = new Array<pokemonGridView>();
  start = 1;
  end = 6;
  rowSize = 2;
  selected:number = 1;
  displayGrid = true;
  currentPokemon = {} as selectedPokemon ;


  constructor(public pokemon: PokedexAgentService) { 
   this.getPokemon(this.start, this.end)
    setInterval(() => {if(this.displayGrid){this.selectedPokemon(true)}}, 500)    
  }

  // ngOnInit() {
  //   this.getPokemon(this.start, this.end)
  //     setInterval(() => {if(this.displayGrid){this.selectedPokemon(true)}}, 500)
  // }

  async getPokemon(start: number, end: number) {
    this.pokedexPokemon = []
    for (let index = start; index <= end; index++) {
      this.pokemon.getPokemonByName('' + index).subscribe(
        (pk: PokemonJSON) => {
          let obj = {} as pokemonGridView;
          obj.name = pk.name
          obj.img = pk.sprites.front_default
          obj.id = pk.id
          this.pokedexPokemon.push(obj)
          this.pokedexPokemon = this.pokedexPokemon.sort((a, b) => (a.id > b.id) ? 1 : -1)
        }
      )

    }

  }

  selectedPokemon(select: boolean) {
    if (select) {
      document.getElementById(this.selected + "").style.background = "#44874e"
    }
    else {
      document.getElementById(this.selected + "").style.background = "none"
    }
  }

  scrollUp() {
    //unselect tile
    this.selectedPokemon(false);
    this.selected-=this.rowSize;

    // check if selected is less than range
    if(this.selected < this.start){
      // checks if the selected is less than mid
      if(this.selected < 1){
        this.selected+=this.rowSize;
        this.start = 1;
        this.end = 9;
      }
      else{
        this.start -= this.rowSize;
        this.end -= this.rowSize;
        this.getPokemon(this.start, this.end);
      }
    }
    //select new tile
    this.selectedPokemon(true);
  }

  scrollDown() {
   //unselect tile
   this.selectedPokemon(false);
   this.selected+=this.rowSize;

   // check if selected is less than range
   if(this.selected > this.end){
     // checks if the selected is less than mid
     if(this.selected >= 152){
       this.selected-=this.rowSize;
       this.start = 142;
       this.end = 152;
     }
     else{
       this.start += this.rowSize;
       this.end += this.rowSize;
       this.getPokemon(this.start, this.end);
     }
   }
   //select new tile
   this.selectedPokemon(true);
  }

  scrollLeft() {
    document.getElementById(this.selected + "").style.background = "none"

    this.selected -= 1
    if (this.start - this.rowSize < 0) {
      this.start = 1
      this.end = 6
      if (this.selected < this.start) {
        this.selected += 1;
      }
    }
    else {
      this.start -= this.rowSize
      this.end -= this.rowSize
    }
    this.getPokemon(this.start, this.end)
    this.selectedPokemon(true)
  }

  scrollRight() {
    document.getElementById(this.selected + "").style.background = "none"

    this.selected += 1
    if (this.selected > this.end) {
      if (this.end + this.rowSize > 152) {
        this.start = 147
        this.end = 152
      }
      else {
        this.start += this.rowSize
        this.end += this.rowSize
      }
      this.getPokemon(this.start, this.end)
    }
    this.selectedPokemon(true)

  }

  openStats(){
    let id = this.selected;
    this.displayGrid = false;
    this.pokemon.getPokemonByName('' + id).subscribe( (pk:PokemonJSON) => {
      this.currentPokemon.name =  pk.name;
      this.currentPokemon.img = pk.sprites.front_default;
      this.currentPokemon.weight = pk.weight;
      // for (let pokemonType in pk.types) {
      //   this.currentPokemon.types.push(pokemonType)
      // }
    })
  }
}
