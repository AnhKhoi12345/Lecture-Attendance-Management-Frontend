import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent {
  @Input() show = false;
  @Input() customClass = '';
  @Output() closeCallback = () => (false);

  constructor() { }

  ngOnInit() {
  }
}
