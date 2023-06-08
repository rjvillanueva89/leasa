import { TenantForm } from "@/components/TenantForm"
import Link from "next/link"

const NewTenant = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">New Tenant</h1>
        <Link href="/tenants" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <TenantForm />
    </>
  )
}

export default NewTenant
