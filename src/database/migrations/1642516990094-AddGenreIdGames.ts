import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddGenreIdGames1642516990094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'games',
      new TableColumn({
        name: 'genre_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'games',
      new TableForeignKey({
        name: 'GameGenre',
        columnNames: ['genre_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'genres',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('games', 'GameGenre');
    await queryRunner.dropColumn('games', 'genre_id');
  }
}
