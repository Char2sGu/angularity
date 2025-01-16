import { Package, PACKAGES } from './packages';

export function packageIndexOf(pkg: Package): number {
  return PACKAGES.indexOf(pkg);
}
