/**
 * Type function that accepts a path template string and returns a union of
 * string literals representing the path parameters parsed from the string.
 */
export type PathTemplateParamNamesOf<Path extends string> =
  Path extends `${infer Before}{{${infer Param}}}${infer After}`
    ? Param | PathTemplateParamNamesOf<`${Before}${After}`>
    : never;

/**
 * Type function that accepts a path template string and returns a type
 * representing the parameters expected by the template, which is either
 * a `Record` of string keys and string values, or `void` if the template
 * does not contain any parameters.
 */
export type PathTemplateParamsOf<Path extends string> =
  PathTemplateParamNamesOf<Path> extends infer Keys extends string
    ? { [Key in Keys]: string }
    : never;

const PATH_TEMPLATE_PARAM_REGEX = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/gu;

/**
 * Parses a path template string into a set of path parameter names.
 * @param path the path template string to parse, e.g. "/users/{{id}}"
 * @returns a set of path parameter names, e.g. ["id"]
 */
export function parsePathTemplate<Path extends string>(
  path: Path,
): Set<PathTemplateParamNamesOf<Path>> {
  return new Set(
    (path
      .match(PATH_TEMPLATE_PARAM_REGEX)
      ?.map((match) =>
        match.slice(2, -2),
      ) as PathTemplateParamNamesOf<Path>[]) || [],
  );
}

/**
 * Interpolates a path string with the given parameters.
 * @param path the path string to interpolate, where path parameters are
 *    denoted by a double curly braces (e.g. "/users/{{id}}").
 * @param params the parameters to interpolate, e.g. { id: 1 }
 *
 * @returns the interpolated path string, e.g. "/users/1"
 */
export function interpolatePathTemplate<Path extends string>(
  path: Path,
  params: PathTemplateParamsOf<Path>,
): string {
  if (!params) return path;
  return path.replace(PATH_TEMPLATE_PARAM_REGEX, (_, param) => {
    const value = params[param as PathTemplateParamNamesOf<Path>];
    if (value === undefined)
      throw new Error(`missing path parameter: ${param}`);
    return value;
  });
}
