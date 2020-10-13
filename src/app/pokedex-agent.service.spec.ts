import { TestBed } from '@angular/core/testing';

import { PokedexAgentService } from './pokedex-agent.service';

describe('PokedexAgentService', () => {
  let service: PokedexAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
