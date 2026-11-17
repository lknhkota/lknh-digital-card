(() => {
    "use strict";

    /* ---------- Scroll-reveal ---------- */
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    /* ---------- App deep-links with web fallback ---------- */
    /* Tries the native app scheme (e.g. instagram://); if the app
       isn't installed the page stays visible and we open the web URL. */
    document.querySelectorAll("a[data-web]").forEach((link) => {
        link.addEventListener("click", (e) => {
            if (!/android|iphone|ipad|ipod/i.test(navigator.userAgent)) return;

            e.preventDefault();
            const webUrl = link.getAttribute("data-web");
            let appOpened = true;

            const fallback = setTimeout(() => {
                if (appOpened) window.open(webUrl, "_blank", "noopener");
            }, 1200);

            document.addEventListener("visibilitychange", function onHide() {
                if (document.hidden) {
                    appOpened = false;
                    clearTimeout(fallback);
                    document.removeEventListener("visibilitychange", onHide);
                }
            });

            window.location.href = link.getAttribute("href");
        });
    });
})();
