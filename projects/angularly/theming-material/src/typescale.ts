import { ThemeBuilder, ThemeTokens } from '@angularly/theming';

export interface TypescaleBuilderConfig {
  typescales: TypescaleConfig[];
}

export interface TypescaleConfig {
  font: string;
  name: string;
  weight: string;
  size: string;
  lineHeight: string;
  tracking: string;
}

export class TypescaleBuilder implements ThemeBuilder<TypescaleBuilderConfig> {
  build(config: TypescaleBuilderConfig): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const typescale of config.typescales)
      Object.assign(tokens, this.buildTypescale(typescale));
    return tokens;
  }

  buildTypescale(config: TypescaleConfig): ThemeTokens {
    const { name, font, weight, size, lineHeight, tracking } = config;
    return {
      [`typescale-${name}-font`]: font,
      [`typescale-${name}-weight`]: weight,
      [`typescale-${name}-size`]: size,
      [`typescale-${name}-line-height`]: lineHeight,
      [`typescale-${name}-tracking`]: tracking,
    };
  }
}
