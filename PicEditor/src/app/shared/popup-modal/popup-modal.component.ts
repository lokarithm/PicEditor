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

  constructor(
    private modalService: PopupModalService,
    private elRef: ElementRef
  ) {
    this.element = elRef.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error("Modal id is required");
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener("click", (el) => {
      if (el.target.className !== "modal") {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = "block";
    document.body.classList.add("modal-open");
    document.body.classList.add("active");
  }

  close(): void {
    this.element.style.display = "none";
    document.body.classList.remove("modal-open");
    document.body.classList.remove("active");
  }
}
