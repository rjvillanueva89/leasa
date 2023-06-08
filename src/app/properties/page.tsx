import { PropertyTable } from "@/components/PropertyTable"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { Database } from "../../lib/database.types"

export type Property = Database["public"]["Tables"]["properties"]["Row"]

const PropertiesPage = async () => {
  const { data } = await supabase.from("properties").select()
  const properties = data as Property[]

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Properties</h1>
        <Link href="/properties/new" className="btn btn-ghost rounded-none">
          New Property
        </Link>
      </div>
      <PropertyTable data={properties} />
    </>
  )
}

export default PropertiesPage
