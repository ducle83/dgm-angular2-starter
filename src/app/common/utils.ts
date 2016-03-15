import {Lang} from './lang'

export class Utils {
  static getLocalizedStringForKey(key: string): string {
  	let text = Lang[key]
  	if (text === undefined || text === null || text.length === 0)
      return key
    return text
  }
}