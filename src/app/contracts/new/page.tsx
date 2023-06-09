import { ContractForm } from "@/components/ContractForm"
import Link from "next/link"

const NewContract = async () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">New Contract</h1>
        <Link href="/contracts" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <ContractForm />
    </>
  )
}

export default NewContract
