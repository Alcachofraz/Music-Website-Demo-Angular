import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from './song.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  music: Song[];

  constructor(private songService: SongService) { }

  getMovies(): void {
    this.songService.getMusic().subscribe(music => this.music = music);
  }

  ngOnInit(): void {
    this.getMovies();
  }

  add(name: string, url: string): void {
    name = name.trim();
    url = url.trim();
    if (!name || !url) { return; }
    this.songService.addSong({ name, url } as Song)
      .subscribe(song => {
        this.music.push(song);
      });
  }

  delete(song: Song): void {
    this.music = this.music.filter(s => s !== song);
    this.songService.deleteMovie(song).subscribe();
  }
}
