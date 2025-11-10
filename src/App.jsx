import React, { useEffect, useMemo, useState } from 'react'
import {
  Menu,
  Search,
  Globe,
  Home,
  Receipt,
  Tag,
  Users,
  Trophy,
  LogIn,
  UserPlus,
  Flame,
  ChevronLeft,
  ChevronRight,
  Languages,
  Headphones,
  Star,
  ShieldCheck,
  Zap,
  Clock3,
  PhoneCall,
  ChevronDown,
  Gamepad2,
  MessageCircle
} from 'lucide-react'

// ----------------- Mock Data -----------------
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

const gamesCatalog = [
  'Mobile Legends','Free Fire','PUBG Mobile','Genshin Impact','Call of Duty','Valorant','Clash of Clans','Honkai Star Rail','FIFA Mobile','Arena of Valor','Point Blank','Higgs Domino','Ragnarok','Roblox','League of Legends Wild Rift','Apex Legends','Fortnite','Dota 2','Minecraft','Overwatch 2',
]

const mockProducts = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  name: gamesCatalog[i % gamesCatalog.length],
  developer: ['Garena', 'Moonton', 'Tencent', 'HoYoverse', 'EA', 'Ubisoft'][i % 6],
  image: `https://picsum.photos/seed/game${i + 1}/800/600`,
  logo: `https://api.iconify.design/mdi:gamepad-circle.svg?color=white`,
  price: 10000 + (i % 6) * 5000,
  rating: 4 + ((i % 3) / 10),
}))

const quickFilters = [
  { key: 'semua', label: 'Semua' },
  { key: 'ml', label: 'Mobile Legends' },
  { key: 'ff', label: 'Free Fire' },
  { key: 'genshin', label: 'Genshin Impact' },
  { key: 'valo', label: 'Valorant' },
  { key: 'pubg', label: 'PUBG Mobile' },
  { key: 'coc', label: 'Clash of Clans' },
]

// ----------------- UI Helpers -----------------
const currency = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

// ----------------- Top Info Bar -----------------
function TopInfoBar() {
  return (
    <div className="hidden sm:block bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-sky-500"/> Aman & Terpercaya</div>
          <div className="flex items-center gap-1"><Zap className="h-4 w-4 text-sky-500"/> Proses Instan</div>
          <div className="flex items-center gap-1"><Clock3 className="h-4 w-4 text-sky-500"/> 24/7 Support</div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-white inline-flex items-center gap-1"><PhoneCall className="h-4 w-4"/> 0800-VECHNOST</a>
          <a href="#" className="hover:text-white inline-flex items-center gap-1"><MessageCircle className="h-4 w-4"/> WhatsApp</a>
        </div>
      </div>
    </div>
  )
}

// ----------------- Header -----------------
function Header({ onOpenMenu, onToggleSearch, searching, language, setLanguage }) {
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') setLangOpen(false) }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 grid place-items-center ring-1 ring-slate-700 shadow-lg shadow-sky-900/30">
            <Gamepad2 className="h-4 w-4 text-white"/>
          </div>
          <span className="font-extrabold text-lg tracking-wide text-white group-hover:text-sky-400 transition">VECHNOST</span>
        </a>

        {/* Search */}
        <div className="ml-auto hidden md:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 w-full max-w-sm">
          <Search className="h-5 w-5 text-slate-400" />
          <input className="bg-transparent outline-none w-full text-sm text-slate-100 placeholder:text-slate-500" placeholder="Cari game, akun, atau jasa joki..." />
        </div>

        {/* Actions */}
        <div className="ml-auto md:ml-2 flex items-center gap-2">
          <button aria-label="Search" onClick={onToggleSearch} className="md:hidden p-2 rounded-lg hover:bg-slate-800 active:scale-95 transition text-slate-200">
            <Search className="h-5 w-5" />
          </button>

          {/* Language selector */}
          <div className="relative">
            <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200">
              <Globe className="h-5 w-5" />
              <span className="text-sm hidden sm:block">{language.name}</span>
              <span className="text-base">{language.flag}</span>
              <ChevronDown className="h-4 w-4"/>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => { setLanguage(l); setLangOpen(false) }} className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between text-slate-200">
                    <span className="text-sm">{l.name}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button aria-label="Menu" onClick={onOpenMenu} className="p-2 rounded-lg hover:bg-slate-800 active:scale-95 transition text-slate-200">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {searching && (
        <div className="px-4 pb-3 md:hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <Search className="h-5 w-5 text-slate-400" />
              <input className="bg-transparent outline-none w-full text-sm text-slate-100 placeholder:text-slate-500" placeholder="Cari game, akun, atau jasa joki..." />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Drawer({ open, onClose }) {
  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 max-w-[82vw] bg-slate-950 border-l border-slate-800 shadow-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <Languages className="h-5 w-5 text-sky-500" />
          <div>
            <div className="font-bold text-white">VECHNOST</div>
            <div className="text-xs text-slate-400">Topup • Account • Joki</div>
          </div>
        </div>
        <nav className="grid gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.label} href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200">
                <Icon className="h-5 w-5 text-slate-400" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
        <div className="mt-auto text-xs text-slate-500">© {new Date().getFullYear()} VECHNOST</div>
      </div>
    </div>
  )
}

// ----------------- Slider -----------------
function AutoSlider() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % bannerImages.length), 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 aspect-[16/7]">
      {bannerImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`banner-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {bannerImages.map((_, i) => (
          <span key={i} className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-sky-500' : 'bg-slate-600'}`} />
        ))}
      </div>
    </div>
  )
}

// ----------------- Quick Filters -----------------
function QuickFilters() {
  const [active, setActive] = useState('semua')
  return (
    <div className="mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar">
      {quickFilters.map((f) => (
        <button
          key={f.key}
          onClick={() => setActive(f.key)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-sm border transition ${active === f.key ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-transparent' : 'bg-slate-900/70 text-slate-200 border-slate-800 hover:border-slate-700'}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

// ----------------- Best Seller -----------------
function BestSellerRow() {
  const items = mockProducts.slice(0, 10)
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="h-5 w-5 text-orange-400" />
        <h2 className="font-bold text-slate-100 tracking-wide">BEST SELLER</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {items.map((p) => (
          <div key={p.id} className="min-w-[220px] max-w-[220px] bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-700 transition">
            <div className="relative">
              <img src={p.image} alt={p.name} className="h-28 w-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] bg-sky-600 text-white">Terlaris</div>
            </div>
            <div className="p-3">
              <div className="font-semibold text-white truncate">{p.name}</div>
              <div className="text-xs text-slate-400">{p.developer}</div>
              <div className="mt-2 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? '' : 'opacity-30'}`} />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sky-400 font-semibold">{currency(p.price)}</div>
                <button className="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold hover:from-sky-500 hover:to-blue-500">Top Up</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ----------------- Catalog -----------------
function Catalog() {
  const [tabIndex, setTabIndex] = useState(0)
  const [limitRows, setLimitRows] = useState(3)
  const active = TABS[tabIndex]

  const data = useMemo(() => {
    return mockProducts.filter((p) => {
      if (active === 'TOPUP') return p.id % 3 === 1
      if (active === 'ACCOUNT') return p.id % 3 === 2
      return p.id % 3 === 0
    })
  }, [active])

  const perRow = 3
  const maxShown = limitRows * perRow
  const shown = data.slice(0, maxShown)

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <button aria-label="Prev" onClick={() => setTabIndex((i) => (i - 1 + TABS.length) % TABS.length)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-200"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex items-center gap-2">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTabIndex(i)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${i === tabIndex ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-[0_0_0_2px_rgba(14,165,233,.3)]' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>
        <button aria-label="Next" onClick={() => setTabIndex((i) => (i + 1) % TABS.length)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-200"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <QuickFilters />

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {shown.map((p) => (
          <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-sky-700 transition">
            <div className="relative">
              <img src={p.image} alt={p.name} className="h-32 md:h-36 w-full object-cover transition duration-300 group-hover:blur-[2px]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <img src={p.logo} alt="logo" className="h-10 w-10 drop-shadow-[0_4px_24px_rgba(14,165,233,.6)]" />
              </div>
              <div className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-white border border-slate-700">Official</div>
            </div>
            <div className="p-3">
              <div className="text-sm text-white font-semibold truncate">{p.name}</div>
              <div className="text-xs text-slate-400">{p.developer}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sky-400 font-semibold">{currency(p.price)}</div>
                <button className="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold hover:from-sky-500 hover:to-blue-500">Lihat</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {shown.length < data.length && (
        <div className="mt-4 text-center">
          <button onClick={() => setLimitRows((r) => r + 2)} className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm font-semibold hover:from-sky-500 hover:to-blue-500 shadow-lg shadow-sky-900/30">Load More...</button>
        </div>
      )}
    </section>
  )
}

// ----------------- Partners / Logo Banner -----------------
function PartnersStrip() {
  // Simple CSS marquee using inline <style>
  return (
    <section className="mt-10">
      <style>{`
        @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
      <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-3 overflow-hidden">
        <div className="whitespace-nowrap flex gap-10" style={{ animation: 'marqueeX 18s linear infinite' }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-300">
              <img src={`https://api.iconify.design/mdi:controller-classic-outline.svg?color=%230ea5e9`} className="h-6 w-6" alt="logo" />
              <span className="font-semibold">VECHNOST</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------- Benefits -----------------
function Benefits() {
  const items = [
    { icon: Zap, title: 'Proses Instan', desc: 'Top up kilat tanpa ribet, langsung masuk.' },
    { icon: ShieldCheck, title: 'Aman Terpercaya', desc: 'Transaksi terenkripsi & garansi layanan.' },
    { icon: Headphones, title: 'Support 24/7', desc: 'Tim CS siap membantu kapan saja.' },
  ]
  return (
    <section className="mt-10 grid sm:grid-cols-3 gap-3">
      {items.map((it) => {
        const Icon = it.icon
        return (
          <div key={it.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-700 grid place-items-center ring-1 ring-slate-700">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">{it.title}</div>
                <div className="text-sm text-slate-400">{it.desc}</div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

// ----------------- Footer -----------------
function Footer() {
  return (
    <footer className="mt-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2 text-white">Tentang VECHNOST</div>
          <p className="text-slate-400">Platform topup, penjualan akun, dan jasa joki game favorit Anda. Harga kompetitif, proses cepat, dan layanan CS responsif.</p>
        </div>
        <div>
          <div className="font-semibold mb-2 text-white">Menu</div>
          <ul className="space-y-1 text-slate-400">
            <li>Home</li>
            <li>Transaction</li>
            <li>Price</li>
            <li>Reseller</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-white">Informasi</div>
          <ul className="space-y-1 text-slate-400">
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
            <li>Bantuan</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-6">© {new Date().getFullYear()} VECHNOST • All rights reserved.</div>
    </footer>
  )
}

// ----------------- Floating CS -----------------
function FloatingCS() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-4 py-2 rounded-full shadow-xl shadow-emerald-900/40"
      aria-label="Hubungi CS via WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-semibold text-sm">WhatsApp</span>
    </a>
  )
}

// ----------------- App -----------------
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [language, setLanguage] = useState(LANGS[0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopInfoBar />
      <Header
        onOpenMenu={() => setMenuOpen(true)}
        onToggleSearch={() => setSearching((v) => !v)}
        searching={searching}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="max-w-6xl mx-auto px-4">
        <div className="mt-6"><AutoSlider /></div>
        <BestSellerRow />
        <Catalog />
        <PartnersStrip />
        <Benefits />
      </main>

      <Footer />
      <FloatingCS />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
