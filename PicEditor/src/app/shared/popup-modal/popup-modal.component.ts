import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { PopupModalService } from "./popup-modal.service";

@Component({
  selector: "popup-modal",
  templateUrl: "./popup-modal.component.html",
  styleUrls: ["./popup-modal.component.less"],
})
export class PopupModalComponent implements OnInit {
  @Input() id: string;
  private element: any;

  constructor(private modalService: PopupModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error("modal must have an id");
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener("click", (el) => {
      if (el.target.className === "modal") {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    console.log("open seasame", this.element);
    this.element.style.display = "block";
    document.body.classList.add("modal-open");
  }

  // close modal
  close(): void {
    this.element.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}
