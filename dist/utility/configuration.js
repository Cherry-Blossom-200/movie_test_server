"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    db: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        db_name: process.env.DATABASE_DEFAULT_DB,
        username: process.env.DATABASE_USERNAME,
    },
});
//# sourceMappingURL=configuration.js.map