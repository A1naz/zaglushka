document.addEventListener("DOMContentLoaded", function () {
  const firstAccordionButton = document.querySelector(".accordion-btn");
  const firstAccordionPanel = firstAccordionButton.nextElementSibling;

  firstAccordionButton.setAttribute("aria-expanded", "true");
  firstAccordionPanel.style.maxHeight = firstAccordionPanel.scrollHeight + "px";

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const button = item.querySelector(".accordion-btn");
    const panel = item.querySelector(".accordion-panel");

    button.addEventListener("click", function () {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      accordionItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".accordion-btn");
        const otherPanel = otherItem.querySelector(".accordion-panel");
        otherButton.setAttribute("aria-expanded", "false");
        otherPanel.style.maxHeight = null;
      });

      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + 16 + "px";
      }
    });
  });
});

const content = document.querySelector(".marketplaces-mobile-nav");
const mobileNav = document.querySelector(".mobile-nav");
const arrowMenuImg = document.querySelector(".arrowMenuImg");

document
  .querySelector(".mobileCollapse-header")
  .addEventListener("click", function () {
    if (mobileNav.style.maxHeight === "100%") {
      content.classList.remove("visible");
      arrowMenuImg.src = "./img/icons/arrowDown.svg";
      mobileNav.scrollTo({
        top: 0,
        behavior: "smooth", // для плавной прокрутки
      });
      mobileNav.style.overflow = "hidden";
      mobileNav.style.maxHeight = "370px";
    } else {
      arrowMenuImg.src = "./img/icons/arrowUp.svg";
      content.classList.add("visible");
      mobileNav.style.maxHeight = "100%";
      mobileNav.style.overflow = "auto";
    }
  });
