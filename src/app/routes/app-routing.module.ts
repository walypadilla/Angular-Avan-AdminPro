import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRouterModule } from '../pages/pages.routing';
import { AuthRoutingModule } from '../auth/auth.routing';

import { NopagefoundComponent } from '../nopagefound/nopagefound.component';

const routes: Routes = [
  // ======================================
  // Routes
  // path: '/dashboard' PagesRouterModule
  // path: '/auth' AuthRouterModule
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), PagesRouterModule, AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
