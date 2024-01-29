import { QueryRunner } from 'typeorm';
export function MyTransaction(): MethodDecorator {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const queryRunner = this._queryRunner as QueryRunner;

      await queryRunner.connect()
      try {
        await queryRunner.startTransaction()
        const result = await fn.apply(this, args);
        await queryRunner.commitTransaction()
        return result
      } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error
      } finally {
        await queryRunner.release()
      }
    };
  };
}