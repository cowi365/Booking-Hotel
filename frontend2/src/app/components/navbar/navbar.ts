// =============================================
// COMPONENTE NAVBAR
// Barra di navigazione presente in tutte
// le pagine. Standalone = non serve NgModule.
// =============================================

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {}
