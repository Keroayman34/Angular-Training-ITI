import { Component } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import {
  CurrencyPipe,
  DatePipe,
  LowerCasePipe,
  NgClass,
  NgStyle,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { ShortenPipe } from '../../pipes/shorten-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { DisableAfterClick } from '../../directives/disable-after-click'; // NEW

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgClass,
    NgStyle,
    Highlight,
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    ShortenPipe,
    DiscountPipe,
    DisableAfterClick, // NEW
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  totalOrderPrice: number = 0;
  selectedCatId: number = 0;
  date = new Date();

  products: IProduct[] = [
    {
      id: 1,
      name: 'Laptop',
      imgUrl:
        'https://fastly.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
      price: 1200,
      quantity: 10,
      catId: 1,
    },
    {
      id: 2,
      name: 'Mouse',
      imgUrl: 'https://picsum.photos/200?random=2',
      price: 25,
      quantity: 0,
      catId: 1,
    },
    {
      id: 3,
      name: 'T-Shirt',
      imgUrl: 'https://picsum.photos/200?random=3',
      price: 30,
      quantity: 1,
      catId: 2,
    },
    {
      id: 4,
      name: 'Jeans',
      imgUrl: 'https://picsum.photos/200?random=4',
      price: 70,
      quantity: 25,
      catId: 2,
    },
    {
      id: 5,
      name: 'Coffee Mug',
      imgUrl: 'https://picsum.photos/200?random=5',
      price: 12,
      quantity: 0,
      catId: 3,
    },
    {
      id: 6,
      name: 'Notebook',
      imgUrl: 'https://picsum.photos/200?random=6',
      price: 8,
      quantity: 100,
      catId: 3,
    },
  ];

  categories: ICategory[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Stationery' },
  ];

  buy(price: number, quantity: string) {
    this.totalOrderPrice += price * +quantity;
  }
}
