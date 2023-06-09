import Link from "next/link"
import { IconPencilSquare } from "./Icons/Outline"

interface Props {
  id: string
}

export const ContractActions = ({ id }: Props) => {
  return (
    <>
      <Link
        className="btn btn-ghost btn-sm rounded-none"
        href={`/contracts/${id}`}
      >
        <IconPencilSquare />
      </Link>
    </>
  )
}
