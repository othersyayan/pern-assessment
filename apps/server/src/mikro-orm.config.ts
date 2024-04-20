import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';

export default {
  driver: PostgreSqlDriver,
  dbName: 'pern_assessment',
  password: 'password',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './src/migrations',
    pattern: /^[\w-]+\d+\.[tj]s$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
  debug: process.env.NODE_ENV !== 'production',
  clientUrl:
    process.env.DATABASE_URL ||
    'postgres://user:password@localhost:5432/pern_assessment',
  discovery: {
    warnWhenNoEntities: true,
    requireEntitiesArray: false,
    alwaysAnalyseProperties: false,
  },
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
} as Parameters<typeof MikroORM.init>[0];
