import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProductsComponent implements OnInit {

  product: FormGroup;
  posts: any[] = [];

  constructor(private apiService: ApiService, fb: FormBuilder) {

    this.product = fb.group({
      id: ['', Validators.required],  
      name: ['', Validators.required], 
      price: ['', [Validators.required]],
      category: ['', Validators.required]
    
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  insertItems() {
    this.apiService.create(this.product.value).subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  loadItems() {
    this.apiService.get().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}


