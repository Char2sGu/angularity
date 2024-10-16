import { TypescaleConfig } from './typescale.builder';

/**
 * Standard typescale configuration strictly following Material specifications.
 * @see `StandardTypescaleBuilder`
 */
export const STANDARD_TYPESCALES: Omit<TypescaleConfig, 'font'>[] = [
  {
    name: 'display-large',
    weight: '400',
    size: '57px',
    lineHeight: '64px',
    tracking: '-0.2px',
  },
  {
    name: 'display-medium',
    weight: '400',
    size: '45px',
    lineHeight: '52px',
    tracking: '0.0px',
  },
  {
    name: 'display-small',
    weight: '400',
    size: '36px',
    lineHeight: '44px',
    tracking: '0.0px',
  },
  {
    name: 'headline-large',
    weight: '400',
    size: '32px',
    lineHeight: '40px',
    tracking: '0.0px',
  },
  {
    name: 'headline-medium',
    weight: '400',
    size: '28px',
    lineHeight: '36px',
    tracking: '0.0px',
  },
  {
    name: 'headline-small',
    weight: '400',
    size: '24px',
    lineHeight: '32px',
    tracking: '0.0px',
  },
  {
    name: 'title-large',
    weight: '400',
    size: '22px',
    lineHeight: '28px',
    tracking: '0.0px',
  },
  {
    name: 'title-medium',
    weight: '500',
    size: '16px',
    lineHeight: '24px',
    tracking: '0.2px',
  },
  {
    name: 'title-small',
    weight: '500',
    size: '14px',
    lineHeight: '20px',
    tracking: '0.1px',
  },
  {
    name: 'body-large',
    weight: '400',
    size: '16px',
    lineHeight: '24px',
    tracking: '0.5px',
  },
  {
    name: 'body-medium',
    weight: '400',
    size: '14px',
    lineHeight: '20px',
    tracking: '0.2px',
  },
  {
    name: 'body-small',
    weight: '400',
    size: '12px',
    lineHeight: '16px',
    tracking: '0.4px',
  },
  {
    name: 'label-large',
    weight: '500',
    size: '14px',
    lineHeight: '20px',
    tracking: '0.1px',
  },
  {
    name: 'label-medium',
    weight: '500',
    size: '12px',
    lineHeight: '16px',
    tracking: '0.5px',
  },
  {
    name: 'label-small',
    weight: '500',
    size: '11px',
    lineHeight: '16px',
    tracking: '0.5px',
  },
];
