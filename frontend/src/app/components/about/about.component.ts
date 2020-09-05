import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;
  constructor() {
    this.title = "Ing. Yasmany Montiel Rivera";
    this.subtitle = "Full Stack web developer";
    this.email = "yasmontiel87@gmail.com";
   }

  ngOnInit(): void {
  }

}
