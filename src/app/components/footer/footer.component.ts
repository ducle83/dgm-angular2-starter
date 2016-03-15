import {Component} from 'angular2/core'
import {LocalizePipe} from '../../pipes/localize.pipe'

@Component({
  selector: 'footer',
  providers: [],
  directives: [],
  pipes: [LocalizePipe],
  styles: [ require('./footer.component.scss') ],
  template: require('./footer.component.jade'),
})
export class Footer {
  constructor() {
  }
}
