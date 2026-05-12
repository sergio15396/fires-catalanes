import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './view/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Component principal de l'aplicació que conté header i el router outlet.
}
