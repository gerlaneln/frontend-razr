import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOuside]'
})
export class ClickOusideDirective {

  constructor(private e: ElementRef) { }

  @Output() public clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any){
    const clickedInside = this.e.nativeElement.contains(target);
    if (!clickedInside){
      this.clickedOutside.emit(target)
      // console.log('click fora')
    }
  }

}
