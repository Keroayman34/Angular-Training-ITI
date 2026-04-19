import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { CoursesComponent } from './components/products/products';
import { CourseDetailsComponent } from './components/course-details/course-details';
import { NotFoundComponent } from './components/not-found/not-found';
import { InsertCourseComponent } from './components/insert-course/insert-course';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'insertcourse', component: InsertCourseComponent },
  { path: 'course/:id', component: CourseDetailsComponent },
  { path: '**', component: NotFoundComponent },
];
