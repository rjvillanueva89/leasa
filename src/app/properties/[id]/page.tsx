import { PropertyForm } from "@/components/PropertyForm"
import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import Link from "next/link"

interface Props {
  params: { id: string }
}

const EditPropertyPage = async ({ params }: Props) => {
  const { data } = await supabase
    .from("properties")
    .select()
    .eq("id", params.id)
    .single()
  const property = data as Property

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Edit Property</h1>
        <Link href="/properties" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <PropertyForm data={property} />
    </>
  )
}

export const revalidate = 60
export default EditPropertyPage
