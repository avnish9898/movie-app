import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
const route: Routes = [{ path: '', component: ProfileComponent }];
@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(route), FormsModule],
})
export class ProfileModule {}
