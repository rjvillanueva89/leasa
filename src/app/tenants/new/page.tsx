import Link from "next/link"

const NewTenant = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">New Tenant</h1>
        <Link href="/tenants" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full max-w-sm rounded-none"
          />
        </div>
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <textarea
            className="textarea textarea-bordered rounded-none"
            placeholder="Notes"
          ></textarea>
        </div>
      </div>
    </>
  )
}

export default NewTenant
