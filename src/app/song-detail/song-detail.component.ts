import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SongService } from '../music/song.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input() song: Song;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private songService: SongService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSong();
  }

  getSong(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.songService.getSong(id)
      .subscribe(song => this.song = song);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.songService.updateSong(this.song)
      .subscribe(() => this.goBack());
  }
}
