import { Menu } from "@/components/Menu"
import { PropertyTable } from "@/components/PropertyTable"
import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import Link from "next/link"

const InvoicesPage = async () => {
  const { data } = await supabase.from("properties").select()
  const properties = data as Property[]

  return (
    <>
      <div className="flex items-center justify-between">
        <Menu label="Invoices" />
        <Link href="/invoices/new" className="btn btn-ghost rounded-none">
          New Invoice
        </Link>
      </div>
      <PropertyTable data={properties} />
    </>
  )
}

export default InvoicesPage
