import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'shorten'})
export class ShortenPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (value.length > args) {
            return value.substr(0, args).concat("...");
        }
        return value;
    }
}