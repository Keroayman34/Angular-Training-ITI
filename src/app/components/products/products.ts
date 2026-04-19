import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';

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
export class CoursesComponent implements OnInit, OnDestroy {
  totalOrderPrice: number = 0;
  selectedCatId: number = 0;
  date = new Date();

  products: IProduct[] = [];
  categories: ICategory[] = [];
  displayCategories: ICategory[] = [];

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private coursesService: CoursesService,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    const categoriesSub = this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        console.log('Categories loaded in component:', categories);
        this.categories = categories;

        const hasAllCategory: boolean = this.categories.some((cat) => cat.id === 0);
        if (!hasAllCategory) {
          this.categories = [{ id: 0, name: 'All' }, ...this.categories];
        }

        this.displayCategories = this.categories.filter((cat) => cat.id !== 0);
        console.log('Display categories:', this.displayCategories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });

    this.subscriptions.push(categoriesSub);
    this.loadCourses(0);
  }

  getFilteredProducts(): IProduct[] {
    return this.products;
  }

  onCategoryChange(catId: number): void {
    this.selectedCatId = catId;
    this.loadCourses(catId);
  }

  private loadCourses(catId: number): void {
    const courses$ = this.coursesService.getCoursesByCategoryId(catId);
    const coursesSub = courses$.subscribe({
      next: (courses) => {
        console.log('Products loaded in component:', courses);
        this.products = courses;
      },
      error: (err) => {
        console.error('Error loading courses:', err);
        this.products = [];
      },
    });

    this.subscriptions.push(coursesSub);
  }

  buy(price: number, quantity: string): void {
    const qty: number = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return;
    }

    this.totalOrderPrice += price * qty;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
