import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true, // ✅ Ensure standalone mode
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule] // ✅ Add RouterModule for navigation
})
export class NavbarComponent { }

