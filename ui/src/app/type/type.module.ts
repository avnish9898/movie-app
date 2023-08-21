import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { TypeComponent } from './type.component';
const routes: Routes = [{ path: ':id', component: TypeComponent }];
@NgModule({
  declarations: [TypeComponent],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
})
export class TypeModule {}
