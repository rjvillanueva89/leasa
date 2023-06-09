import { Menu } from "@/components/Menu"
import { PropertyTable } from "@/components/PropertyTable"
import Link from "next/link"

const ContractsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Menu label="Contracts" />
        <Link href="/contracts/new" className="btn btn-ghost rounded-none">
          New Contract
        </Link>
      </div>
      <PropertyTable data={[]} />
    </>
  )
}

export default ContractsPage
