import Lenis from "lenis";

// Script to handle Lenis library settings for smooth scrolling
const lenis = new Lenis();

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export default lenis;