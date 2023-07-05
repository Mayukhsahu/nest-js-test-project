export const SQLConnection: any = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'mayukh',
  password: 'M@yukh.1997',
  synchronize: true,
  multipleStatements: true,
  logging: true,
  entities: ['dist/**/**.entity{.ts,.js}'],
  database: 'insurance',
};
