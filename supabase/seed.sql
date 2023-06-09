CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END
$$;

CREATE TRIGGER set_public_contracts_updated_at BEFORE UPDATE ON public.contracts
    FOR EACH ROW
    EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

CREATE TRIGGER set_public_properties_updated_at BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

CREATE TRIGGER set_public_tenants_updated_at BEFORE UPDATE ON public.tenants
    FOR EACH ROW
    EXECUTE PROCEDURE public.set_current_timestamp_updated_at();