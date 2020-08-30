import { element } from "protractor";
import { Rectangle } from "./../shapes/rectangle/rectangle.model";
import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { switchMap, takeUntil, pairwise } from "rxjs/operators";
import { PopupModalService } from "../shared/popup-modal/popup-modal.service";

@Component({
  selector: "app-canvas",
  templateUrl: "canvas.component.html",
  styleUrls: ["./canvas.component.less"],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild("canvas") public canvas: ElementRef;

  width = 600;
  height = 400;
  mousePosX = 0;
  mousePosY = 0;
  bodyText: string;
  canvasEl: HTMLCanvasElement;

  private cx: CanvasRenderingContext2D;
  private pencilEvent$: Subscription;
  subscription: Subscription;

  constructor(private modalService: PopupModalService) {}

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    this.cx = this.canvasEl.getContext("2d");
    this.cx.lineWidth = 3;
    this.cx.lineCap = "round";
    this.cx.strokeStyle = "#000";

    this.initializePreDrawnObjects();
    this.subscription = fromEvent(document, "mousemove").subscribe(
      (e: MouseEvent) => {
        const rect = this.canvasEl.getBoundingClientRect();
        this.mousePosX = e.clientX - rect.left;
        this.mousePosY = e.clientY - rect.top;
        console.log(`${this.mousePosX}, ${this.mousePosY}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.pencilEvent$.unsubscribe();
    this.subscription.unsubscribe();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  formatLabel(value: number) {
    return value;
  }

  usePencil() {
    console.log("event", this);
    this.captureRawPencilEvents(this.canvasEl);
    this.canvas.nativeElement.classList.add("pencil");
  }

  reset() {
    this.height = 400;
    this.width = 600;
    this.cx.lineWidth = 10;
    this.cx.clearRect(0, 0, this.width, this.height);
    const rectangle = new Rectangle(this.cx);
    rectangle.draw(160, 17, 24, 35);
    this.pencilEvent$.unsubscribe();
  }

  initializePreDrawnObjects() {
    this.cx.fillStyle = "red";
    const rectangle = new Rectangle(this.cx);
    rectangle.draw(5, 16, 20, 30);
  }

  private captureRawPencilEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    this.pencilEvent$ = fromEvent(canvasEl, "mousedown")
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, "mousemove").pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, "mouseup")),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, "mouseleave")),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top,
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top,
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }
}
