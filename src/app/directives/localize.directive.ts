import {Directive, ElementRef, Input} from 'angular2/core'
import {Utils} from '../common/utils'

@Directive({
  selector: '[loc]',
  inputs: ['key : loc']
})
export class LocalizeDirective {
    constructor(private element: ElementRef) {
    }
    
    set key(key: string) {
    	this.element.nativeElement.textContent = Utils.getLocalizedStringForKey(key)
    }
}
