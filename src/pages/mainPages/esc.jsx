import React, { useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import styles from './esc.module.css';

function Modal({ show, onClose }) {
  useEffect(() => {
    if (!show) return;

    const slideToggle = document.getElementById("slide-toggle-control");
    const randomSlideToggle = document.getElementById("random-slide-toggle-control");
    const delayedSlideToggle = document.getElementById("delayed-offset-slide-toggle-control");

    if (!slideToggle || !randomSlideToggle || !delayedSlideToggle) return;

    const slide = {
      element: slideToggle,
      handler: svgSlideEffect,
      offset: 10,
      duration: 200,
      random: false,
    };

    const randomSlide = {
      element: randomSlideToggle,
      handler: svgSlideEffect,
      offset: 8,
      duration: 150,
      random: true,
    };

    const delayedOffsetSlide = {
      element: delayedSlideToggle,
      handler: svgSlideEffect,
      offset: 50,
      duration: 50,
      random: false,
    };

    new SvgToggleEffect(slide);
    new SvgToggleEffect(randomSlide);
    new SvgToggleEffect(delayedOffsetSlide);

    return () => {
      slideToggle.removeEventListener("change", () => {});
      randomSlideToggle.removeEventListener("change", () => {});
      delayedSlideToggle.removeEventListener("change", () => {});
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Modal Title</h2>
        <p>This is a modal dialog.</p>
        <div className={styles.inputContainer}>
          <input type="checkbox" id="slide-toggle-control" />
          <label htmlFor="slide-toggle-control" className={styles.controlLabel}>
            <svg width="84" height="36">
              <rect x="0" y="0" width="84" height="36" />
            </svg>
          </label>
        </div>
        <div className={styles.inputContainer}>
          <input type="checkbox" id="random-slide-toggle-control" />
          <label htmlFor="random-slide-toggle-control" className={styles.controlLabel}>
            <svg width="84" height="36">
              <rect x="0" y="0" width="84" height="36" />
            </svg>
          </label>
        </div>
        <div className={styles.inputContainer}>
          <input type="checkbox" id="delayed-offset-slide-toggle-control" />
          <label htmlFor="delayed-offset-slide-toggle-control" className={styles.controlLabel}>
            <svg width="84" height="36">
              <rect x="0" y="0" width="84" height="36" />
            </svg>
          </label>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

class SvgToggleEffect {
  constructor(effect) {
    this.node = SVG(effect.element.nextElementSibling.querySelector('svg'));

    effect.element.addEventListener("change", () => {
      if (effect.element.checked) {
        effect.handler([this.node], false, effect.duration, effect.offset);
      } else {
        effect.handler([this.node], true, effect.duration, effect.offset);
      }
    });
  }
}

const svgSlideEffect = (nodes = [], reverse = false, duration = 100, offset = 10) => {
  nodes.forEach((node, index) => {
    setTimeout(() => {
      if (reverse) {
        node.animate({ duration: duration }).transform({ x: 0 });
      } else {
        node.animate({ duration: duration }).transform({ x: 48 });
      }
    }, index * offset);
  });
};

export default Modal;
