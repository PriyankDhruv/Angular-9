import { Component, OnInit } from '@angular/core';
import { faStar, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewCartService } from 'src/app/services/cart/view-cart/view-cart.service';
import { DeleteService } from 'src/app/services/cart/delete-product/delete.service';
import { CartModel } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  mark: number = 0;

  faStar = faStar;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle; 

  cartItems: any[] = [];
  errorMsg: string;
  errorFlag: boolean = false;

  closeResult = '';

  constructor(private viewCartService: ViewCartService, private deleteService: DeleteService, private modalService: NgbModal) { }
  
  fetchProductData() {
    this.viewCartService.getProducts()
    .subscribe(  
      (data: CartModel[]) => { this.cartItems = data; },
      (error) => { this.errorMsg = error; this.errorFlag = true }
    );
  }

  ngOnInit() { 
    this.fetchProductData(); 
    this.cartItems.forEach(product => { product.quantity = 1; });
  }

  deleteProductData(id: number){
    if (confirm("Are you sure you want to remove this item ?")) {
      this.deleteService.deleteProduct(id)
      .subscribe(
        data => {
          this.fetchProductData();
          return true;
        },
        (error) => { this.errorMsg = error; this.errorFlag = true }
      );
    }
  }

  getTotal() {
    return this.sortItems.map(tag => tag.quantity * tag.price).reduce((a, b, c) => a + b, 0);
  }
    
  get sortItems() {
    return this.cartItems.sort((a, b) => {
      return <any>a.id - <any>b.id;
    });
  }

  increment(product: any) : number {
    if(product.quantity < 5){
      product.quantity++;
    }
    return product.quantity;
  }

  decrement(product: any): number {
    if(product.quantity > 1){
      product.quantity--;
    }
    return product.quantity;
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
