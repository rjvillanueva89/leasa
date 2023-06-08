import Link from "next/link"
import { IconPencilSquare } from "./Icons/Outline"

interface Props {
  id: string
}

export const TenantActions = ({ id }: Props) => {
  return (
    <>
      <Link
        className="btn btn-ghost btn-sm rounded-none"
        href={`/tenants/${id}`}
      >
        <IconPencilSquare />
      </Link>
    </>
  )
}
