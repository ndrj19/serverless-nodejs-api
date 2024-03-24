DROP TABLE IF EXISTS "leads";--> statement-breakpoint
DROP TABLE IF EXISTS "characters_test";--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "house" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_house_houses_id_fk" FOREIGN KEY ("house") REFERENCES "houses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
