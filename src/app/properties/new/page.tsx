import { PropertyForm } from "@/components/PropertyForm"
import Link from "next/link"

const NewProperty = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">New Property</h1>
        <Link href="/properties" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <PropertyForm />
    </>
  )
}

export default NewProperty
