'use client';

import { HTMLMotionProps, motion as framerMotion } from 'framer-motion';
import { ComponentType, ReactElement } from 'react';

// We create this wrapper to avoid importing framer-motion in server components
export const motion = {
  div: (props: HTMLMotionProps<'div'>): ReactElement => {
    return <framerMotion.div {...props} />;
  },
  h1: (props: HTMLMotionProps<'h1'>): ReactElement => {
    return <framerMotion.h1 {...props} />;
  },
  h2: (props: HTMLMotionProps<'h2'>): ReactElement => {
    return <framerMotion.h2 {...props} />;
  },
  p: (props: HTMLMotionProps<'p'>): ReactElement => {
    return <framerMotion.p {...props} />;
  },
  span: (props: HTMLMotionProps<'span'>): ReactElement => {
    return <framerMotion.span {...props} />;
  },
  ul: (props: HTMLMotionProps<'ul'>): ReactElement => {
    return <framerMotion.ul {...props} />;
  },
  li: (props: HTMLMotionProps<'li'>): ReactElement => {
    return <framerMotion.li {...props} />;
  },
  a: (props: HTMLMotionProps<'a'>): ReactElement => {
    return <framerMotion.a {...props} />;
  },
  button: (props: HTMLMotionProps<'button'>): ReactElement => {
    return <framerMotion.button {...props} />;
  },
  section: (props: HTMLMotionProps<'section'>): ReactElement => {
    return <framerMotion.section {...props} />;
  },
};