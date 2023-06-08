import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center">
      <Link href="/tenants">{`Let's get started!`}</Link>
    </div>
  )
}
