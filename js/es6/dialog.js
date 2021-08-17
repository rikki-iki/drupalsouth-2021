import { tabbable } from 'tabbable';

export default class Dialog {
  constructor(obj, context) {
    this.triggerElement = obj;
    this.preventScrollClass = 'dialog-open';
    this.context = context || document;
    this.dialog = this.findDialogElement();
    this.init = this.init.bind(this);
  }

  init() {
    if (!this.dialog || this.dialog.localName !== 'dialog') {
      return;
    }
    this.tabbable = tabbable(this.dialog);

    if (typeof this.dialog.showModal !== 'function') {
      // import('dialog-polyfill').then(dialogPolyfill => {
      //   dialogPolyfill.registerDialog(this.dialog);
      //   this.dialog.classList.add('dialog--polyfilled');
      // });
    }

    this.toggle();
    this.attachEvents();
  }

  findDialogElement() {
    this.id = this.triggerElement.getAttribute('aria-controls');
    if (!this.id) {
      return;
    }
    return this.context.querySelector(`#${this.id}`);
  }

  toggle() {
    if (this.dialog.hasAttribute('open')) {
      this.triggerElement.setAttribute('aria-expanded', 'true');
      this.dialog.setAttribute('aria-hidden', 'false');
      document.body.classList.add(this.preventScrollClass);
    }
    else {
      this.triggerElement.setAttribute('aria-expanded', 'false');
      this.dialog.setAttribute('aria-hidden', 'true');
      document.body.classList.remove(this.preventScrollClass);
    }
  }

  attachEvents() {
    // Open on trigger click.
    this.triggerElement.addEventListener('click', e => this.showDialog(e));
    this.triggerElement.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === 'Space') {
        this.showDialog(e);
      }
    });

    // Close on close button click.
    this.closeBtns = this.dialog.querySelectorAll('[data-dialog-close]');
    this.closeBtns.forEach(closeBtn => {
      closeBtn.addEventListener('click', () => this.dialog.close());
      closeBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === 'Space') {
          this.dialog.close();
        }
      });
    });

    // Extra things to happen on open/close.
    this.dialog.addEventListener('close', () => this.closeDialog());
  }

  showDialog(event) {
    this.dialog.showModal();
    this.toggle();

    if (this.tabbable.length) {
      // Move focus to inside dialog.
      const movedFocus = this.dialog.querySelector('[autofocus]') || this.tabbable.shift();
      movedFocus.focus({ preventScroll: true });
    }
    if (event && event.cancelable) {
      event.preventDefault();
    }
  }

  closeDialog() {
    this.toggle();
    // Return focus to the trigger.
    if (this.triggerElement && this.triggerElement.focus) {
      this.triggerElement.focus({ preventScroll: true });
    }
  }
}
