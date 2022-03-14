import { Expose } from 'class-transformer';

export class ExampleResult {
  @Expose({ name: 'Id' })
  id: number;
  @Expose({ name: 'Nombre' })
  description: string;

  constructor() {
    this.id = undefined;
    this.description = undefined;
  }
}
