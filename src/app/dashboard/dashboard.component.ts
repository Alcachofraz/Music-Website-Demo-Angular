import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../music/song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  music: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.songService.getMusic()
      .subscribe(music => this.music =
        music.slice(0, 4));
  }
}
