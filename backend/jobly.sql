
\echo 'Delete and recreate cook db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cook;
CREATE DATABASE cook;
\c connect cook

\i cook-schema.sql


\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

