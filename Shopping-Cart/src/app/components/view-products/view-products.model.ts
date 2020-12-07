export class ViewProductModel {
    id:number;
    title:string;
    description:string;
    category:string;
    image:string;
    price:number;
    quantity:number;
    ratings:string;
    reviews:string;
    score:string;
    service:string;
    seller:string;
    
    constructor(id:number, title:string, description:string, category:string, image:string, price:number, quantity:number, 
        ratings:string, reviews:string, score:string, service:string, seller:string) { 
      
        this.id = id;
        this.title = title;
        this.description = description;
        this.category  = category;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.ratings = ratings;
        this.reviews = reviews;
        this.score = score;
        this.service = service;
        this.seller = seller;
    }
  }