-- Tabla usuarios.
CREATE TABLE public.users (
    "id" serial NOT NULL,
    "username" varchar NOT NULL,
    "firstname" varchar NOT NULL,
    "lastname" varchar NOT NULL,
    "dni" varchar NOT NULL,
    "phone" varchar,
    "direction" varchar,
    "create_time" timestamp without time zone DEFAULT NOW(),
    PRIMARY KEY ("id")
);