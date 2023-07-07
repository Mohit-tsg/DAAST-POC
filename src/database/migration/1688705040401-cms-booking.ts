import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CmsBooking1688705040401 implements MigrationInterface {
    private readonly tableName ="cms_booking"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: this.tableName,
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  isNullable: false,
                  default: "uuid_generate_v4()",
                },
                {
                  name: "booking_user",
                  type: "varchar",
                  isNullable: false,
                },
                {
                  name: "booking_name",
                  type: "varchar",
                  isNullable: false,
                },
                {
                  name: "booking_title",
                  type: "varchar",
                  isNullable: true,
                },
                {
                  name: "booking_description",
                  type: "varchar",
                  isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  },
                  {
                    name: "updated_at",
                    type: "timestamptz",
                    isNullable: false,
                    default: "now()",
                  },
                
              ]
            }));
    };

    public async down(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.dropTable(this.tableName);
    }

}
