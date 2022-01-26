export const IDLE = 'idle'
export const ANIMATION_FRAME = 'animationFrame'
export const TYPE_MAP = {
  [IDLE]: ['requestIdleCallback', 'cancelIdleCallback'],
  [ANIMATION_FRAME]: ['requestAnimationFrame', 'cancelAnimationFrame'],
} as const
