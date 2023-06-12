import dayjs from "@/lib/dayjs"
import { Property } from "@/schema/properties"
import { Column, Datatable } from "./Datatable"
import { PropertyActions } from "./PropertyActions"

const columns: Column<Property>[] = [
  {
    label: "Name",
    cell: ({ name }) => name,
  },
  { label: "Monthly", cell: ({ monthly }) => monthly },
  {
    label: "Created at",
    cell: ({ created_at }) => dayjs(created_at).format("MM/DD/YYYY"),
  },
  {
    label: "Actions",
    cell: ({ id }) => <PropertyActions id={id} />,
  },
]

interface Props {
  data: Property[]
}

export const PropertyTable = ({ data }: Props) => {
  return <Datatable columns={columns} data={data} />
}
