const DB_URI = ( process.env.NODE_ENV === 'test' ) ? "postgresql://test_iser:mypassword@localhost/cookdb_test" : "postgresql://test_iser:mypassword@localhost/cookdb";

const SECRET_KEY = process.env.SECRET_KEY || "zBoWN2opM3G5PbAUoM43";

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;


module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
};