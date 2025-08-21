import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ImageService } from "./services/image.service";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavigationComponent],
    providers: [ImageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  title = 'az-photography';
}
