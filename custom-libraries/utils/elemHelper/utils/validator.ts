/**
 * This file contains the parameter validation logic for p [protractor helper library]
 */

import { elementHelperGlobalConstants } from './element-helper-constants';

export const timeout = {
  timeoutInMilliseconds: elementHelperGlobalConstants.DEFAULT_TIMEOUT_IN_MS,
};

export const requiredParameter = (
  functionWithoutParameter,
  requiredParameter = 'htmlElement'
) => {
  const requiredParameterError = new Error(
    `Parameter '${requiredParameter}' is missing at function '${functionWithoutParameter.name}()'. \nFill the required parameter.`
  );
  Error.captureStackTrace(requiredParameterError, functionWithoutParameter);
  throw requiredParameterError;
};
