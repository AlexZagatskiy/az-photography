import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ImageService } from "./services/image.service";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
    providers: [ImageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  title = 'az-photography';
}
