import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { EpisodeInterface } from '../../models/episode';
import { AnimeI } from 'src/app/models/anime';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
})
export class EpisodePage implements OnInit {
  animeId: any;
  ep: number;
  episode: EpisodeInterface;
  anime: AnimeI;
  totalEpisodes: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  btn_next = true;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  btn_back = true;
  constructor(
    public apiSvc: AnimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEpisode();
  }
  getEpisode() {
    const id = this.route.snapshot.params.id;
    this.apiSvc.getEpisode(id).subscribe((res: any) => {
      this.episode = res;
      const url = this.episode?.videos[0]?.video;
      this.createiframe(url);
      this.animeId = this.episode.animeId;
      this.ep = this.episode.epNumber;

      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.apiSvc.getAnime(this.animeId).subscribe((res: any) => {
        this.anime = res;
        this.totalEpisodes = this.anime.episodes.length;
      });
    });
    console.clear();
  }
  createiframe(link) {
    const iframe = document.createElement('iframe');
    iframe.src = `${link}`;
    iframe.allow = 'autoplay';
    iframe.width = '100%';
    // iframe.allowFullscreen;
    iframe.height = '100%';
    iframe.id = 'iframeid';
    iframe.style.border = '0';
    iframe.style.borderRadius = '5px';
    iframe.setAttribute('allowFullscreen', '');
    document.getElementById('iframe').appendChild(iframe);
    console.clear();
  }
  nextButton(ep: any) {
    console.clear();
    // eslint-disable-next-line eqeqeq
    if (ep == this.totalEpisodes) {
      this.btn_next = false;
    }
    if (ep < this.totalEpisodes) {
      const newCap = ep + 1;
      const animeId = this.route.snapshot.params.id;
      const cut = `-episodio-${ep}`;
      const f = animeId.replace(cut, '');
      const res = `${f}-episodio-${newCap}`;
      this.router.navigate(['ver/', res]);
    }
  }
  backButton(ep: any) {
    console.clear();
    if (ep < 2) {
      this.btn_back = false;
    }
    if (ep > 1) {
      const newCap = ep - 1;
      const animeId = this.route.snapshot.params.id;
      const cut = `-episodio-${ep}`;
      const f = animeId.replace(cut, '');
      const res = `${f}-episodio-${newCap}`;
      this.router.navigate(['ver/', res]);
    }
  }
  getVideo(video: any) {
    const old = document.getElementById('iframe');
    const cont = document.getElementById('iframeid');
    old.removeChild(cont);
    const iframe = document.createElement('iframe');
    iframe.src = `${video}`;
    iframe.allow = 'autoplay';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allowFullscreen = true;
    iframe.id = 'iframeid';
    iframe.style.border = '0';
    iframe.style.borderRadius = '5px';
    document.getElementById('iframe').appendChild(iframe);
    console.clear();
  }
}
