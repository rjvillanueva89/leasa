export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[40rem] p-4">{children}</div>
    </div>
  )
}
