import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { buildDisplacementMap } from '../lib/liquidGlass/displacement';
import { supportsSvgBackdrop } from '../lib/liquidGlass/support';

const urlCache = new WeakMap();

export function mapToDataUrl(map, doc = document) {
  const hit = urlCache.get(map);
  if (hit) return hit;
  const canvas = doc.createElement('canvas');
  canvas.width = map.width;
  canvas.height = map.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const img = ctx.createImageData(map.width, map.height);
  img.data.set(map.data);
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL('image/png');
  urlCache.set(map, url);
  return url;
}

// A glass surface with real edge refraction in Chromium (SVG displacement as
// backdrop-filter) and a blur/saturate approximation everywhere else.
export default function LiquidGlass({
  as: Tag = 'div',
  className = '',
  radius = 24,
  strength = 24,
  blur = 12,
  style,
  children,
  ...rest
}) {
  const id = `lg-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const live = supportsSvgBackdrop();

  useLayoutEffect(() => {
    if (!live || !ref.current) return undefined;
    const el = ref.current;
    let timer;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 100);
    });
    ro.observe(el);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [live]);

  const ready = live && size.w > 1 && size.h > 1;
  // Half-resolution map, stretched back up by preserveAspectRatio="none".
  const href = ready ? mapToDataUrl(buildDisplacementMap(size.w / 2, size.h / 2, radius / 2)) : null;

  const backdrop = href ? `url(#${id})` : `blur(${blur}px) saturate(160%)`;
  const surfaceStyle = {
    borderRadius: radius,
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
    ...style,
  };

  return (
    <Tag ref={ref} className={`liquid-glass ${className}`} style={surfaceStyle} {...rest}>
      {href && (
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB" primitiveUnits="userSpaceOnUse">
            <feImage href={href} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="map" />
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur / 2} result="blurred" />
            <feDisplacementMap in="blurred" in2="map" scale={strength} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}
      {children}
    </Tag>
  );
}
