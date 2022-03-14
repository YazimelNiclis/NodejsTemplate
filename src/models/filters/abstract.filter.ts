import { validateOrReject } from 'class-validator';
import { CmdValidationError } from '../../core/errors/cmd-validation.error';

/**
 * Clase base para todos los CMDs
 */

export class AbstractFilter {
  constructor() {}

  public async validate() {
    try {
      await validateOrReject(this, { validationError: { target: false } });
    } catch (e) {
      throw new CmdValidationError(e);
    }
  }
}
