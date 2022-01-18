import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrdersGames1642518151469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_games',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'game_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders_games',
      new TableForeignKey({
        name: 'OrderGame',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders_games',
      new TableForeignKey({
        name: 'GameOrder',
        columnNames: ['game_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'games',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_games', 'OrderGame');
    await queryRunner.dropColumn('orders_games', 'order_id');

    await queryRunner.dropForeignKey('orders_games', 'GameOrder');
    await queryRunner.dropColumn('orders_games', 'game_id');

    await queryRunner.dropTable('orders_games');
  }
}
