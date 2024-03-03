import {
  ThemeBuilder,
  ThemeBuilderContext,
  ThemeTokens,
} from '@angularity/theming';

export interface TypescaleConfig {
  font: string;
  name: string;
  weight: string;
  size: string;
  lineHeight: string;
  tracking: string;
}

export interface TypescaleBuilderConfig extends Array<TypescaleConfig> {}

export class TypescaleBuilder implements ThemeBuilder<TypescaleBuilderConfig> {
  build(context: ThemeBuilderContext<TypescaleBuilderConfig>): ThemeTokens {
    const tokens: ThemeTokens = {};
    for (const typescale of context.config) {
      const result = this.buildTypescale(typescale);
      for (const token in result)
        tokens[`${context.name}-${token}`] = result[token];
    }
    return tokens;
  }

  buildTypescale(config: TypescaleConfig): ThemeTokens {
    const { name, font, weight, size, lineHeight, tracking } = config;
    return {
      [`${name}-font`]: font,
      [`${name}-weight`]: weight,
      [`${name}-size`]: size,
      [`${name}-line-height`]: lineHeight,
      [`${name}-tracking`]: tracking,
    };
  }
}
