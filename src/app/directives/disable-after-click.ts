import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisableAfterClick]',
})
export class DisableAfterClick {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('click')
  onClick() {
    // Disable button
    this.renderer.setProperty(this.el.nativeElement, 'disabled', true);

    // Save original text
    const originalText = this.el.nativeElement.innerText;

    // Change text
    this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Processing...');

    // Re-enable after 3 seconds
    setTimeout(() => {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', false);
      this.renderer.setProperty(this.el.nativeElement, 'innerText', originalText);
    }, 3000);
  }
}
