import { Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { Highlight } from '../../directives/highlight';
import { ShortenPipe } from '../../pipes/shorten-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { DisableAfterClick } from '../../directives/disable-after-click';
import { CoursesService } from '../../services/courses.service';
import { CategoriesService } from '../../services/categories.service';

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
    DisableAfterClick,
    RouterLink,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class CoursesComponent implements OnInit {
  totalOrderPrice: number = 0;
  selectedCatId: number = 0;
  date = new Date();

  products: IProduct[] = [];
  categories: ICategory[] = [];
  displayCategories: ICategory[] = [];

  constructor(
    private coursesService: CoursesService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.categories = this.categoriesService.getAllCategories();
    this.products = this.coursesService.getAllCourses();

    const hasAllCategory: boolean = this.categories.some((cat) => cat.id === 0);
    if (!hasAllCategory) {
      this.categories = [{ id: 0, name: 'All' }, ...this.categories];
    }

    this.displayCategories = this.categories.filter((cat) => cat.id !== 0);
  }

  getFilteredProducts(): IProduct[] {
    if (this.selectedCatId === 0) {
      return this.products;
    }

    return this.products.filter((course: IProduct) => course.catId === this.selectedCatId);
  }

  buy(price: number, quantity: string): void {
    const qty: number = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return;
    }

    this.totalOrderPrice += price * qty;
  }
}
