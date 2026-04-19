import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { ICategory } from '../models/icategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly baseUrl = environment.apiUrl;

  private readonly fallbackCategories: ICategory[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Computer Science' },
  ];

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    console.log('Fetching categories from:', `${this.baseUrl}/categories`);
    return this.http.get<ICategory[]>(`${this.baseUrl}/categories`).pipe(
      map((categories) => {
        console.log('Categories received:', categories);
        return categories.map((cat) => ({
          ...cat,
          id: Number(cat.id),
        }));
      }),
      catchError((err) => {
        console.warn('Failed to fetch categories, using fallback data:', err);
        return of(this.fallbackCategories);
      }),
    );
  }
}
