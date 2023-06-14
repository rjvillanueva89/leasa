import ClientProviders from "@/components/Auth/ClientProvider"
import SignupForm from "@/components/Auth/SignupForm"

export default function Home() {
  return (
    <ClientProviders>
      <SignupForm />
    </ClientProviders>
  )
}
