ALTER TABLE "invoices" DROP CONSTRAINT "invoices_contract_id_tenants_id_fk";

DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
