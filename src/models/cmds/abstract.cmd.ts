import { validateOrReject } from 'class-validator';
import { CmdValidationError } from '../../core/errors/cmd-validation.error';

/**
 * Clase base para todos los CMDs
 */

export class AbstractCmd {
  constructor() {}

  public async validate() {
    try {
      const r = await validateOrReject(this, { validationError: { target: false } });
    } catch (e) {
      throw new CmdValidationError(e);
    }
  }
}
