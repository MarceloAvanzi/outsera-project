import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';
import * as path from 'path';

export default class SqliteConnection {
  private static instance: sqlite3.Database;

  constructor() {}

  public static getInstance(): sqlite3.Database {
    if (!SqliteConnection.instance) {
      SqliteConnection.instance = new sqlite3.Database(':memory:');
      SqliteConnection.instance.serialize(() => {
        SqliteConnection.instance.run(`
          CREATE TABLE movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER NOT NULL,
            title TEXT NOT NULL,
            studios TEXT NOT NULL,
            producers TEXT NOT NULL,
            winner TEXT
          )
        `);

        this.insertCsvData();
      });
    }

    return SqliteConnection.instance;
  }

  private static insertCsvData(): void {
    const csvFilePath = path.resolve(process.cwd(), 'movielist.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = csvData.split('\n').slice(1);

    const insertStmt = SqliteConnection.instance.prepare(`
      INSERT INTO movies (year, title, studios, producers, winner)
      VALUES (?, ?, ?, ?, ?)
    `);

    rows.forEach((row) => {
      const [year, title, studios, producers, winner] = row.split(';');
      if (year && title && studios && producers) {
        insertStmt.run(
          parseInt(year, 10),
          title.trim(),
          studios.trim(),
          producers.trim(),
          winner ? winner.trim() : null
        );
      }
    });

    insertStmt.finalize();
  }
}