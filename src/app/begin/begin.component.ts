import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../service/audio'; // Cambiado aquí

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {
  
  isMusicPlaying = false;

  constructor(
    private router: Router,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.isMusicPlaying = this.audioService.getIsPlaying();
  }

  start() {
    this.router.navigateByUrl('/home');
  }
}