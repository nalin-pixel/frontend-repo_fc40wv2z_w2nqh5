import React, { useEffect, useMemo, useState } from 'react'
import { Menu, Search, Globe, Home, Receipt, Tag, Users, Trophy, LogIn, UserPlus, Flame, ChevronLeft, ChevronRight, Languages, Headphones } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const NAV_ITEMS = [
  { label: 'Home', icon: Home },
  { label: 'Transaction', icon: Receipt },
  { label: 'Price', icon: Tag },
  { label: 'Reseller', icon: Users },
  { label: 'Leaderboard', icon: Trophy },
  { label: 'Login', icon: LogIn },
  { label: 'Daftar', icon: UserPlus },
]

const LANGS = [
  { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
]

const TABS = ['TOPUP', 'ACCOUNT', 'JOKI']

const bannerImages = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544739313-6fad225fcfcb?q=80&w=1600&auto=format&fit=crop',
]

const mockProducts = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: `Game ${i + 1}`,
  developer: ['Garena', 'Moonton', 'Tencent', 'EA', 'Ubisoft'][i % 5],
  image: `https://picsum.photos/seed/game${i + 1}/600/400`,
  logo: `https://api.iconify.design/mdi:gamepad-circle.svg?color=white`,
}))

function Header({ onOpenMenu, onToggleSearch, searching, language, setLanguage }) {
  const [langOpen, setLangOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="https://api.iconify.design/mdi:controller.svg?color=%230ea5e9" alt="VECHNOST" className="h-7 w-7" />
          <span className="font-extrabold text-lg tracking-wide">VECHNOST</span>
        </div>

        {/* Search toggle & field (mobile-first) */}
        <div className="ml-auto flex items-center gap-2">
          <button aria-label="Search" onClick={onToggleSearch} className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition">
            <Search className="h-5 w-5" />
          </button>

          {/* Language selector */}
          <div className="relative">
            <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100">
              <Globe className="h-5 w-5" />
              <span className="text-sm hidden sm:block">{language.name}</span>
              <span className="text-base">{language.flag}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden animate-in">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => { setLanguage(l); setLangOpen(false) }} className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-sm">{l.name}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menu */}
          <button aria-label="Menu" onClick={onOpenMenu} className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {searching && (
        <div className="px-4 pb-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search className="h-5 w-5 text-gray-500" />
              <input className="bg-transparent outline-none w-full text-sm" placeholder="Cari game, akun, atau jasa joki..." />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Drawer({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 flex flex-col gap-2 animate-in">
        <div className="flex items-center gap-2 mb-2">
          <Languages className="h-5 w-5 text-sky-500" />
          <div>
            <div className="font-bold">VECHNOST</div>
            <div className="text-xs text-gray-500">Topup • Account • Joki</div>
          </div>
        </div>
        <nav className="grid gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.label} href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Icon className="h-5 w-5 text-gray-600" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

function HeroSpline() {
  return (
    <section className="relative h-[280px] sm:h-[360px] overflow-hidden">
      <Spline scene="https://prod.spline.design/OIGfFUmCnZ3VD8gH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">VECHNOST</h1>
        <p className="text-sm text-gray-600">Topup Games • Account • Joki — cepat, aman, terpercaya</p>
      </div>
    </section>
  )
}

function AutoSlider() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % bannerImages.length), 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl">
      {bannerImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`banner-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
    </div>
  )
}

function BestSellerGrid() {
  const items = mockProducts.slice(0, 6)
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="h-5 w-5 text-orange-500" />
        <h2 className="font-bold">BEST SELLER</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <img src={p.image} alt={p.name} className="h-16 w-24 object-cover rounded-xl" />
            <div>
              <div className="font-semibold leading-tight">{p.name}</div>
              <div className="text-xs text-gray-500">{p.developer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Catalog() {
  const [tabIndex, setTabIndex] = useState(0)
  const [limitRows, setLimitRows] = useState(3)
  const active = TABS[tabIndex]

  const data = useMemo(() => {
    // Split products per category for demo purposes
    return mockProducts
      .filter((p) => {
        if (active === 'TOPUP') return p.id % 3 === 1
        if (active === 'ACCOUNT') return p.id % 3 === 2
        return p.id % 3 === 0
      })
  }, [active])

  const perRow = 3
  const maxShown = limitRows * perRow
  const shown = data.slice(0, maxShown)

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <button aria-label="Prev" onClick={() => setTabIndex((i) => (i - 1 + TABS.length) % TABS.length)} className="p-2 rounded-lg hover:bg-gray-100"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex items-center gap-2">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTabIndex(i)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${i === tabIndex ? 'bg-sky-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {t}
            </button>
          ))}
        </div>
        <button aria-label="Next" onClick={() => setTabIndex((i) => (i + 1) % TABS.length)} className="p-2 rounded-lg hover:bg-gray-100"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {shown.map((p) => (
          <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-gray-100">
            <img src={p.image} alt={p.name} className="h-28 w-full object-cover transition duration-300 group-hover:blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <img src={p.logo} alt="logo" className="h-10 w-10 drop-shadow" />
            </div>
            <div className="px-2 py-2">
              <div className="text-xs text-gray-600 text-center truncate">{p.name}</div>
            </div>
          </div>
        ))}
      </div>

      {shown.length < data.length && (
        <div className="mt-4 text-center">
          <button onClick={() => setLimitRows((r) => r + 3)} className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black">Load More...</button>
        </div>
      )}
    </section>
  )
}

function LogoBanner() {
  return (
    <section className="mt-8">
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 flex items-center justify-center">
        <img src="https://api.iconify.design/mdi:controller-classic-outline.svg?color=%230ea5e9" className="h-8 w-8" alt="logo" />
        <span className="ml-2 font-bold">VECHNOST</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">Tentang VECHNOST</div>
          <p className="text-gray-600">Platform topup, penjualan akun, dan jasa joki game favorit Anda. Harga kompetitif, proses cepat, dan layanan CS responsif.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Menu</div>
          <ul className="space-y-1 text-gray-600">
            <li>Home</li>
            <li>Transaction</li>
            <li>Price</li>
            <li>Reseller</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Informasi</div>
          <ul className="space-y-1 text-gray-600">
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
            <li>Bantuan</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">© {new Date().getFullYear()} VECHNOST • All rights reserved.</div>
    </footer>
  )
}

function FloatingCS() {
  return (
    <a href="#" className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-full shadow-lg">
      <Headphones className="h-5 w-5" />
      <span className="font-semibold text-sm">CS</span>
    </a>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [language, setLanguage] = useState(LANGS[0])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header
        onOpenMenu={() => setMenuOpen(true)}
        onToggleSearch={() => setSearching((v) => !v)}
        searching={searching}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="max-w-6xl mx-auto px-4">
        <HeroSpline />
        <div className="mt-6"><AutoSlider /></div>
        <BestSellerGrid />
        <Catalog />
        <LogoBanner />
      </main>

      <Footer />
      <FloatingCS />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
