import { Pool } from "pg";
import { Duty } from "../domain/duty.js";

export interface DutyService {
  findAll(): Promise<Duty[]>;
  create(dutyText: string): Promise<Duty>;
  updateById(id: string, dutyText: string): Promise<Duty>;
  deleteById(id: string): Promise<void>;
}

export class DutyServiceImpl implements DutyService {
  constructor(private dbConnectionPool: Pool) {}

  async findAll(): Promise<Duty[]> {
    const client = await this.dbConnectionPool.connect();
    try {
      const { rows } = await client.query(
        `SELECT * FROM duties d ORDER BY d.id`
      );
      return rows;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
  async create(dutyText: string): Promise<Duty> {
    const client = await this.dbConnectionPool.connect();
    try {
      const { rows } = await client.query(
        `INSERT INTO duties(name) VALUES ($1) RETURNING *`,
        [dutyText]
      );
      return rows[0];
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
  async updateById(id: string, dutyText: string): Promise<Duty> {
    const client = await this.dbConnectionPool.connect();
    try {
      const { rows } = await client.query(
        `UPDATE duties SET name = $1 WHERE id = $2 RETURNING *`,
        [dutyText, id]
      );
      return rows[0];
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  async deleteById(id: string): Promise<void> {
    const client = await this.dbConnectionPool.connect();
    try {
      await client.query(`DELETE FROM duties WHERE id = $1`, [id]);
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}
