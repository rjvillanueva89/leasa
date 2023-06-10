import clsx from "clsx"

type Position = "left" | "center" | "right"

interface Props {
  label?: string
  labelPosition?: Position
}

export const Separator = ({ label, labelPosition = "center" }: Props) => {
  if (!label) return <hr className="my-4" />

  return (
    <div
      className={clsx("mt-2 mb-4", {
        "text-center": labelPosition === "center",
        "text-left": labelPosition === "left",
        "text-right": labelPosition === "right",
      })}
    >
      <span className="mx-2 h-2 bg-white dark:bg-black p-2 text-sm text-gray-400 relative">
        {label}
      </span>
      <hr className="-mt-2.5" />
    </div>
  )
}
