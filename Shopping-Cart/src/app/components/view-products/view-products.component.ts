import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faStar, faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { AddService } from 'src/app/services/add-to-cart/add.service';
import { ViewProductModel } from './view-products.model';
import { CartComponent } from '../cart/cart.component';
import { CartModel } from '../cart/cart.model';
import * as $ from "jquery";

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})

export class ViewProductsComponent implements OnInit {

  faStar = faStar;
  faShoppingCart = faShoppingCart;
  faCheckCircle = faCheckCircle;
  
  products: any[] = [];

  @Input('cartItems') AddProduct = [];
  cart : CartComponent;

  errorMsg: string;
  errorFlag: boolean = false;

  closeResult = '';

  constructor(private appService: AppService, private addService: AddService, private modalService: NgbModal) { }

  fetchProductData() {
    this.appService.getProducts()
    .subscribe(  
      (data: ViewProductModel[]) => { this.products = data; },
      (error) => { this.errorMsg = error; this.errorFlag = true }
    );
  }

  ngOnInit() { this.fetchProductData() }

  AddProductData(product: ViewProductModel) {
    this.addService.addToCart(product)
    .subscribe(
      (product) => { this.AddProduct.push(product) },
      (error) => { this.errorMsg = error }
    );

    alert("Item added to cart successfully..!!")
    $("#CheckIn").hide();
    $("#CheckOut").removeAttr("hidden");
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
