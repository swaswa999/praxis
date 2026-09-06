'use client';

import { useEffect, useRef } from 'react';

/** Pointer-only decoration. All controls retain their normal keyboard behavior. */
export function PointerEffects() {
  const overlay = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const reticle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = overlay.current;
    const point = dot.current;
    const ring = reticle.current;
    if (!layer || !point || !ring) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let enabled = finePointer.matches && !reducedMotion.matches;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let pressed = false;
    let mode = 'default';
    let x = 0,
      y = 0,
      followX = 0,
      followY = 0;
    let glowDirty = false;
    let frames: HTMLElement[] = [];

    function refreshFrames() {
      frames = Array.from(
        document.querySelectorAll<HTMLElement>('.silver-frame'),
      );
      glowDirty = true;
    }
    refreshFrames();
    const observer = new MutationObserver(refreshFrames);
    observer.observe(document.body, { childList: true, subtree: true });

    function updateGlow() {
      // Read every rectangle before writing styles to avoid layout thrashing.
      const bounds = frames.map((element) => ({
        element,
        rect: element.getBoundingClientRect(),
      }));
      for (const { element, rect } of bounds) {
        if (
          !rect.width ||
          !rect.height ||
          rect.bottom < -160 ||
          rect.top > innerHeight + 160
        )
          continue;
        const dx = Math.max(rect.left - x, x - rect.right, 0);
        const dy = Math.max(rect.top - y, y - rect.bottom, 0);
        const distance = Math.hypot(dx, dy);
        const strength = Math.max(0, 1 - distance / 160);
        const angle =
          (Math.atan2(
            x - (rect.left + rect.width / 2),
            -(y - (rect.top + rect.height / 2)),
          ) *
            180) /
          Math.PI;
        element.style.setProperty('--silver-angle', `${angle}deg`);
        element.style.setProperty('--silver-strength', String(strength));
      }
    }

    function tick(time: number) {
      frame = 0;
      if (!enabled || !visible) return;
      const delta = lastTime ? Math.min(time - lastTime, 32) : 16;
      lastTime = time;
      const smoothing = 1 - Math.exp(-delta / 68);
      followX += (x - followX) * smoothing;
      followY += (y - followY) * smoothing;
      point!.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring!.style.transform = `translate3d(${followX}px,${followY}px,0)`;
      if (glowDirty) {
        updateGlow();
        glowDirty = false;
      }
      if (Math.hypot(x - followX, y - followY) > 0.12)
        frame = requestAnimationFrame(tick);
      else lastTime = 0;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function hide() {
      visible = false;
      pressed = false;
      layer!.dataset.mode = 'hidden';
      document.documentElement.classList.remove('has-silver-cursor');
      frames.forEach((element) =>
        element.style.removeProperty('--silver-strength'),
      );
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }
    function updateMode(target: Element | null) {
      const editing = target?.closest(
        'input, textarea, select, [contenteditable="true"]',
      );
      if (editing) {
        hide();
        return false;
      }
      const control = target?.closest('a, button, [role="tab"], summary');
      mode =
        control && !control.matches(':disabled, [aria-disabled="true"]')
          ? 'active'
          : 'default';
      layer!.dataset.mode = pressed ? 'press' : mode;
      return true;
    }
    function move(event: PointerEvent) {
      if (!enabled || event.pointerType !== 'mouse') {
        hide();
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      if (!updateMode(target)) return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        followX = x;
        followY = y;
      }
      visible = true;
      document.documentElement.classList.add('has-silver-cursor');
      glowDirty = true;
      schedule();
    }
    function press(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !visible) return;
      pressed = true;
      layer!.dataset.mode = 'press';
    }
    function release() {
      pressed = false;
      if (visible) layer!.dataset.mode = mode;
    }
    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide();
    }
    function keyboard(event: KeyboardEvent) {
      if (event.key === 'Tab' || event.key === 'Escape') hide();
    }
    function pageVisibility() {
      if (document.hidden) hide();
    }
    function scroll() {
      if (visible && updateMode(document.elementFromPoint(x, y))) {
        glowDirty = true;
        schedule();
      }
    }
    function preferenceChanged() {
      enabled = finePointer.matches && !reducedMotion.matches;
      hide();
    }

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointercancel', hide, { passive: true });
    window.addEventListener('pointerout', leave, { passive: true });
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll, { passive: true });
    document.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', pageVisibility);
    finePointer.addEventListener('change', preferenceChanged);
    reducedMotion.addEventListener('change', preferenceChanged);
    return () => {
      hide();
      observer.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      document.removeEventListener('keydown', keyboard);
      document.removeEventListener('visibilitychange', pageVisibility);
      finePointer.removeEventListener('change', preferenceChanged);
      reducedMotion.removeEventListener('change', preferenceChanged);
    };
  }, []);

  return (
    <div
      ref={overlay}
      className="silver-cursor"
      data-mode="hidden"
      aria-hidden="true"
    >
      <div ref={reticle} className="silver-reticle">
        <div className="reticle-shape">
          <i />
          <i />
          <i />
          <i />
          <span>SELECT</span>
        </div>
      </div>
      <div ref={dot} className="silver-dot">
        <span />
      </div>
    </div>
  );
}
