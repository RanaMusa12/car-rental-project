import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { CarList } from "./car/car-list/car-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CarList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('car-rental');
}
