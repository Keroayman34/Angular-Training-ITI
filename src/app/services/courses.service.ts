import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly baseUrl = environment.apiUrl;

  private readonly fallbackCourses: IProduct[] = [
    {
      id: 1,
      name: 'Angular Fundamentals',
      instructor: 'Ahmed Hassan',
      imgUrl:
        'https://fastly.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
      price: 1200,
      seats: 24,
      quantity: 10,
      catId: 1,
    },
    {
      id: 2,
      name: 'TypeScript Essentials',
      instructor: 'Mona Samir',
      imgUrl: 'https://picsum.photos/200?random=2',
      price: 250,
      seats: 20,
      quantity: 0,
      catId: 1,
    },
    {
      id: 3,
      name: 'UI/UX Design Basics',
      instructor: 'Youssef Adel',
      imgUrl: 'https://picsum.photos/200?random=3',
      price: 300,
      seats: 15,
      quantity: 1,
      catId: 2,
    },
    {
      id: 4,
      name: 'Advanced CSS Architecture',
      instructor: 'Nour ElDin',
      imgUrl: 'https://picsum.photos/200?random=4',
      price: 700,
      seats: 30,
      quantity: 25,
      catId: 2,
    },
    {
      id: 5,
      name: 'Problem Solving in JS',
      instructor: 'Salma Tarek',
      imgUrl: 'https://picsum.photos/200?random=5',
      price: 120,
      seats: 18,
      quantity: 0,
      catId: 3,
    },
    {
      id: 6,
      name: 'Algorithms with TypeScript',
      instructor: 'Karim Nabil',
      imgUrl: 'https://picsum.photos/200?random=6',
      price: 80,
      seats: 40,
      quantity: 100,
      catId: 3,
    },
  ];

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<IProduct[]> {
    console.log('Fetching all courses from:', `${this.baseUrl}/courses`);
    return this.http.get<IProduct[]>(`${this.baseUrl}/courses`).pipe(
      map((courses) => {
        console.log('Courses received:', courses);
        return courses.map((course) => this.normalizeCourse(course));
      }),
      catchError((err) => {
        console.warn('Failed to fetch courses, using fallback data:', err);
        return of(this.fallbackCourses.map((course) => this.normalizeCourse(course)));
      }),
    );
  }

  getCoursesByCategoryId(catId: number): Observable<IProduct[]> {
    if (catId === 0) {
      return this.getAllCourses();
    }

    console.log('Fetching courses for category:', catId);
    const params = new HttpParams().set('catId', String(catId));
    return this.http.get<IProduct[]>(`${this.baseUrl}/courses`, { params }).pipe(
      map((courses) => {
        console.log('Filtered courses received:', courses);
        return courses.map((course) => this.normalizeCourse(course));
      }),
      catchError((err) => {
        console.warn('Failed to fetch filtered courses, using fallback data:', err);
        const filtered = this.fallbackCourses.filter((course) => course.catId === catId);
        return of(filtered.map((course) => this.normalizeCourse(course)));
      }),
    );
  }

  getCourseById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/courses/${id}`).pipe(
      map((course) => this.normalizeCourse(course)),
      catchError((err) => {
        console.warn('Failed to fetch course, using fallback data:', err);
        const fallback = this.fallbackCourses.find((course) => course.id === id);
        if (fallback) {
          return of(this.normalizeCourse(fallback));
        }
        throw err;
      }),
    );
  }

  addCourse(
    course: Omit<IProduct, 'id'> | { title: string; price: number; imgUrl: string; catId: number },
  ): Observable<IProduct> {
    const payload: Omit<IProduct, 'id'> = {
      name: 'name' in course ? course.name : course.title,
      instructor: 'instructor' in course ? course.instructor : 'Staff',
      price: Number(course.price),
      seats: 'seats' in course ? Number(course.seats) : 0,
      quantity: 'quantity' in course ? Number(course.quantity) : 0,
      imgUrl: course.imgUrl,
      catId: Number(course.catId),
    };

    return this.http.post<IProduct>(`${this.baseUrl}/courses`, payload).pipe(
      map((created) => this.normalizeCourse(created)),
      catchError((err) => {
        console.warn('Failed to add course to API, using local ID:', err);
        const newCourse: IProduct = {
          id: Math.max(...this.fallbackCourses.map((c) => c.id)) + 1,
          ...payload,
        };
        this.fallbackCourses.push(newCourse);
        return of(newCourse);
      }),
    );
  }

  private normalizeCourse(course: IProduct): IProduct {
    return {
      ...course,
      id: Number(course.id),
      price: Number(course.price),
      seats: Number(course.seats),
      quantity: Number(course.quantity),
      catId: Number(course.catId),
    };
  }
}
