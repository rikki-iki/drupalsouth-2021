import Dialog from "./dialog";
import Accordion from "./accordion";

document.querySelectorAll('[data-dialog-toggle]').forEach(obj => {
  const dialog = new Dialog(obj);
  dialog.init();
});


document.querySelectorAll('[data-accordion-toggle]').forEach(obj => {
  const accordion = new Accordion(obj);
  //accordion.init();
});
