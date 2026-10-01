

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
  Settings,
  ShieldCheck,
  Star,
  Wrench,
  X,
} from 'lucide-react';

type Lang = 'cz' | 'ru';
type IconType = typeof Wrench;

const whatsappUrl = 'https://wa.me/420777905432?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20servis.';
const usaWhatsappUrl = 'https://wa.me/420777905432?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20dotaz%20ohledn%C4%9B%20auta%20z%20USA.';
const googleReviewUrl = 'https://www.google.com/maps?q=Autoservis+Fares,+Palack%C3%A9ho+3%2F4,+277+11+Neratovice&review=write';

const servicePriceGroups = {
  cz: [
    { title: 'OPRAVY A ÚDRŽBA', items: [['Práce mechanika', '970 Kč / HOD'], ['Diagnostika vozidla', '600 Kč'], ['Při následné opravě u nás', 'ZDARMA'], ['Výměna oleje', 'OD 800 Kč'], ['Výměna brzdových kotoučů', 'OD 1 200 Kč'], ['Výměna tlumiče', 'OD 1 200 Kč'], ['Výměna spojky', 'OD 5 000 Kč'], ['Výměna oleje v automatické převodovce', 'OD 1 500 Kč'], ['Výměna rozvodové sady', 'OD 4 500 Kč'], ['Oprava podvozku', 'OD 1 500 Kč']] },
    { title: 'PNEUSERVIS', items: [['Pneuservis', 'OD 800 Kč']] },
    { title: 'KLIMATIZACE', items: [['Připojení zařízení pro plnění klimatizace', '600 Kč'], ['Náplň klimatizace', 'ÚČTUJE SE ZVLÁŠŤ']] },
    { title: 'KAROSÁŘSKÉ PRÁCE', items: [['Karosářské práce', '970 Kč / HOD'], ['Úprava zadních světel', 'OD 16 000 Kč']] },
  ],
  ru: [
    { title: 'РЕМОНТ И ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ', items: [['Работа механика', '970 Kč / ЧАС'], ['Диагностика автомобиля', '600 Kč'], ['При последующем ремонте у нас', 'БЕСПЛАТНО'], ['Замена масла', 'ОТ 800 Kč'], ['Замена тормозных дисков', 'ОТ 1 200 Kč'], ['Замена амортизатора', 'ОТ 1 200 Kč'], ['Замена сцепления', 'ОТ 5 000 Kč'], ['Замена масла в АКПП', 'ОТ 1 500 Kč'], ['Замена комплекта ГРМ', 'ОТ 4 500 Kč'], ['Ремонт ходовой части', 'ОТ 1 500 Kč']] },
    { title: 'ШИНОМОНТАЖ', items: [['Шиномонтаж', 'ОТ 800 Kč']] },
    { title: 'КОНДИЦИОНЕР', items: [['Подключение оборудования для заправки кондиционера', '600 Kč'], ['Заправка кондиционера', 'ОПЛАЧИВАЕТСЯ ОТДЕЛЬНО']] },
    { title: 'КУЗОВНЫЕ РАБОТЫ', items: [['Кузовные работы', '970 Kč / ЧАС'], ['Переделка задних фонарей', 'ОТ 16 000 Kč']] },
  ],
} as const;

const avatars = [
  'https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
  'https://images.pexels.com/photos/13430313/pexels-photo-13430313.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
  'https://images.pexels.com/photos/15019490/pexels-photo-15019490.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
  'https://images.pexels.com/photos/35367077/pexels-photo-35367077.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
  'https://images.pexels.com/photos/29615996/pexels-photo-29615996.png?auto=compress&cs=tinysrgb&h=100&w=100',
  'https://images.pexels.com/photos/16160801/pexels-photo-16160801.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
];

const img = {
  hero: 'https://images.pexels.com/photos/15489246/pexels-photo-15489246.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
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
    'https://images.unsplash.com/photo-1731673289078-5a4b9295356e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29sa3N3YWdlbiUyMGdvbGZ8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1663433340126-1868f62ca7a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym13JTIwNXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1591293836027-e05b48473b67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D',
  ],
};

const translations = {
  cz: {
    nav: [['Domů', '#domu'], ['Služby', '#sluzby'], ['Auta z USA', '#usa'], ['O nás', '#o-nas'], ['Reference', '#reference'], ['Kontakt', '#kontakt']],
    cta: 'Objednat servis',
    phoneCta: 'Zavolat',
    heroLabel: 'Autoservis Fares',
    heroH1: 'SPOLEHLIVÝ SERVIS PRO KAŽDÉ AUTO',
    heroSub: 'Kvalitní servis. Férový přístup. Řešení na míru.',
    heroBtn: 'OBJEDNAT SERVIS',
    heroBtn2: 'NAŠE SLUŽBY',
    heroNote: 'SERVIS • OPRAVY • VOZY Z USA',
    usaRoads: 'AMERICKÉ VOZY • EVROPSKÉ SILNICE',
    trustLine: 'VÍCE NEŽ SERVIS. DLOUHODOBÁ DŮVĚRA.',
    brandLine: 'SERVIS • OPRAVY • VOZY Z USA',
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
    servicesTitle: 'CENÍK NAŠICH SLUŽEB',
    servicesSubtitle: 'Ceny jsou orientační a mohou se lišit podle typu vozu a rozsahu práce.',
    servicesNote: 'Potřebujete přesnou kalkulaci? Napište nám nebo zavolejte.',
    servicesClose: 'Zavřít',
    usaLabel: 'AUTA Z USA',
    usaTitle: 'OD AMERIKY AŽ NA',
    usaTitle2: 'EVROPSKÉ SILNICE',
    usaText: 'Pomáháme s výběrem, dovozem, opravami a úpravami vozů z USA. Zajistíme kompletní proces — od nákupu přes dopravu, přestavbu na evropské standardy až po registraci v ČR.',
    usaBtn: 'VÍCE O AUTECH Z USA',
    usaModalTitle: 'PŘESTAVBA A ÚPRAVA VOZŮ Z USA',
    usaModalIntro: 'Specializujeme se na vozy dovezené z USA a kompletně je přizpůsobujeme požadavkům evropských norem.',
    usaModalItems: [
      'Kompletní adaptace vozu pro EU — výměna a nastavení světlometů, zadních světel, směrovek a dalších prvků osvětlení podle evropských požadavků.',
      'Technická příprava a dovybavení vozu pro absolvování potřebných kontrol a registraci v České republice.',
      'Registrace vozu a vyřízení českých registračních značek — pomůžeme projít všemi potřebnými kroky.',
      'Pomoc s nákupem vozu na aukci v USA — prostřednictvím ověřených partnerů pomůžeme s výběrem, účastí na aukci a dopravou do ČR.',
      'Opravy vozů po nehodě — karosářské práce, výměna poškozených dílů, opravy a diagnostika.',
      'Příprava vozu na klíč — od poškozeného nebo právě dovezeného vozu až po automobil připravený k provozu podle požadavků EU.',
    ],
    usaModalResult: 'Výsledkem je vůz kompletně připravený k provozu a registraci v České republice.',
    usaModalCta: 'ZÍSKAT KONZULTACI',
    usaModalClose: 'Zavřít detail vozů z USA',
    whyLabel: 'PROČ FARES',
    whyH1: 'VÍME, CO DĚLÁME.',
    whyH2: 'A DĚLÁME TO POŘÁDNĚ',
    whySub: 'Férový přístup, moderní technologie a řešení, na která se můžete spolehnout.',
    whyFeats: [
      ['KOMPLEXNÍ SERVIS', 'Od diagnostiky a běžného servisu až po náročné opravy a kompletní renovace vozu.', Award],
      ['MODERNÍ DIAGNOSTIKA', 'Používáme moderní technologie a vybavení pro přesnou diagnostiku a opravy současných automobilů.', Cog],
      ['AMERICKÉ VOZY', 'Specializujeme se na vozy dovezené z USA — jejich úpravu podle evropských standardů, opravy, registraci i přípravu na provoz v ČR.', Car],
      ['ŘEŠENÍ NA MÍRU', 'Neřešíme jen samotný problém. Hledáme jeho příčinu a doporučíme řešení, které dává smysl z hlediska kvality, spolehlivosti i ceny.', Handshake],
    ] as [string, string, IconType][],
    teamLabel: 'O NÁS',
    teamH1: 'NAŠE',
    teamH2: 'CESTA',
    teamSub: 'Začalo to zájmem o auta a chutí dělat věci pořádně. Postupně jsme rostli, získávali zkušenosti a vybudovali servis, který dnes stojí na kvalitě, pečlivosti a individuálním přístupu.',
    teamText: 'Stejnou pozornost věnujeme každému zákazníkovi. Vždy hledáme řešení, které dává smysl — spolehlivé, efektivní a odpovídající jeho potřebám i rozpočtu.',
    teamBtn: 'POZNAT NÁŠ TÝM',
    stats: [['5+', 'ČLENŮ TÝMU', CircleUserRound], ['10000+', 'ZÁKAZNÍKŮ', Star], ['5+ let', 'ZKUŠENOSTÍ', Settings], ['PRAHA | NERATOVICE', 'A OKOLÍ', MapPin]] as [string, string, IconType][],
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
    refBottom: 'PŘES 10 000 SPOKOJENÝCH ZÁKAZNÍKŮ',
    refAllBtn: 'ZANECHAT RECENZI',
    reviews: [
      ['Pavel Arasov', 'VW Golf', 'Jsem spokojený se servisem, obsluha je na vysoké úrovni a přístup k zákazníkům je skvělý. Auto u nich servisuji už poněkolikáté! Doporučuji.'],
      ['Julia Tsoy', 'BMW 5', 'Neustále servisuji v tomto autoservisu — vždy vše na úrovni. Pracují rychle, pečlivě a bez zbytečného nabízení. Ceny jsou adekvátní, přístup k zákazníkovi je skvělý. Klidně můžete svěřit své auto. Doporučuji!'],
      ['Dastan Mamatov', 'Ford Mustang', 'Skvělý autoservis! Vše udělali rychle a kvalitně, bez vnucování zbytečných služeb. Kluci vědí, co dělají, a vše srozumitelně vysvětlí. Jsem velmi spokojený a budu se vracet. Doporučuji.'],
    ],
    ctaLabel: 'KONTAKT',
    ctaH1: 'POTŘEBUJETE SERVIS?',
    ctaH2: 'NAPIŠTE NÁM',
    ctaSub: 'Domluvíme termín a postaráme se o vaše auto.',
    ctaPhone: 'TELEFON',
    ctaAddr: 'ADRESA',
    ctaHours: 'OTEVÍRACÍ DOBA',
    ctaAddrVal: 'Palackého 3/4, 277 11 Neratovice',
    ctaHoursVal: 'Po–Pá 9:00–18:00',
    ctaVisit: 'TĚŠÍME SE NA VAŠI NÁVŠTĚVU.',
    footer: '© 2026 FARES s.r.o.',
    footerAddr: 'Palackého 3/4, 277 11 Neratovice',
    footerPhone: '+420 777 905 432',
    langAria: 'Přepnout jazyk',
    menuAria: 'Otevřít menu',
  },
  ru: {
    nav: [['Главная', '#domu'], ['Услуги', '#sluzby'], ['Авто из США', '#usa'], ['О нас', '#o-nas'], ['Отзывы', '#reference'], ['Контакты', '#kontakt']],
    cta: 'Записаться в сервис',
    phoneCta: 'Позвонить',
    heroLabel: 'Автосервис Fares',
    heroH1: 'НАДЕЖНЫЙ СЕРВИС ДЛЯ КАЖДОГО АВТО',
    heroSub: 'Качественный сервис. Честный подход. Индивидуальные решения.',
    heroBtn: 'ЗАПИСАТЬСЯ В СЕРВИС',
    heroBtn2: 'НАШИ УСЛУГИ',
    heroNote: 'СЕРВИС • РЕМОНТ • АВТО ИЗ США',
    usaRoads: 'АМЕРИКАНСКИЕ АВТО • ЕВРОПЕЙСКИЕ ДОРОГИ',
    trustLine: 'БОЛЬШЕ, ЧЕМ СЕРВИС. ДОЛГОВРЕМЕННОЕ ДОВЕРИЕ.',
    brandLine: 'СЕРВИС • РЕМОНТ • АВТО ИЗ США',
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
    servicesTitle: 'ПРАЙС-ЛИСТ НАШИХ УСЛУГ',
    servicesSubtitle: 'Цены являются ориентировочными и могут отличаться в зависимости от модели автомобиля и объёма работ.',
    servicesNote: 'Нужен точный расчёт? Напишите нам или позвоните.',
    servicesClose: 'Закрыть',
    usaLabel: 'АВТО ИЗ США',
    usaTitle: 'ОТ АМЕРИКИ ДО',
    usaTitle2: 'ЕВРОПЕЙСКИХ ДОРОГ',
    usaText: 'Помогаем с подбором, доставкой, ремонтом и доработкой авто из США. Обеспечиваем полный процесс — от покупки через доставку, адаптацию под стандарты ЕС до регистрации в ЧР.',
    usaBtn: 'ПОДРОБНЕЕ ОБ АВТО ИЗ США',
    usaModalTitle: 'ПЕРЕОБОРУДОВАНИЕ И АДАПТАЦИЯ АВТО ИЗ США',
    usaModalIntro: 'Мы специализируемся на работе с автомобилями, привезёнными из США, и полностью адаптируем их под требования европейских стандартов.',
    usaModalItems: [
      'Полная адаптация автомобиля под ЕС — замена и настройка фар, задних фонарей, поворотников и других элементов освещения в соответствии с европейскими требованиями.',
      'Техническая подготовка и дооснащение автомобиля для прохождения необходимых проверок и регистрации в Чехии.',
      'Регистрация автомобиля и оформление чешских номерных знаков — помогаем пройти все необходимые этапы оформления.',
      'Помощь с покупкой автомобиля на аукционе в США — через наших проверенных партнёров можем помочь подобрать автомобиль, принять участие в аукционе и организовать его доставку в Чехию.',
      'Восстановление автомобилей после ДТП — выполняем полный комплекс восстановительных работ: кузовной ремонт, замену повреждённых деталей, ремонт и диагностику.',
      'Подготовка автомобиля «под ключ» — от повреждённого или только что привезённого автомобиля до полностью готовой к эксплуатации машины, соответствующей требованиям ЕС.',
    ],
    usaModalResult: 'В результате вы получаете автомобиль, полностью подготовленный для эксплуатации и регистрации в Чехии.',
    usaModalCta: 'ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ',
    usaModalClose: 'Закрыть подробности об авто из США',
    whyLabel: 'ПОЧЕМУ FARES',
    whyH1: 'МЫ ЗНАЕМ, ЧТО ДЕЛАЕМ.',
    whyH2: 'И ДЕЛАЕМ ЭТО КАЧЕСТВЕННО',
    whySub: 'Честный подход, современные технологии и решения, на которые можно положиться.',
    whyFeats: [
      ['КОМПЛЕКСНЫЙ СЕРВИС', 'От диагностики и регулярного обслуживания до сложного ремонта и полной реставрации автомобиля.', Award],
      ['СОВРЕМЕННАЯ ДИАГНОСТИКА', 'Используем современные технологии и оборудование для точной диагностики и ремонта автомобилей.', Cog],
      ['АМЕРИКАНСКИЕ АВТО', 'Специализируемся на автомобилях из США: адаптация под европейские стандарты, ремонт, регистрация и подготовка к эксплуатации в Чехии.', Car],
      ['ИНДИВИДУАЛЬНЫЕ РЕШЕНИЯ', 'Мы устраняем не только саму проблему, но и её причину, предлагая оптимальное решение по качеству, надёжности и цене.', Handshake],
    ] as [string, string, IconType][],
    teamLabel: 'О НАС',
    teamH1: 'НАШ',
    teamH2: 'ПУТЬ',
    teamSub: 'Всё началось с интереса к автомобилям и желания делать всё качественно. Постепенно мы росли, приобретали опыт и создали сервис, который сегодня строится на качестве, внимательности и индивидуальном подходе.',
    teamText: 'Мы уделяем одинаковое внимание каждому клиенту. Всегда ищем надёжное и эффективное решение, которое соответствует его потребностям и бюджету.',
    teamBtn: 'ПОЗНАКОМИТЬСЯ С КОМАНДОЙ',
    stats: [['5+', 'ЧЛЕНОВ КОМАНДЫ', CircleUserRound], ['10000+', 'КЛИЕНТОВ', Star], ['5+ ЛЕТ', 'ОПЫТА', Settings], ['ПРАГА | НЕРАТОВИЦЕ', 'И ОКРЕСТНОСТИ', MapPin]] as [string, string, IconType][],
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
    refBottom: 'БОЛЕЕ 10 000 ДОВОЛЬНЫХ КЛИЕНТОВ',
    refAllBtn: 'ОСТАВИТЬ ОТЗЫВ',
    reviews: [
      ['Pavel Arasov', 'VW Golf', 'Доволен сервисом, обслуживание на высоте, отличный подход к клиентам. Далеко не первый раз обслуживаю свою машину у них! Рекомендую.'],
      ['Julia Tsoy', 'BMW 5', 'Постоянно обслуживаюсь в этом автосервисе — всё всегда на уровне. Работают быстро, аккуратно и без лишних навязываний. Цены адекватные, отношение к клиенту отличное. Можно спокойно доверять свою машину. Рекомендую!'],
      ['Dastan Mamatov', 'Ford Mustang', 'Отличный автосервис! Всё сделали быстро и качественно, без навязывания лишних услуг. Ребята знают своё дело, всё объясняют понятно. Остался очень доволен, буду обращаться ещё. Рекомендую.'],
    ],
    ctaLabel: 'КОНТАКТЫ',
    ctaH1: 'НУЖЕН СЕРВИС?',
    ctaH2: 'НАПИШИТЕ НАМ',
    ctaSub: 'Договоримся о времени и позаботимся о вашем авто.',
    ctaPhone: 'ТЕЛЕФОН',
    ctaAddr: 'АДРЕС',
    ctaHours: 'ВРЕМЯ РАБОТЫ',
    ctaAddrVal: 'Palackého 3/4, 277 11 Neratovice',
    ctaHoursVal: 'Пн–Пт 9:00–18:00',
    ctaVisit: 'ЖДЁМ ВАШЕГО ВИЗИТА.',
    footer: '© 2026 FARES s.r.o.',
    footerAddr: 'Palackého 3/4, 277 11 Neratovice',
    footerPhone: '+420 777 905 432',
    langAria: 'Переключить язык',
    menuAria: 'Открыть меню',
  },
};

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
    <a href="#domu" aria-label="Autoservis Fares">
      <img
        src="/logo.png"
        alt="Autoservis Fares"
        className="h-14 w-auto object-contain"
      />
    </a>
  );
}


export default function App() {
  const [lang, setLang] = useState<Lang>('cz');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [usaOpen, setUsaOpen] = useState(false);
  const tr = translations[lang];
  const priceGroups = servicePriceGroups[lang];

  useEffect(() => {
    if (!servicesOpen && !usaOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setUsaOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [servicesOpen, usaOpen]);

  useEffect(() => {
    if (!servicesOpen && !usaOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [servicesOpen, usaOpen]);

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
          <nav className="hidden items-center gap-4 whitespace-nowrap lg:flex xl:gap-7">
            {tr.nav.map(([label, href]) => (
              <a key={href} href={href} className="group relative text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-400 transition hover:text-white xl:tracking-[0.16em]">
                {label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 xl:gap-4">
            <div className="hidden items-center gap-2 text-[10px] font-bold sm:flex">
              <button type="button" onClick={() => setLang('cz')} className={lang === 'cz' ? 'text-white' : 'text-zinc-500 hover:text-white'}>CZ</button>
              <span className="text-zinc-700">|</span>
              <button type="button" onClick={() => setLang('ru')} className={lang === 'ru' ? 'text-white' : 'text-zinc-500 hover:text-white'}>RU</button>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <a href="tel:+420777905432" className="hidden items-center gap-2 whitespace-nowrap border border-white/20 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition hover:border-red-600 hover:text-red-500 xl:inline-flex"><Phone size={13} /> {tr.phoneCta}</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="whitespace-nowrap bg-red-600 px-4 py-3 text-center text-[10px] font-bold uppercase leading-4 tracking-[0.1em] transition hover:bg-red-500">{tr.cta}</a>
            </div>
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
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href="tel:+420777905432" className="inline-flex items-center justify-center gap-2 border border-white/20 px-3 py-4 text-center text-[10px] font-bold uppercase"><Phone size={14} /> {tr.phoneCta}</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-red-600 px-3 py-4 text-center text-[10px] font-bold uppercase">{tr.cta}</a>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ——— BLOCK 1: HERO (Dark, full-bleed bg) ——— */}
        <section id="domu" className="relative border-b border-white/10 pt-20">
          <img src={img.hero} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0e] via-[#0a0c0e]/85 to-[#0a0c0e]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e] via-transparent to-[#0a0c0e]/40" />
          <div className="relative mx-auto flex min-h-[500px] max-w-[1280px] items-center px-5 py-12 lg:min-h-[560px] lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-600">{tr.heroLabel}</p>
              <h1 className="mt-5 font-display text-3xl font-bold uppercase leading-[1.2] tracking-normal sm:text-4xl md:text-5xl lg:text-6xl">{tr.heroH1}<span className="ml-1 text-red-600">.</span></h1>
              <p className="mt-7 text-base text-zinc-300">{tr.heroSub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition hover:bg-red-500">{tr.heroBtn} <ArrowRight size={15} /></a>
                <a href="#sluzby" className="inline-flex min-h-12 items-center gap-4 border border-white/30 px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition hover:border-white">{tr.heroBtn2} <ArrowRight size={15} /></a>
              </div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.32em] text-zinc-500">{tr.heroNote}</p>
            </div>
          </div>
          {/* Benefits strip */}
          <div className="relative border-t border-white/10 bg-[#0d0f12]/90 backdrop-blur-sm">
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-0 sm:grid-cols-3">
              {([Settings, ShieldCheck, CircleUserRound] as IconType[]).map((Icon, i) => (
                <div key={tr.benefits[i]} className={`flex min-w-0 items-center gap-3 px-4 py-6 lg:gap-6 lg:px-10 lg:py-10 ${i > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}>
                  <Icon size={32} className="h-8 w-8 shrink-0 text-red-600 lg:h-9 lg:w-9" strokeWidth={1.3} />
                  <span className="min-w-0 flex-1 text-[11px] font-bold uppercase leading-4 tracking-[0.1em] text-zinc-300 sm:text-[10px] sm:tracking-[0.08em] lg:text-sm lg:leading-5 lg:tracking-[0.16em]">{tr.benefits[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— BLOCK 2: SERVICES (Light) ——— */}
        <section id="sluzby" className="bg-zinc-50 py-16 text-zinc-900 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <RuleLabel>{tr.svcLabel}</RuleLabel>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
              {tr.svcTitle}<span className="ml-1 text-red-600">.</span>
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tr.svcCards.map((c) => (
                <article key={c.num} className="group flex flex-col border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:border-red-600 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-zinc-200">{c.num}</span>
                    <c.icon className="text-red-600" size={26} strokeWidth={1.6} />
                  </div>
                  <span className="my-5 block h-px w-10 bg-red-600" />
                  <h3 className="font-display text-xl font-bold uppercase leading-[1.25]">{c.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600">{c.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <button type="button" onClick={() => setServicesOpen(true)} className="inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-red-500">{tr.svcAll} <ArrowRight size={15} /></button>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 3: USA CARS (Dark) ——— */}
        <section id="usa" className="relative min-h-[560px] overflow-hidden border-y border-white/10">
          <img src="/images/Gemini_Generated_Image_95hqce95hqce95hq copy.jpg" alt="Ford z USA v přístavu" className="absolute inset-0 h-full w-full object-cover object-[78%_center] opacity-90 sm:object-[68%_center] lg:object-[62%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a0c] via-[#080a0c]/80 to-transparent" />
          <div className="relative mx-auto flex min-h-[560px] max-w-[1280px] items-center px-5 py-16 lg:px-8">
            <div className="min-w-0 max-w-2xl">
              <RuleLabel>{tr.usaLabel}</RuleLabel>
              <h2 className="mt-8 break-words font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
                {tr.usaTitle} <span className="text-red-600">{tr.usaTitle2}</span><span className="ml-1 text-red-600">.</span>
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">{tr.usaText}</p>
              <button type="button" onClick={() => setUsaOpen(true)} className="mt-8 inline-flex min-h-12 max-w-full items-center gap-4 bg-red-600 px-5 text-left text-[10px] font-bold uppercase leading-4 tracking-[0.13em] text-white transition hover:bg-red-500 sm:px-6">{tr.usaBtn} <ArrowRight className="shrink-0" size={15} /></button>
              <p className="mt-12 text-[10px] font-bold uppercase leading-[2] tracking-[0.35em] text-zinc-600">{tr.usaRoads}</p>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 4: WHY US (Split 50/50) ——— */}
        <section id="pro-nas" className="grid min-h-[600px] grid-cols-1 border-b border-white/10 lg:grid-cols-2">
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-0">
            <img src={img.why} alt="" className="h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="font-display text-4xl font-bold text-white/70">FARES</span>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">{tr.trustLine}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-zinc-50 px-6 py-16 text-zinc-900 lg:px-16 lg:py-20">
            <RuleLabel>{tr.whyLabel}</RuleLabel>
            <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
              {tr.whyH1} <span className="text-red-600">{tr.whyH2}</span><span className="ml-1 text-red-600">.</span>
            </h2>
            <p className="mt-6 text-sm leading-6 text-zinc-600">{tr.whySub}</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {tr.whyFeats.map(([title, text, Icon], i) => (
                <div key={title} className="relative pl-14">
                  <span className="absolute left-0 top-0 font-display text-5xl font-bold text-zinc-200">0{i + 1}</span>
                  <Icon className="mb-3 text-red-600" size={24} strokeWidth={1.6} />
                  <h3 className="font-display text-base font-bold uppercase leading-[1.25]">{title}</h3>
                  <span className="my-3 block h-px w-8 bg-red-600" />
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-zinc-300 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">{tr.brandLine}</span>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 5: TEAM (Dark) ——— */}
        <section id="o-nas" className="relative overflow-hidden border-b border-white/10">
          <img src={img.team} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b0d] via-[#090b0d]/70 to-transparent" />
          <div className="relative mx-auto flex max-w-[1280px] flex-col px-5 py-16 lg:px-8">
            <div>
              <RuleLabel>{tr.teamLabel}</RuleLabel>
              <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
                {tr.teamH1} <span className="text-red-600">{tr.teamH2}</span><span className="ml-1 text-red-600">.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-sm leading-6 text-zinc-300">{tr.teamSub}</p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300">{tr.teamText}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {tr.stats.map(([value, label, Icon]) => (
                <div key={label} className="flex flex-col">
                  <Icon className="mb-3 text-white" size={24} strokeWidth={1.4} />
                  <strong className="block font-display text-2xl font-bold sm:text-3xl">{value}</strong>
                  <span className="mt-1 block h-10 max-w-[140px] text-[10px] font-bold uppercase leading-5 tracking-[0.14em] text-zinc-400">{label}</span>
                  <span className="mt-auto block h-px w-8 bg-red-600" />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ——— BLOCK 6: GALLERY (Dark) ——— */}
        <section id="prace" className="border-b border-white/10 bg-[#0d1013] py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <RuleLabel>{tr.workLabel}</RuleLabel>
                <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
                  {tr.workH1} <span className="text-red-600">{tr.workH2}</span><span className="ml-1 text-red-600">.</span>
                </h2>
                <p className="mt-4 text-base text-zinc-300 sm:text-lg lg:text-xl">{tr.workSub}</p>
              </div>
              <p className="border-l border-zinc-600 pl-6 text-sm leading-6 text-zinc-400">{tr.workText}</p>
            </div>
            {/* Desktop: expanding panels */}
            <div className="mt-10 hidden h-[480px] gap-2 lg:flex">
              {img.gallery.map((src, galleryIndex) => {
                const isActive = galleryIndex === activeGallery;
                return (
                  <div key={src} className={`gallery-panel group relative overflow-hidden ${isActive ? 'flex-[2.6]' : 'flex-[0.8]'}`}>
                    <img src={src} alt="" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${isActive ? 'gallery-active-image' : ''}`} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-4 pt-24 sm:p-6 sm:pt-28">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-red-600">0{galleryIndex + 1} / 04</span>
                      <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.08em] sm:text-base">{tr.workItems[galleryIndex]}</p>
                      <span className="mt-3 block h-px w-8 bg-white/70" />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Mobile/Tablet: large image + thumbnails */}
            <div className="mt-10 lg:hidden">
              <div className="relative h-[300px] overflow-hidden sm:h-[380px]">
                <img key={activeGallery} src={img.gallery[activeGallery]} alt="" className="gallery-active-image h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-4 pt-20">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-red-600">0{activeGallery + 1} / 04</span>
                  <p className="mt-1 font-display text-base font-bold uppercase tracking-[0.08em]">{tr.workItems[activeGallery]}</p>
                  <span className="mt-3 block h-px w-8 bg-white/70" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button type="button" onClick={() => setActiveGallery((activeGallery - 1 + img.gallery.length) % img.gallery.length)} aria-label="Předchozí fotografie" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition hover:border-white hover:bg-red-600">
                    <ChevronLeft size={16} />
                  </button>
                  <button type="button" onClick={() => setActiveGallery((activeGallery + 1) % img.gallery.length)} aria-label="Další fotografie" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition hover:border-white hover:bg-red-600">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {img.gallery.map((src, index) => (
                  <button key={src} type="button" onClick={() => setActiveGallery(index)} aria-label={`Fotografie ${index + 1}`} className={`relative h-16 overflow-hidden transition sm:h-20 ${activeGallery === index ? 'ring-2 ring-red-600' : 'opacity-50 hover:opacity-100'}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
              <div className="hidden items-center gap-2 lg:flex">
                {img.gallery.map((src, index) => (
                  <button key={src} type="button" onClick={() => setActiveGallery(index)} aria-label={`Fotografie ${index + 1}`} className={`h-1 transition-all duration-300 ${activeGallery === index ? 'w-10 bg-red-600' : 'w-5 bg-zinc-600 hover:bg-zinc-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 7: REVIEWS (Light bg, Dark cards) ——— */}
        <section id="reference" className="bg-zinc-100 py-16 text-zinc-900 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <RuleLabel>{tr.refLabel}</RuleLabel>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
              {tr.refH1} <span className="text-red-600">{tr.refH2}</span><span className="ml-1 text-red-600">.</span>
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
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
                    <span className="font-display text-4xl leading-[1.25] text-red-600">"</span>
                    <p className="mt-2 flex-1 text-sm leading-6 text-zinc-300">{text}</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <img src={avatars[i % avatars.length]} alt="" className="h-8 w-8 rounded-full object-cover" />
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
                    <img key={i} src={avatars[i]} alt="" className="h-8 w-8 rounded-full border-2 border-zinc-100 object-cover" />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-600">{tr.refBottom}</span>
              </div>
              <a href={googleReviewUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-4 bg-red-600 px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-red-500">{tr.refAllBtn} <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        {/* ——— BLOCK 8: CONTACT (Dark) ——— */}
        <section id="kontakt" className="border-t border-white/10 bg-[#0a0c0e] py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <RuleLabel>{tr.ctaLabel}</RuleLabel>
                <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-[1.18] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
                  {tr.ctaH1} <span className="text-red-600">{tr.ctaH2}</span><span className="ml-1 text-red-600">.</span>
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
                    <a href="https://maps.app.goo.gl/e8FDaSTKWFBbw8m2A?g_st=it" target="_blank" rel="noreferrer" className="mt-2 block text-sm font-bold text-white transition hover:text-red-500">{tr.ctaAddrVal}</a>
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
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400">{tr.brandLine}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {servicesOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="presentation" onClick={() => setServicesOpen(false)}>
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-x-hidden overflow-y-auto border border-white/15 bg-[#0c0e11] shadow-2xl shadow-black/50" role="dialog" aria-modal="true" aria-labelledby="services-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-white/10 bg-[#0c0e11]/95 px-6 py-6 backdrop-blur-md sm:px-10 sm:py-8">
              <div>
                <RuleLabel>{tr.svcLabel}</RuleLabel>
                <h2 id="services-modal-title" className="mt-4 font-display text-3xl font-bold uppercase leading-[1.15] sm:text-5xl">{tr.servicesTitle}<span className="ml-1 text-red-600">.</span></h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{tr.servicesSubtitle}</p>
              </div>
              <button type="button" onClick={() => setServicesOpen(false)} aria-label={tr.servicesClose} className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-zinc-300 transition hover:border-red-600 hover:bg-red-600 hover:text-white"><X size={19} /></button>
            </div>
            <div className="gap-4 p-6 sm:columns-2 sm:gap-4 sm:p-10">
              {priceGroups.map((group, groupIndex) => (
                <section key={group.title} className="mb-4 block min-w-0 break-inside-avoid border border-white/10 bg-[#111418] p-5 transition hover:border-red-600/60 sm:p-6">
                  <div className="mb-5 flex items-start gap-3">
                    <span className="font-display text-3xl font-bold leading-none text-red-600">0{groupIndex + 1}</span>
                    <h3 className="pt-1 font-display text-lg font-bold uppercase leading-[1.25] text-white">{group.title}</h3>
                  </div>
                  <div className="space-y-0">
                    {group.items.map(([service, price]) => (
                      <div key={service} className="flex min-w-0 items-start justify-between gap-3 border-t border-white/10 py-4">
                        <span className="min-w-0 text-sm leading-5 text-zinc-300">{service}</span>
                        <span className="max-w-[48%] break-words text-right text-[10px] font-bold uppercase tracking-[0.08em] text-red-500">{price}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <p className="max-w-xl text-sm leading-6 text-zinc-400">{tr.servicesNote}</p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <a href="tel:+420777905432" className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.1em] transition hover:border-white"><Phone size={14} /> {tr.phoneCta}</a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 bg-red-600 px-4 text-[10px] font-bold uppercase tracking-[0.1em] transition hover:bg-red-500"><MessageCircle size={14} /> WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {usaOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5" role="presentation" onClick={() => setUsaOpen(false)}>
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-x-hidden overflow-y-auto border border-white/15 bg-[#0c0e11] shadow-2xl shadow-black/50" role="dialog" aria-modal="true" aria-labelledby="usa-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0c0e11]/95 px-5 py-5 backdrop-blur-md sm:px-8 sm:py-7">
              <div className="min-w-0 pr-2">
                <RuleLabel>{tr.usaLabel}</RuleLabel>
                <h2 id="usa-modal-title" className="mt-3 break-words font-display text-2xl font-bold uppercase leading-[1.15] sm:text-4xl">{tr.usaModalTitle}<span className="ml-1 text-red-600">.</span></h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">{tr.usaModalIntro}</p>
              </div>
              <button type="button" onClick={() => setUsaOpen(false)} aria-label={tr.usaModalClose} className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-zinc-300 transition hover:border-red-600 hover:bg-red-600 hover:text-white sm:h-11 sm:w-11"><X size={18} /></button>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-4 sm:p-8">
              {tr.usaModalItems.map((item, index) => (
                <div key={item} className="flex min-w-0 gap-3 border border-white/10 bg-[#111418] p-4 sm:p-5">
                  <span className="shrink-0 font-display text-2xl font-bold leading-none text-red-600">0{index + 1}</span>
                  <p className="min-w-0 text-sm leading-6 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
              <p className="max-w-2xl text-sm font-medium leading-6 text-white">{tr.usaModalResult}</p>
              <a href={usaWhatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-red-600 px-5 text-center text-[10px] font-bold uppercase tracking-[0.1em] transition hover:bg-red-500"><MessageCircle size={15} /> {tr.usaModalCta}</a>
            </div>
          </div>
        </div>
      )}

      {/* ——— FOOTER ——— */}
      <footer className="border-t border-white/10 bg-[#080a0c]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-5 py-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-8">
          <Logo />
          <div className="flex flex-col items-center justify-center gap-5 text-zinc-400 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-red-600" />
              <a href="https://maps.app.goo.gl/e8FDaSTKWFBbw8m2A?g_st=it" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-[0.12em] transition hover:text-white">{tr.footerAddr}</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-red-600" />
              <a href="tel:+420777905432" className="text-[10px] font-bold uppercase tracking-[0.12em] transition hover:text-white">{tr.footerPhone}</a>
            </div>
          </div>
          <div className="flex items-center gap-4 lg:justify-self-end">
            <a href="https://www.instagram.com/autoservisfares" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-white/15 text-zinc-400 transition hover:border-red-600 hover:text-red-600"><Instagram size={18} /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center border border-white/15 text-zinc-400 transition hover:border-red-600 hover:text-red-600"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-5 py-6 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>{tr.footer}</span>
            <span className="text-zinc-500">{tr.brandLine}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
