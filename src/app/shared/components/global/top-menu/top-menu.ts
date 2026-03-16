import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter, Subscription } from 'rxjs';
import { RouterState } from '../../../../core/router/router-state';

@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
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
}
