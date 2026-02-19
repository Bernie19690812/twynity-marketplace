'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  href: string
  label: string
  /** If true, only active on an exact path match (used for Home). */
  exact?: boolean
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', exact: true },
  { href: '/onboarding/twin', label: 'Digital Twin' },
  { href: '/onboarding/org', label: 'Virtual Organisation' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/plan', label: 'My Plan' },
]

function isLinkActive(href: string, pathname: string, exact?: boolean): boolean {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(href + '/')
}

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav
      className="w-full bg-navy"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center px-4 md:px-6">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Twynity home"
          className="flex-shrink-0 py-4 text-xl font-bold text-white tracking-tight hover:text-cyan transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan rounded"
        >
          Twynity
        </Link>

        {/* Primary nav links — horizontally scrollable on mobile */}
        <div
          className="flex-1 overflow-x-auto scrollbar-none mx-4 md:mx-8"
          role="list"
          aria-label="Primary navigation links"
        >
          <div className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, exact }) => {
              const active = isLinkActive(href, pathname, exact)
              return (
                <Link
                  key={href}
                  href={href}
                  role="listitem"
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'whitespace-nowrap px-3 py-4 text-sm transition-colors duration-150 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan rounded-t',
                    active
                      ? 'text-cyan font-semibold border-cyan'
                      : 'text-white/70 font-medium border-transparent hover:text-white hover:border-white/30',
                  ].join(' ')}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Log in — always right-aligned */}
        <Link
          href="/login"
          className="flex-shrink-0 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-150 hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Log in
        </Link>
      </div>
    </nav>
  )
}
