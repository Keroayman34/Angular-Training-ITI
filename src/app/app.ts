import { Component, signal } from '@angular/core';
import { Products } from "./components/products/products";

@Component({
  selector: 'app-root',
  imports: [ Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Products-App');
}
