import { Component, Input, OnInit } from '@angular/core';
import { Loading } from './loading';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-base-loader',
  templateUrl: './base-loader.component.html',
  styleUrls: ['./base-loader.component.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class BaseLoaderComponent implements OnInit {
  @Input() loader = false;

  constructor(private loading: Loading) {}

  ngOnInit(): void {
    this.loading.isLoading.subscribe((value) => {
      this.loader = value;
    });
  }
}
