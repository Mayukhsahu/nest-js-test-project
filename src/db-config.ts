export const SQLConnection: any = {
    type: "mysql",
    host: "aura-uat.cwfjz6cyloxy.me-south-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "zFs4upwKvvpRbbXcKSTf8La3MP4ymd",
    synchronize: false,
    multipleStatements: true,
    logging: true,
    entities: ["dist/**/**.entity{.ts,.js}"],
    database:"2000_healthcare_transactions"
};