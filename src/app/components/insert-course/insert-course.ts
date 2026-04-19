import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from '../../models/icategory';
import { IProduct } from '../../models/iproduct';
import { CategoriesService } from '../../services/categories.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-insert-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './insert-course.html',
  styleUrl: './insert-course.css',
})
export class InsertCourseComponent implements OnInit, OnDestroy {
  categories: ICategory[] = [];

  newCourse: {
    title: string;
    price: number;
    imgUrl: string;
    catId: number;
  } = {
    title: '',
    price: 0,
    imgUrl: '',
    catId: 0,
  };

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const categoriesSub = this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        console.log('Insert form - Categories response:', categories);
        this.categories = categories.filter((cat) => cat.id !== 0);
        if (this.categories.length > 0 && this.newCourse.catId === 0) {
          this.newCourse.catId = this.categories[0].id;
        }
        console.log('Form categories after filter:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories in insert form:', err);
      },
    });

    this.subscriptions.push(categoriesSub);
  }

  addCourse(): void {
    if (this.isFormInvalid()) {
      console.warn('Form is invalid, not submitting');
      return;
    }

    console.log('Submitting form data:', this.newCourse);

    const createSub = this.coursesService.addCourse(this.newCourse).subscribe({
      next: (response) => {
        console.log('Course created successfully:', response);
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Error creating course:', err);
      },
    });

    this.subscriptions.push(createSub);
  }

  private isFormInvalid(): boolean {
    return (
      !this.newCourse.title.trim() ||
      !this.newCourse.imgUrl.trim() ||
      Number.isNaN(Number(this.newCourse.price)) ||
      Number(this.newCourse.price) <= 0 ||
      Number(this.newCourse.catId) === 0
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
