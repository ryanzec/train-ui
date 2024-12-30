import type * as zod from 'zod';

// this is the recommended way for checking a zod schema in sync with referencing type
// reference: https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
const schemaForType =
  <T>() =>
  // biome-ignore lint/suspicious/noExplicitAny: see above reference for why we are allowing any here
  <S extends zod.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

const getErrorPaths = <TSchemaData>(zodError: zod.ZodError) => {
  const keys: TSchemaData[] = [];

  for (const issue of zodError.issues) {
    keys.push(issue.path.join('.') as TSchemaData);
  }

  return [...new Set(keys)];
};

// biome-ignore lint/suspicious/noExplicitAny: because this method is using is use a string as a path to get a zod type from any zod shape, not sure how to do that other than using any
const getNestedSchema = (path: string, shape: any): zod.ZodType => {
  const pathParts = path.split('.');

  // biome-ignore lint/suspicious/noExplicitAny: see above comment
  let currentSchema: any = shape;

  for (let i = 0; i < pathParts.length; i++) {
    const currentPathPart = pathParts[i];
    const nextPath = pathParts[i + 1];

    // last one
    if (i === pathParts.length - 1) {
      currentSchema = currentSchema[currentPathPart];

      break;
    }

    // if it is not a number, than that means this is an object type and we just need `.shape`
    if (!nextPath || Number.isNaN(Number.parseInt(nextPath))) {
      currentSchema = currentSchema[currentPathPart].shape;

      continue;
    }

    // arrays need the additional
    currentSchema = currentSchema[currentPathPart].element.shape;

    // we bump up the next path part since we have already dealt with the array portion
    i++;
  }

  return currentSchema as zod.ZodType;
};

export const zodUtils = {
  schemaForType,
  getErrorPaths,
  getNestedSchema,
};
