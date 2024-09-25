
import { Injectable } from '@angular/core';

//cdk
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

//rxjs
import { Subject } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import { LoaderComponent } from '../shared/shared-component/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private spinnerTopRef = this.cdkSpinnerCreate();

  spin$: Subject<boolean> = new Subject()

  constructor(
    private overlay: Overlay,
  ) {

    this.spin$
      .asObservable()
      .pipe(
        map((val) => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe((res) => {
        if (res === 1) {
          this.showSpinner();
        } else if (res == 0) {
          this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
        }
      });
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    })
  }

  private showSpinner() {
    console.log("attach")
    this.spinnerTopRef.attach(new ComponentPortal(LoaderComponent))
  }

  private stopSpinner() {
    console.log("dispose")
    this.spinnerTopRef.detach();
  }

  public startLoader() {
    this.spin$.next(true);
  }

  public stopLoader() {
    this.spin$.next(false);
  }
}
