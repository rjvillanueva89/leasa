CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"contract_id" uuid NOT NULL,
	"items" jsonb NOT NULL,
	"amount" numeric NOT NULL,
	"notes" text,
	"due_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_contract_id_tenants_id_fk" FOREIGN KEY ("contract_id") REFERENCES "tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
