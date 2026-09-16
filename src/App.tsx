import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  Car,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Cog,
  Gauge,
  Handshake,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Clock,
  Settings,
  ShieldCheck,
  Star,
  Wrench,
  X,
} from 'lucide-react';

type Lang = 'cz' | 'ru';
type IconType = typeof Wrench;

const whatsappUrl = 'https://wa.me/420777905432?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20servis.';

const img = {
  hero: 'https://images.pexels.com/photos/7019369/pexels-photo-7019369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  usa: 'https://images.pexels.com/photos/28942186/pexels-photo-28942186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  why: 'https://images.pexels.com/photos/4489776/pexels-photo-4489776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  team: 'https://images.pexels.com/photos/7018506/pexels-photo-7018506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  contact: 'https://images.pexels.com/photos/9572045/pexels-photo-9572045.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gallery: [
    'https://images.pexels.com/photos/7367864/pexels-photo-7367864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6870299/pexels-photo-6870299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4488639/pexels-photo-4488639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/34277923/pexels-photo-34277923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  reviews: [
    'https://images.pexels.com/photos/13058788/pexels-photo-13058788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11189627/pexels-photo-11189627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12658202/pexels-photo-12658202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

const translations = {
  cz: {
    nav: [['Domů', '#domu'], ['Služby', '#sluzby'], ['Auta z USA', '#usa'], ['O nás', '#o-nas'], ['Reference', '#reference'], ['Kontakt', '#kontakt']],
    cta: 'Objednat servis',
    heroLabel: 'Autoservis Fares',
    heroH1: 'SPOLEHLIVÝ SERVIS PRO KAŽDÉ AUTO',
    heroSub: 'Kvalitní servis. Férový přístup. Řešení na míru.',
    heroBtn: 'OBJEDNAT SERVIS',
    heroBtn2: 'NAŠE SLUŽBY',
    heroNote: 'SERVIS • OPRAVY • VOZY Z USA',
    benefits: ['Profesionální přístup', 'Kvalita a zkušenosti', 'Spokojení klienti'],
    svcLabel: 'SLUŽBY',
    svcTitle: 'VŠE PRO VAŠE AUTO',
    svcCards: [
      { num: '01', title: 'DIAGNOSTIKA', text: 'Přesné hledání závad pomocí moderní diagnostiky.', icon: Gauge },
      { num: '02', title: 'MOTORY', text: 'Servis, údržba a opravy motorů různých značek.', icon: Cog },
      { num: '03', title: 'PODVOZEK', text: 'Kompletní kontrola, servis a výměna komponentů.', icon: ShieldCheck },
      { num: '04', title: 'KAROSERIE', text: 'Opravy po nehodách, poškození a další práce s karoserií.', icon: Wrench },
    ],
    svcMore: 'VÍCE INFORMACÍ',
    svcAll: 'VŠECHNY SLUŽBY',
    usaLabel: 'AUTA Z USA',
    usaTitle: 'OD AMERIKY AŽ NA',
    usaTitle2: 'EVROPSKÉ SILNICE',
    usaText: 'Pomáháme s výběrem, dovozem, opravami a úpravami vozů z USA. Zajistíme kompletní proces — od nákupu přes dopravu, přestavbu na evropské standardy až po registraci v ČR.',
    usaBtn: 'VÍCE O AUTECH Z USA',
    whyLabel: 'PROČ FARES',
    whyH1: 'VÍME, CO DĚLÁME.',
    whyH2: 'A DĚLÁME TO POŘÁDNĚ',
    whyFeats: [
      ['ZKUŠENOSTI', 'Zkušený tým a individuální přístup ke každému vozu.', Award],
      ['MODERNÍ VYBAVENÍ', 'Diagnostika a technologie pro moderní automobily.', Cog],
      ['VŠE NA JEDNOM MÍSTĚ', 'Od diagnostiky přes servis až po komplexní opravy.', Car],
      ['FÉROVÉ JEDNÁNÍ', 'Vždy vám řekneme, co je potřeba opravit a proč.', Handshake],
    ] as [string, string, IconType][],
    whyBtn: 'POZNAT NÁŠ TÝM',
    teamLabel: 'O NÁS',
    teamH1: 'ZA FARES',
    teamH2: 'STOJÍ LIDÉ',
    teamSub: 'Zkušenosti, poctivá práce a vztah k tomu, co děláme.',
    teamText: 'Autoservis FARES vznikl z vášně pro auta a touhy dělat věci poctivě. Každému vozu věnujeme pozornost a každému zákazníkovi chceme nabídnout férový přístup a řešení, na které se může spolehnout.',
    teamBtn: 'POZNAT NÁŠ TÝM',
    stats: [['5+', 'ČLENŮ TÝMU', CircleUserRound], ['1000+', 'SPOKOJENÝCH ZÁKAZNÍKŮ', Star], ['10 LET', 'ZKUŠENOSTÍ', Settings], ['PRAHA', 'A OKOLÍ', MapPin]] as [string, string, IconType][],
    workLabel: 'NAŠE PRÁCE',
    workH1: 'PRÁCE, KTERÁ',
    workH2: 'MLUVÍ SAMA ZA SEBE',
    workSub: 'Každý vůz má svůj příběh. My se postaráme o jeho další cestu.',
    workText: 'Od běžného servisu až po náročné opravy a vozy z USA. Děláme práci, na kterou se můžete spolehnout — a výsledky jsou vidět.',
    workBtn: 'ZOBRAZIT VÍCE FOTOGRAFIÍ',
    workItems: ['SERVIS A OPRAVY', 'BRZDY A PODVOZEK', 'DIAGNOSTIKA', 'KAROSERIE'],
    refLabel: 'REFERENCE',
    refH1: 'CO ŘÍKAJÍ',
    refH2: 'NAŠI ZÁKAZNÍCI',
    refBottom: 'PŘES 1000+ SPOKOJENÝCH ZÁKAZNÍKŮ',
    refAllBtn: 'VŠECHNY RECENZE',
    reviews: [
      ['Martin K.', 'BMW 5', 'Rychlá domluva, férové jednání a skvěle odvedená práce. Auto jezdí jako nové.'],
      ['Jan P.', 'Ford Mustang', 'Potřeboval jsem opravit auto po nehodě. Všechno vyřešili od začátku do konce. Doporučuji.'],
      ['Petr S.', 'Audi Q7', 'Velmi profesionální přístup a ochota vše vysvětlit. Určitě se vrátím.'],
    ],
    ctaLabel: 'KONTAKT',
    ctaH1: 'POTŘEBUJETE SERVIS?',
    ctaH2: 'NAPIŠTE NÁM',
    ctaSub: 'Domluvíme termín a postaráme se o vaše auto.',
    ctaPhone: 'TELEFON',
    ctaAddr: 'ADRESA',
    ctaHours: 'OTEVÍRACÍ DOBA',
    ctaAddrVal: 'Praha, Česká republika',
    ctaHoursVal: 'Po–Pá 9:00–18:00',
    ctaVisit: 'TĚŠÍME SE NA VAŠI NÁVŠTĚVU.',
    footer: '© 2026 FARES s.r.o.',
    langAria: 'Přepnout jazyk',
    menuAria: 'Otevřít menu',
  },
  ru: {
    nav: [['Главная', '#domu'], ['Услуги', '#sluzby'], ['Авто из США', '#usa'], ['О нас', '#o-nas'], ['Отзывы', '#reference'], ['Контакты', '#kontakt']],
    cta: 'Записаться в сервис',
    heroLabel: 'Автосервис Fares',
    heroH1: 'НАДЕЖНЫЙ СЕРВИС ДЛЯ КАЖДОГО АВТО',
    heroSub: 'Качественный сервис. Честный подход. Индивидуальные решения.',
    heroBtn: 'ЗАПИСАТЬСЯ В СЕРВИС',
    heroBtn2: 'НАШИ УСЛУГИ',
    heroNote: 'СЕРВИС • РЕМОНТ • АВТО ИЗ США',
    benefits: ['Профессиональный подход', 'Качество и опыт', 'Довольные клиенты'],
    svcLabel: 'УСЛУГИ',
    svcTitle: 'ВСЁ ДЛЯ ВАШЕГО АВТО',
    svcCards: [
      { num: '01', title: 'ДИАГНОСТИКА', text: 'Точная диагностика неисправностей с помощью современного оборудования.', icon: Gauge },
      { num: '02', title: 'МОТОРЫ', text: 'Обслуживание и ремонт двигателей разных марок.', icon: Cog },
      { num: '03', title: 'ХОДОВАЯ ЧАСТЬ', text: 'Полный контроль, ремонт и замена компонентов.', icon: ShieldCheck },
      { num: '04', title: 'КУЗОВНОЙ РЕМОНТ', text: 'Ремонт после аварий и любые кузовные работы.', icon: Wrench },
    ],
    svcMore: 'ПОДРОБНЕЕ',
    svcAll: 'ВСЕ УСЛУГИ',
    usaLabel: 'АВТО ИЗ США',
    usaTitle: 'ОТ АМЕРИКИ ДО',
    usaTitle2: 'ЕВРОПЕЙСКИХ ДОРОГ',
    usaText: 'Помогаем с подбором, доставкой, ремонтом и доработкой авто из США. Обеспечиваем полный процесс — от покупки через доставку, адаптацию под стандарты ЕС до регистрации в ЧР.',
    usaBtn: 'ПОДРОБНЕЕ ОБ АВТО ИЗ США',
    whyLabel: 'ПОЧЕМУ FARES',
    whyH1: 'МЫ ЗНАЕМ, ЧТО ДЕЛАЕМ.',
    whyH2: 'И ДЕЛАЕМ ЭТО КАЧЕСТВЕННО',
    whyFeats: [
      ['ОПЫТ', 'Опытная команда и индивидуальный подход к каждому авто.', Award],
      ['СОВРЕМЕННОЕ ОБОРУДОВАНИЕ', 'Диагностика и технологии для современных автомобилей.', Cog],
      ['ВСЁ В ОДНОМ МЕСТЕ', 'От диагностики и сервиса до комплексного ремонта.', Car],
      ['ЧЕСТНОЕ ОТНОШЕНИЕ', 'Всегда объясним, что нужно ремонтировать и почему.', Handshake],
    ] as [string, string, IconType][],
    whyBtn: 'ПОЗНАКОМИТЬСЯ С КОМАНДОЙ',
    teamLabel: 'О НАС',
    teamH1: 'ЗА FARES',
    teamH2: 'СТОЯТ ЛЮДИ',
    teamSub: 'Опыт, честная работа и любовь к своему делу.',
    teamText: 'Автосервис FARES создан из любви к автомобилям и желания делать всё качественно. Мы уделяем внимание каждому автомобилю и предлагаем каждому клиенту честный подход и решение, на которое можно положиться.',
    teamBtn: 'ПОЗНАКОМИТЬСЯ С КОМАНДОЙ',
    stats: [['5+', 'ЧЛЕНОВ КОМАНДЫ', CircleUserRound], ['1000+', 'ДОВОЛЬНЫХ КЛИЕНТОВ', Star], ['10 ЛЕТ', 'ОПЫТА', Settings], ['ПРАГА', 'И ОКРЕСТНОСТИ', MapPin]] as [string, string, IconType][],
    workLabel: 'НАШИ РАБОТЫ',
    workH1: 'РАБОТА, КОТОРАЯ',
    workH2: 'ГОВОРИТ САМА ЗА СЕБЯ',
    workSub: 'У каждого автомобиля своя история. Мы позаботимся о его дальнейшем пути.',
    workText: 'От обычного сервиса до сложного ремонта и авто из США. Мы делаем работу, которой можно доверять — результат виден.',
    workBtn: 'ПОКАЗАТЬ БОЛЬШЕ ФОТО',
    workItems: ['СЕРВИС И РЕМОНТ', 'ТОРМОЗА И ХОДОВАЯ', 'ДИАГНОСТИКА', 'КУЗОВ'],
    refLabel: 'ОТЗЫВЫ',
    refH1: 'ЧТО ГОВОРЯТ',
    refH2: 'НАШИ КЛИЕНТЫ',
    refBottom: 'БОЛЕЕ 1000+ ДОВОЛЬНЫХ КЛИЕНТОВ',
    refAllBtn: 'ВСЕ ОТЗЫВЫ',
    reviews: [
      ['Мартин К.', 'BMW 5', 'Быстрая договоренность, честный подход и отлично выполненная работа. Машина ездит как новая.'],
      ['Ян П.', 'Ford Mustang', 'Нужно было отремонтировать авто после аварии. Всё решили от начала до конца. Рекомендую.'],
      ['Петр С.', 'Audi Q7', 'Очень профессиональный подход и готовность всё объяснить. Обязательно вернусь.'],
    ],
    ctaLabel: 'КОНТАКТЫ',
    ctaH1: 'НУЖЕН СЕРВИС?',
    ctaH2: 'НАПИШИТЕ НАМ',
    ctaSub: 'Договоримся о времени и позаботимся о вашем авто.',
    ctaPhone: 'ТЕЛЕФОН',
    ctaAddr: 'АДРЕС',
    ctaHours: 'ВРЕМЯ РАБОТЫ',
    ctaAddrVal: 'Прага, Чешская Республика',
    ctaHoursVal: 'Пн–Пт 9:00–18:00',
    ctaVisit: 'ЖДЁМ ВАШЕГО ВИЗИТА.',
    footer: '© 2026 FARES s.r.o.',
    langAria: 'Переключить язык',
    menuAria: 'Открыть меню',
  },
};

const Accent = ({ color = 'red' }: { color?: 'red' | 'white' }) => (
  <span className={`ml-2 inline-block h-3 w-3 ${color === 'red' ? 'bg-red-600' : 'bg-white'}`} />
);

function RuleLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.35em] text-red-600">
      <span>{children}</span>
      <span className="h-px w-16 bg-red-600" />
    </div>
  );
}

function Logo() {
  return (
    <a href="#domu" className="flex items-center gap-3" aria-label="Autoservis Fares">
      <div className="h-10 w-16">
        <svg viewBox="0 0 90 48" className="h-full w-full" aria-hidden="true">
          <path d="M5 34c7-9 17-12 27-12l8-11c6-6 22-7 32-3l12 7h5c2 0 3 2 1 4l-7 4c-3 8-10 12-20 12H15c-5 0-8-1-10-1Z" fill="none" stroke="#dc2626" strokeWidth="2" />
          <path d="M38 21c7 0 17 0 25 2M48 10l5 10M8 35h74" stroke="#f4f4f5" strokeWidth="1.4" fill="none" />
          <circle cx="25" cy="35" r="5" fill="#0a0a0a" stroke="#f4f4f5" strokeWidth="1.5" />
          <circle cx="71" cy="35" r="5" fill="#0a0a0a" stroke="#f4f4f5" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="hidden leading-[1.3] sm:block">
        <strong className="block font-display text-sm tracking-[0.08em]">
          AUTOSERVIS <em className="not-italic text-red-600">FARES</em>
        </strong>
        <small className="mt-1 block text-[7px] tracking-[0.18em] text-zinc-500">Servis • Opravy • Vozy z USA</small>
      </span>
    </a>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('cz');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const tr = translations[lang];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveGallery((current) => (current + 1) % img.gallery.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0c0e] text-zinc-100">
      {/* ——— HEADER ——— */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0c0e]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {tr.nav.map(([label, href]) => (
              <a key={href} href={href} className="group relative text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 transition hover:text-white">
                {label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-[10px] font-bold sm:flex">
              <button type="button" onClick={() => setLang('cz')} className={lang === 'cz' ? 'text-white' : 'text-zinc-500 hover:text-white'}>CZ</button>
              <span className="text-zinc-700">|</span>
              <button type="button" onClick={() => setLang('ru')} className={lang === 'ru' ? 'text-white' : 'text-zinc-500 hover:text-white'}>RU</button>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden bg-red-600 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition hover:bg-red-500 sm:block">{tr.cta}</a>
            <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="flex h-11 w-11 items-center justify-center border border-white/15 lg:hidden" aria-label={tr.menuAria}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="grid border-t border-white/10 bg-[#0a0c0e] px-5 py-4 lg:hidden">
            {tr.nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="border-b border-white/10 py-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">{label}</a>
            ))}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs font-bold">
              <button type="button" onClick={() => { setLang('cz'); setMobileOpen(false); }} className={lang === 'cz' ? 'text-white' : 'text-zinc-500'}>CZ</button>
              <span className="text-zinc-700">|</span>
              <button type="button" onClick={() => { setLang('ru'); setMobileOpen(false); }} className={lang === 'ru' ? 'text-white' : 'text-zinc-500'}>RU</button>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 bg-red-600 px-4 py-4 text-center text-xs font-bold uppercase">{tr.cta}</a>
          </nav>
        )}
      </header>

      <main>
        {/* ——— BLOCK 1: HERO (Dark) ——— */}
        <section id="domu" className="relative border-b border-white/10 bg-[#0a0c0e] pt-20">
          <div className="mx-auto grid max-w-[1280px] items-start gap-8 px-5 pb-0 pt-6 sm:pt-8 lg:min-h-[628px] lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-0">
            <div className="flex self-stretch flex-col justify-center py-6 lg:h-[628px] lg:translate-y-24 lg:py-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-600">{tr.heroLabel}</p>
              <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">{tr.heroH1}</h1>
              <p className="mt-7 text-base text-zinc-400">{tr.heroSub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition hover:bg-red-500">{tr.heroBtn} <ArrowRight size={15} /></a>
                <a href="#sluzby" className="inline-flex min-h-12 items-center gap-4 border border-zinc-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition hover:border-white">{tr.heroBtn2} <ArrowRight size={15} /></a>
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">Servis <span className="text-red-600">&bull;</span> Opravy <span className="text-red-600">&bull;</span> Vozy z USA</p>
            </div>
            <div className="relative hidden self-start overflow-hidden lg:block">
              <img src={img.hero} alt="" className="block h-auto w-full object-contain object-top" />
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#0a0c0e] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0c0e] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0c0e] to-transparent" />
            </div>
          </div>
          {/* Benefits strip */}
          <div className="border-t border-white/10 bg-[#0d0f12]">
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-0 sm:grid-cols-3">
              {([Settings, ShieldCheck, CircleUserRound] as IconType[]).map((Icon, i) => (
                <div key={tr.benefits[i]} className={`flex items-center gap-6 px-6 py-8 lg:px-10 lg:py-10 ${i > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}>
                  <Icon size={36} className="shrink-0 text-red-600" strokeWidth={1.3} />
                  <span className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-300">{tr.benefits[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— BLOCK 2: SERVICES (Light) ——— */}
        <section id="sluzby" className="bg-zinc-50 py-24 text-zinc-900 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <RuleLabel>{tr.svcLabel}</RuleLabel>
            <h2 className="mt-6 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
              {tr.svcTitle}<Accent color="red" />
            </h2>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tr.svcCards.map((c) => (
                <article key={c.num} className="group flex flex-col border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:border-red-600 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-zinc-200">{c.num}</span>
                    <c.icon className="text-red-600" size={26} strokeWidth={1.6} />
                  </div>
                  <span className="my-5 block h-px w-10 bg-red-600" />
                  <h3 className="font-display text-xl font-bold uppercase leading-[1.3]">{c.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600">{c.text}</p>
                  <a href="#kontakt" className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-900 transition hover:text-red-600">
                    {tr.svcMore} <ArrowRight size={13} />
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <a href="#kontakt" className="inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-red-500">{tr.svcAll} <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 3: USA CARS (Dark) ——— */}
        <section id="usa" className="relative min-h-[680px] overflow-hidden border-y border-white/10">
          <img src={img.usa} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a0c] via-[#080a0c]/80 to-transparent" />
          <div className="relative mx-auto flex min-h-[680px] max-w-[1280px] items-center px-5 py-24 lg:px-8">
            <div>
              <RuleLabel>{tr.usaLabel}</RuleLabel>
              <h2 className="mt-8 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
                {tr.usaTitle} <span className="text-red-600">{tr.usaTitle2}</span><Accent color="white" />
              </h2>
              <p className="mt-7 text-lg leading-7 text-zinc-300">{tr.usaText}</p>
              <a href="#kontakt" className="mt-8 inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-red-500">{tr.usaBtn} <ArrowRight size={15} /></a>
              <p className="mt-20 text-[10px] font-bold uppercase leading-[2] tracking-[0.35em] text-zinc-600">AMERICAN CARS<br />EUROPEAN ROADS</p>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 4: WHY US (Split 50/50) ——— */}
        <section id="pro-nas" className="grid min-h-[700px] grid-cols-1 border-b border-white/10 lg:grid-cols-2">
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-0">
            <img src={img.why} alt="" className="h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="font-display text-4xl font-bold text-white/70">FARES</span>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">VÍCE NEŽ SERVIS.<br />DLOUHODOBÁ DŮVĚRA.</p>
            </div>
            <div className="absolute right-6 top-6 text-right text-[9px] font-bold uppercase leading-[2] tracking-[0.2em] text-zinc-400">
              SERVIS<br />OPRAVY<br />VOZY Z USA
              <span className="mt-2 ml-auto block h-px w-10 bg-red-600" />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-zinc-50 px-6 py-20 text-zinc-900 lg:px-16 lg:py-24">
            <RuleLabel>{tr.whyLabel}</RuleLabel>
            <h2 className="mt-7 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
              {tr.whyH1} <span className="text-red-600">{tr.whyH2}</span><Accent color="white" />
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {tr.whyFeats.map(([title, text, Icon], i) => (
                <div key={title} className="relative pl-14">
                  <span className="absolute left-0 top-0 font-display text-5xl font-bold text-zinc-200">0{i + 1}</span>
                  <Icon className="mb-3 text-red-600" size={24} strokeWidth={1.6} />
                  <h3 className="font-display text-base font-bold uppercase leading-[1.3]">{title}</h3>
                  <span className="my-3 block h-px w-8 bg-red-600" />
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </div>
              ))}
            </div>
            <a href="#o-nas" className="mt-10 inline-flex min-h-12 w-fit items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-red-500">{tr.whyBtn} <ArrowRight size={15} /></a>
            <div className="mt-10 flex items-center justify-between border-t border-zinc-300 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Servis <i className="mx-2 text-red-600">•</i> Opravy <i className="mx-2 text-red-600">•</i> Vozy z USA</span>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 5: TEAM (Dark) ——— */}
        <section id="o-nas" className="relative min-h-[780px] overflow-hidden border-b border-white/10">
          <img src={img.team} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b0d] via-[#090b0d]/70 to-transparent" />
          <div className="relative mx-auto min-h-[780px] max-w-[1280px] px-5 py-24 lg:px-8">
            <div>
              <RuleLabel>{tr.teamLabel}</RuleLabel>
              <h2 className="mt-7 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
                {tr.teamH1} <span className="text-red-600">{tr.teamH2}</span><Accent color="white" />
              </h2>
              <p className="mt-8 text-xl leading-snug text-zinc-200">{tr.teamSub}</p>
              <p className="mt-5 text-sm leading-6 text-zinc-400">{tr.teamText}</p>
              <a href="#kontakt" className="mt-8 inline-flex min-h-12 items-center gap-4 border border-zinc-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition hover:border-white">{tr.teamBtn} <ArrowRight size={15} /></a>
            </div>
            <div className="absolute inset-x-5 bottom-8 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4 lg:inset-x-8">
              {tr.stats.map(([value, label, Icon]) => (
                <div key={label}>
                  <Icon className="mb-3 text-white" size={24} strokeWidth={1.4} />
                  <strong className="block font-display text-2xl font-bold sm:text-3xl">{value}</strong>
                  <span className="mt-1 block max-w-[140px] text-[10px] font-bold uppercase leading-5 tracking-[0.14em] text-zinc-400">{label}</span>
                  <span className="mt-3 block h-px w-8 bg-red-600" />
                </div>
              ))}
            </div>
            <div className="absolute right-6 top-28 hidden text-right text-[9px] font-bold uppercase leading-[2] tracking-[0.2em] text-zinc-500 lg:block">
              SERVIS<br />OPRAVY<br />VOZY Z USA
              <span className="mt-2 ml-auto block h-px w-10 bg-red-600" />
            </div>
          </div>
        </section>

        {/* ——— BLOCK 6: GALLERY (Dark) ——— */}
        <section id="prace" className="border-b border-white/10 bg-[#0d1013] py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <RuleLabel>{tr.workLabel}</RuleLabel>
                <h2 className="mt-7 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
                  {tr.workH1} <span className="text-red-600">{tr.workH2}</span><Accent color="white" />
                </h2>
                <p className="mt-6 text-xl text-zinc-300">{tr.workSub}</p>
              </div>
              <p className="border-l border-zinc-600 pl-6 text-sm leading-6 text-zinc-400">{tr.workText}</p>
            </div>
            <div className="mt-12 grid h-[520px] grid-cols-2 gap-2 sm:h-[560px] sm:grid-cols-4 lg:h-[560px] lg:grid-cols-[2.6fr_0.8fr_0.8fr_0.8fr]">
              {[activeGallery, ...img.gallery.map((_, index) => index).filter((index) => index !== activeGallery)].map((galleryIndex, position) => {
                const isActive = position === 0;

                return (
                  <div key={img.gallery[galleryIndex]} className={`gallery-panel group relative overflow-hidden ${isActive ? 'col-span-2 lg:col-span-1' : 'col-span-1'}`}>
                    <img src={img.gallery[galleryIndex]} alt="" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${isActive ? 'gallery-active-image' : ''}`} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-4 pt-24 sm:p-6 sm:pt-28">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-red-600">0{galleryIndex + 1} / 04</span>
                      <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.08em] sm:text-base">{tr.workItems[galleryIndex]}</p>
                      <span className="mt-3 block h-px w-8 bg-white/70" />
                    </div>
                    {isActive && (
                      <div className="absolute bottom-6 right-6 flex items-center gap-2">
                        <button type="button" onClick={() => setActiveGallery((activeGallery - 1 + img.gallery.length) % img.gallery.length)} aria-label="Předchozí fotografie" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition hover:border-white hover:bg-red-600">
                          <ChevronLeft size={17} />
                        </button>
                        <button type="button" onClick={() => setActiveGallery((activeGallery + 1) % img.gallery.length)} aria-label="Další fotografie" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition hover:border-white hover:bg-red-600">
                          <ChevronRight size={17} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <a href="#kontakt" className="inline-flex min-h-12 items-center gap-4 border border-zinc-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition hover:border-white">{tr.workBtn} <ArrowRight size={15} /></a>
              <div className="flex items-center gap-2">
                {img.gallery.map((src, index) => (
                  <button key={src} type="button" onClick={() => setActiveGallery(index)} aria-label={`Fotografie ${index + 1}`} className={`h-1 transition-all duration-300 ${activeGallery === index ? 'w-10 bg-red-600' : 'w-5 bg-zinc-600 hover:bg-zinc-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 7: REVIEWS (Light bg, Dark cards) ——— */}
        <section id="reference" className="bg-zinc-100 py-24 text-zinc-900 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <RuleLabel>{tr.refLabel}</RuleLabel>
            <h2 className="mt-6 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
              {tr.refH1} <span className="text-red-600">{tr.refH2}</span><Accent color="red" />
            </h2>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {tr.reviews.map(([name, car, text], i) => (
                <article key={name} className="flex flex-col bg-zinc-900 text-white">
                  <div className="relative h-44 overflow-hidden">
                    <img src={img.reviews[i]} alt={car} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900 to-transparent p-4 pt-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">{car}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="fill-red-600 text-red-600" />
                      ))}
                    </div>
                    <span className="font-display text-4xl leading-[1.3] text-red-600">"</span>
                    <p className="mt-2 flex-1 text-sm leading-6 text-zinc-300">{text}</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <CircleUserRound size={24} className="text-zinc-500" />
                      <span className="font-display text-sm font-bold uppercase">{name}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-300 pt-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex h-8 w-8 items-center justify-center border-2 border-zinc-100 bg-zinc-300"><CircleUserRound size={16} className="text-zinc-500" /></div>
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-600">{tr.refBottom}</span>
              </div>
              <a href="#kontakt" className="inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-red-500">{tr.refAllBtn} <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 8: CONTACT (Dark) ——— */}
        <section id="kontakt" className="border-t border-white/10 bg-[#0a0c0e] py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <RuleLabel>{tr.ctaLabel}</RuleLabel>
                <h2 className="mt-7 font-display text-6xl font-bold uppercase leading-[1.3] tracking-normal md:text-7xl lg:text-8xl">
                  {tr.ctaH1} <span className="text-red-600">{tr.ctaH2}</span><Accent color="white" />
                </h2>
                <p className="mt-6 text-lg text-zinc-300">{tr.ctaSub}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 bg-red-600 px-6 text-xs font-bold uppercase transition hover:bg-red-500">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href="tel:+420777905432" className="inline-flex min-h-12 items-center gap-3 border border-zinc-600 px-6 text-xs font-bold uppercase transition hover:border-white">
                    <Phone size={16} /> {tr.cta}
                  </a>
                </div>
                <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{tr.ctaPhone}</span>
                    <a href="tel:+420777905432" className="mt-2 block text-sm font-bold text-white hover:text-red-600">+420 777 905 432</a>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{tr.ctaAddr}</span>
                    <p className="mt-2 text-sm font-bold text-white">{tr.ctaAddrVal}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{tr.ctaHours}</span>
                    <p className="mt-2 text-sm font-bold text-white">{tr.ctaHoursVal}</p>
                  </div>
                </div>
                <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">{tr.ctaVisit}</p>
              </div>
              <div className="relative min-h-[340px] overflow-hidden border border-white/10 lg:min-h-[480px]">
                <img src={img.contact} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e]/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-display text-3xl font-bold text-white/70">FARES</span>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">Servis • Opravy • Vozy z USA</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ——— FOOTER ——— */}
      <footer className="border-t border-white/10 bg-[#080a0c]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Logo />
          <nav className="hidden flex-wrap gap-6 lg:flex">
            {tr.nav.map(([label, href]) => (
              <a key={href} href={href} className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500 transition hover:text-white">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/autoservisfares" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-zinc-400 transition hover:text-red-600"><Instagram size={18} /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-zinc-400 transition hover:text-red-600"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/10 px-5 py-6 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>{tr.footer}</span>
          <span className="text-zinc-500">Servis <i className="mx-1 text-red-600">•</i> Opravy <i className="mx-1 text-red-600">•</i> Vozy z USA</span>
        </div>
      </footer>
    </div>
  );
}
