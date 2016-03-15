import {Component} from 'angular2/core'
import {LocalizeDirective} from '../../directives/localize.directive'

@Component({
  selector: 'home',
  providers: [],
  directives: [LocalizeDirective],
  styles: [ require('./home.component.scss') ],
  template: require('./home.component.jade'),
})
export class Home {
  constructor() {
  }
}
