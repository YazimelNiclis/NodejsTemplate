import { Expose } from 'class-transformer';

export class SpResult {
  @Expose({ name: 'Mensaje' })
  message: string;
  @Expose({ name: 'Error' })
  error: string;
  @Expose({ name: 'Id' })
  id: number;

  constructor() {
    this.message = undefined;
    this.error = undefined;
    this.id = undefined;
  }
}
