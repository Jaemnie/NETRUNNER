gsap.to("div", {
    rotateX: 180,
    rotateY: -180,
    borderColor: "#f87171",
    ease: "sine.inOut",
    duration: 1,
    stagger: { each: 0.03, from: "end", repeat: -1, yoyo: true }
  });
  