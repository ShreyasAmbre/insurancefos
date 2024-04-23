import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss']
})
export class ImgGalleryComponent implements OnInit, OnChanges {
  @Input() imgCollection: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("IMG GALLERY ===>", this.imgCollection)
  }

}
