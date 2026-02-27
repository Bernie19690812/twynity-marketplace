'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  href: string
  label: string
  exact?: boolean
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', exact: true },
  { href: '/create', label: 'Create Twin' },
  { href: '/app', label: 'My Twyns' },
  { href: '/marketplace', label: 'Marketplace' },
]

function isLinkActive(href: string, pathname: string, exact?: boolean): boolean {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(href + '/')
}

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav
      className="w-full bg-white border-b border-grey-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 h-16">

        {/* Logo */}
        <Link href="/" aria-label="Twynity home" className="flex-shrink-0 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/twynity-logo.svg" alt="Twynity" className="h-8 w-auto" />
        </Link>

        {/* Nav links */}
        <div className="flex-1 flex items-center gap-1 mx-8 overflow-x-auto scrollbar-none">
          {NAV_LINKS.map(({ href, label, exact }) => {
            const active = isLinkActive(href, pathname, exact)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'whitespace-nowrap px-4 py-2 text-sm rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40',
                  active
                    ? 'text-brand-primary font-semibold bg-brand-xlight'
                    : 'text-grey-600 font-medium hover:text-grey-900 hover:bg-grey-50',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Log in */}
        <Link
          href="/login"
          className="flex-shrink-0 rounded-lg border border-grey-200 px-4 py-2 text-sm font-medium text-grey-900 transition-colors duration-150 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          Log in
        </Link>
      </div>
    </nav>
  )
}
