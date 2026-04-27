import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter, Subscription } from 'rxjs';
import { RouterState } from '../../../../core/router/router-state';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../../../services/auth';
import { User } from '../../../../services/user';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
  private authService = inject(Auth);
  private route = inject(Router);
  private userService = inject(User);
  appLogo = "assets/logo.png";
  rotaAtual: string = ''
  inscricaoRota!: Subscription;


  private routerService = inject(RouterState);

  ngOnInit(): void {
    this.inscricaoRota = this.routerService.rotaAtual$.subscribe(url => {
      this.rotaAtual = url;
    });
  }

  ngOnDestroy(): void {
    this.inscricaoRota.unsubscribe();
  }

  isOnRouterRegister(): boolean {
    return this.rotaAtual === '/register'
  }
  isOnRouterLogin(): boolean {
    return this.rotaAtual === '/login'
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login'])
  }

  getInitialUser(): string {
    const user = this.userService.getUser();
    if (user && user.nome) {
      return user.nome.charAt(0).toUpperCase();
    }
    return '?';
  }



  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}
