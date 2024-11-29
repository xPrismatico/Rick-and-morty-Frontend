import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'character-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() species: string = '';
  @Input() status: string = '';
  @Input() location: string = '';

}
