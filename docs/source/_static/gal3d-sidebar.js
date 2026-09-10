/**
 * Sidebar toggles for narrow viewports.
 *
 * sphinx-book-theme hides both sidebars on narrow viewports and re-opens them
 * by cutting the sidebar content out of the sidebar and pasting it into a
 * <dialog>, then calling HTMLDialogElement.showModal(). That has two problems:
 *
 *   1. Browsers without <dialog> support (older iOS Safari, older WebViews)
 *      never get a sidebar, and because the content has already been moved,
 *      every later click fails the same way.
 *   2. The button can only open the sidebar, never close it again.
 *
 * The theme's stylesheet already turns `#pst-primary-sidebar[open]` and
 * `#pst-secondary-sidebar[open]` into slide-in drawers, so this script drives
 * that mechanism directly: no <dialog>, no node shuffling, and the button
 * toggles the sidebar it belongs to.
 *
 * On wide viewports the sidebars are part of the page flow, so the button
 * keeps the theme's collapse/expand behaviour.
 */
(function () {
  "use strict";

  var HIDDEN_CLASS = "pst-sidebar-hidden";
  var BACKDROP_CLASS = "gal3d-sidebar-backdrop";
  var BODY_CLASS = "gal3d-sidebar-open";
  var FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  // Each header button belongs to one sidebar.
  var PANELS = [
    { toggleSelector: ".primary-toggle", sidebarId: "pst-primary-sidebar" },
    { toggleSelector: ".secondary-toggle", sidebarId: "pst-secondary-sidebar" },
  ];

  /**
   * Narrow viewports keep the sidebar off-canvas at a fixed position, which is
   * exactly the case the theme's `[open]` drawer rules exist for. Asking the
   * layout instead of a breakpoint keeps this in step with the stylesheet.
   */
  function isDrawer(sidebar) {
    return !!sidebar && window.getComputedStyle(sidebar).position === "fixed";
  }

  function panelFor(toggle) {
    for (var i = 0; i < PANELS.length; i += 1) {
      if (toggle.matches(PANELS[i].toggleSelector)) {
        var sidebar = document.getElementById(PANELS[i].sidebarId);
        if (sidebar) {
          return { toggle: toggle, sidebar: sidebar };
        }
      }
    }
    return null;
  }

  function backdrop() {
    var element = document.querySelector("." + BACKDROP_CLASS);
    if (!element) {
      element = document.createElement("div");
      element.className = BACKDROP_CLASS;
      element.setAttribute("aria-hidden", "true");
      element.addEventListener("click", closeDrawers);
    }
    return element;
  }

  function openDrawer(panel) {
    closeDrawers();
    var sidebar = panel.sidebar;
    sidebar.setAttribute("open", "");
    sidebar.setAttribute("role", "dialog");
    sidebar.setAttribute("aria-modal", "true");
    sidebar.setAttribute("tabindex", "-1");
    panel.toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add(BODY_CLASS);
    var element = backdrop();
    if (!element.parentNode) {
      document.body.appendChild(element);
    }
    try {
      sidebar.focus({ preventScroll: true });
    } catch (error) {
      sidebar.focus();
    }
  }

  function closeDrawers(restoreFocus) {
    var openDrawers = document.querySelectorAll(
      "#pst-primary-sidebar[open], #pst-secondary-sidebar[open]",
    );
    for (var i = 0; i < openDrawers.length; i += 1) {
      openDrawers[i].removeAttribute("open");
      openDrawers[i].removeAttribute("role");
      openDrawers[i].removeAttribute("aria-modal");
      openDrawers[i].removeAttribute("tabindex");
      var toggle = document.querySelector(
        openDrawers[i].id === "pst-secondary-sidebar"
          ? ".secondary-toggle"
          : ".primary-toggle",
      );
      if (toggle) {
        toggle.removeAttribute("aria-expanded");
        if (restoreFocus) {
          toggle.focus({ preventScroll: true });
        }
      }
    }
    document.body.classList.remove(BODY_CLASS);
    var element = document.querySelector("." + BACKDROP_CLASS);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  function onClick(event) {
    if (event.defaultPrevented) {
      return;
    }
    var target = event.target;
    var toggle =
      target && target.closest
        ? target.closest(".primary-toggle, .secondary-toggle")
        : null;
    if (!toggle) {
      return;
    }
    var panel = panelFor(toggle);
    if (!panel) {
      return;
    }

    // The theme also listens for these clicks. Handling them here keeps the
    // two implementations from fighting over the same sidebar.
    event.preventDefault();
    event.stopPropagation();

    if (!isDrawer(panel.sidebar)) {
      panel.sidebar.classList.toggle(HIDDEN_CLASS);
      toggle.blur();
      return;
    }

    if (panel.sidebar.hasAttribute("open")) {
      closeDrawers(true);
      return;
    }
    openDrawer(panel);
    toggle.blur();
  }

  function onKeydown(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeDrawers(true);
    }
  }

  function onResize() {
    var openDrawers = document.querySelectorAll(
      "#pst-primary-sidebar[open], #pst-secondary-sidebar[open]",
    );
    for (var i = 0; i < openDrawers.length; i += 1) {
      if (!isDrawer(openDrawers[i])) {
        closeDrawers();
        break;
      }
    }
  }

  document.addEventListener("click", onClick, true);
  document.addEventListener("keydown", onKeydown, true);
  window.addEventListener("resize", onResize);

  // Keep the focus trap usable: when the drawer is open, Tab cycles inside it.
  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key !== "Tab") {
        return;
      }
      var sidebar = document.querySelector(
        "#pst-primary-sidebar[open], #pst-secondary-sidebar[open]",
      );
      if (!sidebar) {
        return;
      }
      var focusable = sidebar.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) {
        return;
      }
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    },
    true,
  );
})();
