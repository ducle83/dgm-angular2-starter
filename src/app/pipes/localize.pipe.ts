import {Component, View, Pipe, PipeTransform} from 'angular2/core';
import {Utils} from '../common/utils'

@Pipe({
	name: 'loc'
})
export class LocalizePipe implements PipeTransform {
	transform(key: string, args: string[]) {
    return Utils.getLocalizedStringForKey(key)
	}
}
