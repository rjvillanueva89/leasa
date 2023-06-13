"use client"

import { Invoice } from "@/schema/invoices"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"
import { IconPaperAirplane, IconPencilSquare } from "./Icons/Outline"

interface Props {
  id: number
}

interface InvoiceContractTenantProperty extends Invoice {
  contracts: {
    tenants: Pick<Tenant, "id" | "fullname" | "email">
    properties: Pick<Property, "id" | "name">
  }
}

export const InvoiceActions = async ({ id }: Props) => {
  const handleSendMail = () => {
    console.log(id)
  }

  return (
    <>
      <Link
        className="btn btn-ghost btn-sm rounded-none"
        href={`/invoices/${id}`}
      >
        <IconPencilSquare />
      </Link>
      <button
        type="button"
        className="btn btn-ghost btn-sm rounded-none"
        onClick={handleSendMail}
      >
        <IconPaperAirplane />
      </button>
    </>
  )
}
