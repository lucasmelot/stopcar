"use strict";

/* ALTERE SOMENTE ESTE NÚMERO PARA TROCAR O WHATSAPP.
   Formato: país + DDD + número, sem espaços ou símbolos. */
const WHATSAPP_NUMBER = "5511950230408";

const body = document.body;
const root = document.documentElement;
const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const menuBackdrop = document.querySelector(".menu-backdrop");
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const mobileMenuQuery = window.matchMedia("(max-width: 1080px)");

let menuWasOpenedBy = null;
let lightboxTrigger = null;

function updateMenuPosition() {
  if (!header) return;
  const headerBottom = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
  root.style.setProperty("--menu-top", `${headerBottom}px`);
}

function getMenuFocusableElements() {
  if (!navigation) return [];
  return [...navigation.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
}

function closeMenu({ returnFocus = false } = {}) {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("is-open");
  body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");

  if (menuBackdrop) {
    menuBackdrop.hidden = true;
  }

  if (returnFocus && menuWasOpenedBy instanceof HTMLElement) {
    menuWasOpenedBy.focus();
  }

  menuWasOpenedBy = null;
}

function openMenu() {
  if (!menuButton || !navigation) return;

  updateMenuPosition();
  menuWasOpenedBy = document.activeElement;
  navigation.classList.add("is-open");
  body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fechar menu");

  if (menuBackdrop) {
    menuBackdrop.hidden = false;
  }

  const firstFocusable = getMenuFocusableElements()[0];
  window.requestAnimationFrame(() => firstFocusable?.focus());
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("is-open");
    isOpen ? closeMenu({ returnFocus: true }) : openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  menuBackdrop?.addEventListener("click", () => closeMenu({ returnFocus: true }));

  document.addEventListener("keydown", (event) => {
    if (!navigation.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu({ returnFocus: true });
      return;
    }

    if (event.key !== "Tab" || !mobileMenuQuery.matches) return;

    const focusable = getMenuFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function handleResponsiveMenu(event) {
  if (!event.matches) {
    closeMenu();
  }
  updateMenuPosition();
}

if (typeof mobileMenuQuery.addEventListener === "function") {
  mobileMenuQuery.addEventListener("change", handleResponsiveMenu);
} else {
  mobileMenuQuery.addListener(handleResponsiveMenu);
}

window.addEventListener("resize", updateMenuPosition, { passive: true });
window.addEventListener("load", updateMenuPosition, { once: true });
updateMenuPosition();

/* Sombra no cabeçalho ao rolar */
function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);

  if (navigation?.classList.contains("is-open")) {
    updateMenuPosition();
  }
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* Animações de entrada */
const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -24px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

/* Item ativo no menu */
const sections = [...document.querySelectorAll("main section[id]")];

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

setActiveNav("inicio");

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setActiveNav(visibleEntries[0].target.id);
      }
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.5] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* Abertura segura do WhatsApp */
function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  const link = document.createElement("a");
  link.href = buildWhatsAppUrl(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.append(link);
  link.click();
  link.remove();
}

document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
  link.href = buildWhatsAppUrl(link.dataset.whatsappMessage || "Olá!");
});

/* Botões dos serviços */
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.service || "um serviço automotivo";
    openWhatsApp(`Olá! Gostaria de solicitar um orçamento para: ${service}.`);
  });
});

/* Formatação simples do telefone */
const phoneInput = document.querySelector("#telefone");

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    const numbers = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    let formatted = numbers;

    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    if (numbers.length > 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }

    phoneInput.value = formatted;
  });
}

/* Validação acessível do formulário */
const form = document.querySelector("#budget-form");
const formStatus = document.querySelector("#form-status");

function setFormStatus(message = "", type = "") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", type === "error");
  formStatus.classList.toggle("is-success", type === "success");
}

function setFieldError(field, message) {
  const wrapper = field.closest(".field");
  const error = wrapper?.querySelector(".field__error");
  const hasError = Boolean(message);

  field.classList.toggle("is-invalid", hasError);
  field.setAttribute("aria-invalid", String(hasError));

  if (error) {
    error.textContent = message || "";
  }
}

function validateField(field) {
  const value = field.value.trim();
  let message = "";

  if (field.required && !value) {
    message = "Preencha este campo.";
  } else if (field.id === "nome" && value.length < 2) {
    message = "Digite pelo menos 2 caracteres.";
  } else if (field.id === "telefone") {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) message = "Digite um telefone válido.";
  } else if (field.id === "ano" && value && !/^\d{4}$/.test(value)) {
    message = "Digite o ano com 4 números.";
  } else if (field.id === "problema" && value.length < 8) {
    message = "Descreva um pouco mais o problema.";
  }

  setFieldError(field, message);
  return !message;
}

if (form) {
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const submitButton = form.querySelector('button[type="submit"]');

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));

    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
      setFormStatus();
    });

    field.addEventListener("change", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
      setFormStatus();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const valid = fields.map(validateField).every(Boolean);

    if (!valid) {
      const firstInvalid = form.querySelector(".is-invalid");
      firstInvalid?.focus();

      setFormStatus("Revise os campos indicados.", "error");
      return;
    }

    const data = new FormData(form);
    const message = [
      "Olá! Gostaria de solicitar um orçamento na Stop Car.",
      "",
      `Nome: ${String(data.get("nome")).trim()}`,
      `Telefone: ${String(data.get("telefone")).trim()}`,
      `Veículo: ${String(data.get("modelo")).trim()}`,
      `Ano: ${String(data.get("ano") || "Não informado").trim()}`,
      `Serviço desejado: ${String(data.get("servico")).trim()}`,
      "",
      "Descrição do problema:",
      String(data.get("problema")).trim()
    ].join("\n");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Abrindo WhatsApp...";
    }

    setFormStatus("A mensagem foi preparada. Revise antes de enviar.", "success");

    openWhatsApp(message);

    window.setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Revisar mensagem no WhatsApp";
      }
    }, 1200);
  });
}

/* Ampliação das fotos reais */
const lightbox = document.querySelector("#photo-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = lightbox?.querySelector(".lightbox__close");

function closeLightbox() {
  if (!lightbox?.open) return;
  lightbox.close();
}

document.querySelectorAll("[data-lightbox]").forEach((card) => {
  card.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxTrigger = card;
    lightboxImage.src = card.dataset.full || "";
    lightboxImage.alt = card.dataset.caption || "Foto ampliada da oficina";
    lightboxCaption.textContent = card.dataset.caption || "";

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
      lightboxClose?.focus();
    } else if (card.dataset.full) {
      window.open(card.dataset.full, "_blank", "noopener,noreferrer");
    }
  });
});

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("close", () => {
    if (lightboxImage) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }

    if (lightboxTrigger instanceof HTMLElement) {
      lightboxTrigger.focus();
    }

    lightboxTrigger = null;
  });
}

/* Ano automático */
const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
