import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from './song';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    const music: Song[] = [

      { id: 11, name: 'Routine', url: 'https://www.youtube.com/embed/sh5mWzKlhQY' },
      { id: 12, name: 'Paradise Lost', url: 'https://www.youtube.com/embed/7ixtCoLZVSE' },
      { id: 13, name: 'Confortably Numb', url: 'https://www.youtube.com/embed/_FrOQC-zEog' },
      { id: 14, name: 'Octavarium', url: 'https://www.youtube.com/embed/ZVMIk3xYaYo' },
    ];
    return { music };
  }

  /** Overrides the genId method to ensure that a song always has an id.
  * If the music array is empty, the method below returns the initial number (11).
  * If the movie array is not empty, the method below returns the highest movie id + 1.
  */
  genId(music: Song[]): number {
    return music.length > 0 ? Math.max(...music.map(song =>
      song.id)) + 1 : 11;
  }
} 
