import {Injectable} from 'angular2/core';

@Injectable()
export class TimeProvider {
  constructor() {
  }

  now() {
  	return new Date()
  }
}