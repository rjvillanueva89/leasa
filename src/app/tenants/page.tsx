import { supabase } from "@/lib/supabaseClient";
import { Database } from "../../lib/database.types";

type Tenant = Database["public"]["Tables"]["tenants"]["Row"];

const TenantsPage = async () => {
  const { data } = await supabase.from("tenants").select();
  const tenants = data as Tenant[];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Tenants</h1>
        <button type="button" className="btn btn-ghost">
          new
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Label</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant: Tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.fullname}</td>
              <td>{tenant.label}</td>
              <td>{tenant.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TenantsPage;
