import {Component} from 'angular2/core'
import {TimeProvider} from '../../providers/time.provider'

@Component({
  selector: 'time',
  providers: [TimeProvider],
  directives: [],
  styles: [ require('./time.component.scss') ],
  template: require('./time.component.jade'),
})
export class Time {
  constructor(public timeProvider: TimeProvider) {
  }
}
