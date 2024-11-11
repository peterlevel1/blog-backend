import { InternalServerErrorException } from '@nestjs/common';
import { isFunction } from 'lodash';
import { Pool, PoolConnection } from 'mysql2/promise';

export class MysqlRepositoryUtil {
  static async runTransaction<T = any>(pool: Pool, cb: (connection: PoolConnection) => Promise<T>): Promise<T> {
    let poolConnection: PoolConnection;

    try {
      poolConnection = await pool.getConnection();

      await poolConnection.beginTransaction();

      const result = await cb(poolConnection);

      await poolConnection.commit();

      return result;
    } catch (err) {
      if (isFunction(poolConnection?.rollback)) {
        await poolConnection.rollback();
      }

      throw new InternalServerErrorException(err?.message || '');
    } finally {
      if (isFunction(poolConnection?.release)) {
        poolConnection.release();
      }
    }
  }
}
