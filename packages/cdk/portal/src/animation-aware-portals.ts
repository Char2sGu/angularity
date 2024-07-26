import { animateChild, query, transition, trigger } from '@angular/animations';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  inject,
  InjectionToken,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core';
import { provide } from '@angularity/core';

export interface AnimationAwareTemplatePortalConfig<C> {
  template: TemplateRef<C>;
  context?: C;
  injector?: Injector;
}

export const ANIMATION_AWARE_TEMPLATE_PORTAL_CONFIG = new InjectionToken<
  AnimationAwareTemplatePortalConfig<any>
>('ANIMATION_AWARE_TEMPLATE_PORTAL_CONFIG');

/**
 * Regular template portals don't trigger leave animations when the template
 * is removed. This is a workaround to this issue by using a component portal
 * with a few tricks to render the template.
 * @param config
 * @returns
 */
export function createAnimationAwareTemplatePortal<C>(
  config: AnimationAwareTemplatePortalConfig<C>,
): Portal<ComponentRef<AnimationAwarePortalContainer>> {
  const component = AnimationAwarePortalContainer;
  const token = ANIMATION_AWARE_TEMPLATE_PORTAL_CONFIG;
  const injector = Injector.create({
    providers: [provide({ token, useValue: config })],
  });
  return new ComponentPortal(component, undefined, injector);
}

export interface AnimationAwareComponentPortalConfig {
  component: Type<any>;
  inputs?: any;
  injector?: Injector;
}

/**
 * Regular component portals don't trigger leave animations when the component
 * is removed. This is a workaround to this issue by using a few tricks to render
 * the component.
 * @param config
 * @returns
 */
export function createAnimationAwareComponentPortal(
  config: AnimationAwareComponentPortalConfig,
): Portal<ComponentRef<AnimationAwarePortalContainer>> {
  const component = AnimationAwarePortalContainer;
  const token = ANIMATION_AWARE_COMPONENT_PORTAL_CONFIG;
  const injector = Injector.create({
    providers: [provide({ token, useValue: config })],
  });
  return new ComponentPortal(component, undefined, injector);
}

export const ANIMATION_AWARE_COMPONENT_PORTAL_CONFIG =
  new InjectionToken<AnimationAwareComponentPortalConfig>(
    'ANIMATION_AWARE_COMPONENT_PORTAL_CONFIG',
  );

@Component({
  selector: 'agl-animation-aware-portal-container',
  standalone: true,
  template: `
    @if (templateConfig; as c) {
      <ng-container
        *ngTemplateOutlet="
          c.template;
          context: c.context;
          injector: c.injector ?? null
        "
      />
    }
    @if (componentConfig; as c) {
      <ng-container
        *ngComponentOutlet="c.component; inputs: c.inputs; injector: c.injector"
      />
    }
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgComponentOutlet],
  // The presence of the `animations` metadata property is necessary to make sure
  // the leave animations can be correctly triggered for template outlets...??
  // But this doesn't work for component outlets, and thus we need animateChild()
  // to make sure leave animations work for components too.
  host: { '[@AnimationAwarePortal]': '' },
  animations: [
    trigger('AnimationAwarePortal', [
      transition(':leave', query('@*', animateChild(), { optional: true })),
    ]),
  ],
})
export class AnimationAwarePortalContainer {
  templateConfig = inject(ANIMATION_AWARE_TEMPLATE_PORTAL_CONFIG, {
    optional: true,
  });
  componentConfig = inject(ANIMATION_AWARE_COMPONENT_PORTAL_CONFIG, {
    optional: true,
  });
}
