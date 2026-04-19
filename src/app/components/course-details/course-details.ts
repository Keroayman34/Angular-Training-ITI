import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { CoursesService } from '../../services/courses.service';
import { Subscription, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course: IProduct | undefined;
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    const routeSub = this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const idParam: string | null = params.get('id');
          const courseId: number = Number(idParam);

          if (!idParam || Number.isNaN(courseId)) {
            return of(undefined);
          }

          return this.coursesService.getCourseById(courseId);
        }),
      )
      .subscribe({
        next: (course) => {
          this.course = course;
        },
      });

    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
