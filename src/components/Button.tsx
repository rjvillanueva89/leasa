import clsx from "clsx"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  type?: "button" | "submit" | "reset"
  loading?: boolean
  classNames?: string
}

export const Button = ({
  type = "button",
  loading,
  classNames,
  children,
}: Props) => {
  return (
    <button
      type={type}
      className={clsx("btn btn-ghost rounded-none", classNames)}
    >
      {loading && <span className="loading loading-spinner absolute"></span>}
      <span className={clsx(loading && "opacity-0")}>{children}</span>
    </button>
  )
}
