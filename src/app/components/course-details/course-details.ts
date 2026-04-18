import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../models/iproduct';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetailsComponent implements OnInit {
  course: IProduct | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam: string | null = params.get('id');
      const courseId: number = Number(idParam);

      if (!idParam || Number.isNaN(courseId)) {
        this.course = undefined;
        return;
      }

      this.course = this.coursesService.getCourseByID(courseId);
    });
  }
}
