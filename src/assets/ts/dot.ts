document.addEventListener("astro:page-load", function () {
  const cursorDot = document.querySelector(".cursor-dot") as HTMLElement;
  const cursorOutline = document.querySelector(".cursor-outline");

  function changeCursorColorOnHover(event) {
    const isLink = event.target.tagName.toLowerCase() === "a";
    const isImg = event.target.tagName.toLowerCase() === "img";

    if (isLink || isImg) {
      cursorDot.style.background = "#00EBA6";
      cursorOutline.style.borderColor = "#00EBA6";
      cursorOutline.style.background = "rgba(0, 235, 166, 0.50)";
    } else {
      cursorDot.style.background = "#fff";
      cursorOutline.style.borderColor = "hsl(0, 0%, 100%, 0.5)";
      cursorOutline.style.background = "rgba(0, 235, 166, 0.00)";
    }
  }

  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      {
        duration: 500,
        easing: "ease-out",
        fill: "forwards",
      }
    );
  });

  document.addEventListener("mouseover", changeCursorColorOnHover);
  document.addEventListener("mouseout", () => {
    cursorDot.style.background = "#fff";
    cursorOutline.style.borderColor = "hsl(0, 0%, 100%, 0.5)";
  });
});
