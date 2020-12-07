import { Component, OnInit } from '@angular/core';
import { faEye, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  title = 'Shopping-Cart';

  faEye = faEye;
  faBars = faBars;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;

  ngOnInit() {
  }

}
