import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { login, signup } from '@/lib/actions/auth'

export default async function LoginPage(props: {
  searchParams: Promise<{ message?: string }>
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto h-[calc(100vh-100px)] mt-20">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <div className="flex flex-col gap-2 mb-4 text-center">
          <h1 className="text-3xl font-serif text-foreground">Admin Portal</h1>
          <p className="text-sm text-foreground/70">Sign in to manage the store.</p>
        </div>
        
        <label className="text-md font-medium text-foreground" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border text-foreground border-primary-200 dark:border-primary-800 mb-4 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
          name="email"
          placeholder="admin@nutracore.com"
          required
        />
        
        <label className="text-md font-medium text-foreground" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border text-foreground border-primary-200 dark:border-primary-800 mb-6 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button
          formAction={login}
          className="bg-foreground text-background rounded-md px-4 py-2 mb-2 hover:opacity-90 transition-opacity"
        >
          Secure Sign In
        </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-100 text-red-900 text-center rounded-md border border-red-200 text-sm">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}