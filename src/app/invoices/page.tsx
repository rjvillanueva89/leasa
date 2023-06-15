import { InvoiceTable } from "@/components/InvoiceTable"
import { Menu } from "@/components/Menu"
import { supabase } from "@/lib/supabaseClient"
import { Invoice } from "@/schema/invoices"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"

export interface InvoiceContract extends Invoice {
  contracts: {
    tenants: Tenant
    properties: Property
  }
  items: { description: string; amount: string }[]
}

const InvoicesPage = async () => {
  const { data } = await supabase
    .from("invoices")
    .select(
      `*, contracts (id, tenants ( id, fullname, email ), properties ( id, name ))`
    )
  const invoices = data as InvoiceContract[]

  return (
    <>
      <div className="flex items-center justify-between">
        <Menu label="Invoices" />
        <Link href="/invoices/new" className="btn btn-ghost rounded-none">
          New Invoice
        </Link>
      </div>
      <InvoiceTable data={invoices} />
    </>
  )
}

export const revalidate = 10
export default InvoicesPage
