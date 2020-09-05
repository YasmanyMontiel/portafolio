import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.bxslider').bxSlider({
      auto: true,
      autoControls: true,
      stopAutoOnClick: true,
      pager: true,
      slideWidth: 600
    });
  }
 
}
