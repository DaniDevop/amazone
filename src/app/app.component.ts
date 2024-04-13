import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductServiceService } from './services/product-service.service';
import { CommonModule } from '@angular/common';
import { Product } from './model/product';
import { ProduitCart } from './model/produit-cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'amazons';

  response: Product[] = []

  cart: ProduitCart[] = []
  message: string = ""
  numberCart!: number

  constructor(private httpService: ProductServiceService) { }

  ngOnInit(): void {
    this.httpService.getAllProduct().subscribe((data: any) => {

      this.response = data.products
    })
  }

  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    const productPanier: ProduitCart = {
      id: product.id,
      qte: 1,
      title: product.title,
      image:product.images[0]
    };

    if (!existingProduct) {


      this.cart = [...this.cart, productPanier]


      console.log(this.cart);
      this.numberCart = this.cart.length
      this.message = "Le produit a bien été ajouté dans la base"
    } else {
      this.cart =
       this.cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item, qte: item.qte + 1
          }
        }
        return item
      })
      this.numberCart = this.cart.length
      this.message = "La quantité a bien été ajouté dans la base de donnée"
      console.log(this.cart);
    }
  }

  removeCart(product: Product) {
    const existingProductIndex = this.cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const existingProduct = this.cart[existingProductIndex];

      if (existingProduct.qte > 1) {
        this.cart =
        this.cart.map((item) => {
         if (item.id === product.id) {
           return {
             ...item, qte: item.qte - 1
           }
         }
         return item
       })
        this.numberCart = this.cart.length
        this.message = "La quantité a bien été diminuée dans la base de données";

      } else {
        this.cart.splice(existingProductIndex, 1);
        this.message = "Le produit a été retiré du panier";
        this.numberCart = this.cart.length
      }

      console.log(this.cart);
    }
  }

    totalCart(){
      return this.cart.reduce((count,item)=>{
         return count + item.qte
      },0)
    }



}
