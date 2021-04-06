import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {TalkserviceService} from '../../services/talkservice.service';
import {TalkModal} from '../../payload/TalkModal';

@Component({
  selector: 'app-subtalk',
  templateUrl: './subtalk.component.html',
  styleUrls: ['./subtalk.component.css']
})
export class SubtalkComponent implements OnInit {

  subtalk$: Array<TalkModal> = [];
  displayViewAll: boolean;

  constructor(private talkService: TalkserviceService) {
    this.talkService.getAllTalks().subscribe( talks => {
      if ( talks.length >= 4) {
       this.subtalk$ = talks.slice(0, 3);
       this.displayViewAll = true;
      } else {
        this.subtalk$ = talks;
      }
        this.subtalk$ = talks;
      });
  }

  ngOnInit(): void {
  }

}
