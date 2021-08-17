import { tabbable } from 'tabbable';

export default class Accordion {
  constructor(obj, context) {
    this.triggerElement = obj;
    this.context = context || document;
    this.accordion = obj.parentNode;
    this.init = this.init.bind(this);
  }

  init() {
    if (!this.accordion || this.accordion.localName !== 'details') {
      return;
    }
    this.id = this.accordion.id;
    this.content = this.accordion.querySelector('.accordion__content');
    this.tabbable = tabbable(this.content);

    this.toggle();
    this.attachEvents();
  }

  attachEvents() {
    this.triggerElement.addEventListener('click', e => {
      this.toggle();
      if (e && e.cancelable) {
        e.preventDefault();
      }
    });

    this.triggerElement.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === 'Space') {
        this.toggle();
      }
    });
    if (window.location.hash) {
      if (window.location.hash === `#${this.id}`) {
        this.toggle();
      }
    }
  }

  toggle() {
    if (this.accordion.hasAttribute('open')) {
      this.accordion.removeAttribute('open');
      this.triggerElement.setAttribute('aria-expanded', 'false');
    }
    else {
      this.accordion.setAttribute('open', '');
      this.triggerElement.setAttribute('aria-expanded', 'true');
    }
  }
}
