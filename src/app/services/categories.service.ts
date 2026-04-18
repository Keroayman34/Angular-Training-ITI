import { Injectable } from '@angular/core';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly categories: ICategory[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Computer Science' },
  ];

  getAllCategories(): ICategory[] {
    return [...this.categories];
  }
}
