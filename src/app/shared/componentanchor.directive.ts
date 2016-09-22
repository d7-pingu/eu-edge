import { Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Directive({
  selector: '[componentAnchor]'
})
export class ComponentAnchorDirective {

  modalComponentRef: ComponentRef<any>;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver    
  ) { }

  showComponent(modalComponent): ComponentRef<any> {
    this.viewContainer.clear();

    let modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(modalComponent);
    this.modalComponentRef = this.viewContainer.createComponent(modalComponentFactory);

    this.modalComponentRef.instance.destroy.subscribe(() => {
      this.modalComponentRef.destroy();
    });

    return this.modalComponentRef;
  }  

}
