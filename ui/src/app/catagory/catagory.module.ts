import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { CatagoryComponent } from './catagory.component';

const route: Routes = [{ path: '', component: CatagoryComponent }];
@NgModule({
  declarations: [CatagoryComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(route)],
})
export class CatagoryModule {}
