import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly courses: IProduct[] = [
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

  getAllCourses(): IProduct[] {
    return [...this.courses];
  }

  getCoursesByCatID(catID: number): IProduct[] {
    if (catID === 0) {
      return this.getAllCourses();
    }

    return this.courses.filter((course: IProduct) => course.catId === catID);
  }

  getCourseByID(courseID: number): IProduct | undefined {
    return this.courses.find((course: IProduct) => course.id === courseID);
  }
}
