CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"description" text DEFAULT 'Oranges are orange.',
	"created_at" timestamp DEFAULT now()
);
