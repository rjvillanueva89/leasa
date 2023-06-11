import Link from "next/link"
import { IconPencilSquare } from "./Icons/Outline"

interface Props {
  id: number
}

export const InvoiceActions = ({ id }: Props) => {
  return (
    <>
      <Link
        className="btn btn-ghost btn-sm rounded-none"
        href={`/invoices/${id}`}
      >
        <IconPencilSquare />
      </Link>
    </>
  )
}
