import { Component, OnInit, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent implements OnInit {

  constructor(private http: HttpClient, private ref: ElementRef) { }


  ngOnInit() {

  }

}
