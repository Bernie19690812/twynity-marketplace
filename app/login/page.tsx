import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-grey-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Twynity home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/twynity-logo.svg" alt="Twynity" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-grey-200 shadow-[0_1px_4px_rgba(26,24,48,0.06)] p-8">
          <h1 className="text-2xl font-semibold text-grey-900 mb-1">Welcome back</h1>
          <p className="text-sm text-grey-600 mb-6">Sign in to your Twynity account</p>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-grey-200 px-4 py-3 text-sm font-medium text-grey-900 transition-colors duration-150 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6 flex items-center">
            <div className="flex-1 border-t border-grey-200" />
            <span className="px-3 text-xs text-grey-400">or</span>
            <div className="flex-1 border-t border-grey-200" />
          </div>

          {/* Email form */}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-grey-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="rounded-lg border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 placeholder:text-grey-400 focus:border-brand-primary focus:outline-none focus:ring-3 focus:ring-brand-xlight transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-grey-900">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="rounded-lg border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 placeholder:text-grey-400 focus:border-brand-primary focus:outline-none focus:ring-3 focus:ring-brand-xlight transition-colors duration-150"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-grey-600">
            Don&apos;t have an account?{' '}
            <Link href="/create" className="font-semibold text-brand-primary hover:underline">
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
