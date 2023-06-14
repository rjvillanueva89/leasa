"use client"

import { InvoiceContract } from "@/app/invoices/page"
import Link from "next/link"
import {
  IconPaperAirplane,
  IconPencilSquare,
  IconReceiptPercent,
} from "./Icons/Outline"

interface Props {
  data: InvoiceContract
}

export const InvoiceActions = ({ data }: Props) => {
  const handleSendMail = async () => {
    await fetch(`/api/mail?invoice_id=${data.id}`)
  }

  return (
    <>
      <Link
        className="btn btn-ghost btn-sm rounded-none"
        href={`/invoices/${data.id}`}
      >
        <IconPencilSquare />
      </Link>
      <Link
        className="btn btn-ghost btn-sm rounded-none"
        href={`/invoices/view/${data.id}`}
      >
        <IconReceiptPercent />
      </Link>
      <button
        type="button"
        className="btn btn-ghost btn-sm rounded-none hidden"
        onClick={handleSendMail}
      >
        <IconPaperAirplane />
      </button>
    </>
  )
}
