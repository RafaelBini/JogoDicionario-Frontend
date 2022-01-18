import { UserResolver } from './resolvers/user.resolver';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPageComponent } from './pages/room-page/room-page.component';

const routes: Routes = [
  { component: HomePageComponent, path: '', resolve: { ok: UserResolver } },
  { component: RoomPageComponent, path: ':roomId', resolve: { ok: UserResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
