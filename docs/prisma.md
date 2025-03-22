# Prisma

reference

<https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql>

## database auth

```sh
pnpm prisma db push --schema=./prisma/db-auth/schema.prisma
pnpm prisma generate --schema=./prisma/db-auth/schema.prisma

pnpm prisma migrate deploy --schema=./prisma/db-auth/schema.prisma

```

## database namadatabase

```sh
pnpm prisma db push --schema=./prisma/db-nama/schema.prisma
pnpm prisma generate --schema=./prisma/db-nama/schema.prisma

pnpm prisma migrate deploy --schema=./prisma/db-nama/schema.prisma

```

## manually add tsv on sekolah

```sh
# pnpm prisma db push --schema=./prisma/db-nama/schema.prisma
# pnpm prisma migrate reset --schema=./prisma/db-nama/schema.prisma

pnpm prisma migrate dev --name init  --schema=./prisma/db-nama/schema.prisma
pnpm prisma migrate dev --name add_tsvector_on_sekolah --create-only --schema=./prisma/db-nama/schema.prisma
# pnpm prisma migrate status --schema=./prisma/db-nama/schema.prisma
# pnpm prisma migrate resolve add_tsvector_on_sekolah --rolled-back 20250217115438_add_tsvector_on_sekolah --schema=./prisma/db-nama/schema.prisma

pnpm prisma migrate deploy --schema=./prisma/db-nama/schema.prisma
# pnpm prisma migrate dev --name add_kelurahan_desa --schema=./prisma/db-nama/schema.prisma
pnpm prisma migrate dev --name pendaftaran-dan-pembayaran --create-only --schema=./prisma/db-nama/schema.prisma
```

```sh

# Generate a secure password
# https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding
secure_password=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9!@#$%^&*()_+-=' | head -c 32)
echo $secure_password

# Connect to PostgreSQL as the postgres user
sudo -u postgres psql

# Create a new database
CREATE DATABASE new_database_name;

# FOR PRISMA NEED ELEVATED USER
# Create a new user with a password
CREATE USER new_username WITH PASSWORD 'your_password';

# Grant all privileges on a specific database to the new user
GRANT ALL PRIVILEGES ON DATABASE your_database TO new_username;

# FOR RUNTIME WE NEED LIMITED PRIVILEGES

-- Create the elevated user
CREATE USER prisma_admin WITH PASSWORD 'admin_password';

-- Create the limited user
CREATE USER prisma_user WITH PASSWORD 'user_password';


-- Grant all privileges on the database to the elevated user
GRANT ALL PRIVILEGES ON DATABASE namadatabase TO user_admin;

-- Grant CREATE DATABASE permission
GRANT CREATE ON DATABASE namadatabase TO user_admin;

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE namadatabase TO user_admin;

-- Grant all privileges on all tables, sequences, and schemas
\c namadatabase
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO user_admin;

-- Grant limited privileges on the database to the limited user
GRANT CONNECT ON DATABASE namadatabase TO namadatabaselu;
GRANT USAGE ON SCHEMA public TO namadatabaselu;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO namadatabaselu;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO namadatabaselu;

-- CREATE ROLE new_power_user WITH LOGIN SUPERUSER PASSWORD 'your_password';


-- Grant CREATE DATABASE permission
GRANT CREATE ON DATABASE namadatabaseauth TO user_admin;

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE namadatabaseauth TO user_admin;
-- Grant all privileges on all tables, sequences, and schemas
\c namadatabaseauth
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO user_admin;

-- Grant limited privileges on the database to the limited user
GRANT CONNECT ON DATABASE namadatabaseauth TO namadatabaselu;
GRANT USAGE ON SCHEMA public TO namadatabaselu;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO namadatabaselu;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO namadatabaselu;


# Exit psql
\q
```

## Seeding

```sh
pnpm add -D ts-node typescript @types/node
```

add to `package.json`

```diff
 "scripts": {
+    "prisma:seed:namadatabase": "tsx prisma/db-nama/seed.ts"
  },
```

run seed

```sh
pnpm prisma:seed:namadatabase
```
