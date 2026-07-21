"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  allDetails,
  allProjects,
  backdropProjects,
  ceremonyDetails,
  giftDetails,
  galleryPath,
  tableProjects,
  type GalleryItem,
} from "../data/gallery";

export type SitePage = "home" | "projects" | "details" | "studio" | "contact";
type Lang = "de" | "tr" | "en" | "ar" | "ru";

const languages: Array<{ id: Lang; flag: string; label: string }> = [
  { id: "de", flag: "🇩🇪", label: "Deutsch" },
  { id: "tr", flag: "🇹🇷", label: "Türkçe" },
  { id: "en", flag: "🇬🇧", label: "English" },
  { id: "ar", flag: "🇸🇦", label: "العربية" },
  { id: "ru", flag: "🇷🇺", label: "Русский" },
];

const occasionLabels: Record<Lang, string[]> = {
  de: ["Hochzeit", "Verlobung", "Standesamtliche Trauung", "Hennaabend", "Private Feste"],
  tr: ["Düğün", "Nişan", "Nikâh", "Kına Gecesi", "Özel Davetler"],
  en: ["Wedding", "Engagement", "Civil Ceremony", "Henna Night", "Private Events"],
  ar: ["زفاف", "خطوبة", "عقد قران", "ليلة الحناء", "مناسبات خاصة"],
  ru: ["Свадьба", "Помолвка", "Регистрация", "Вечер хны", "Частные праздники"],
};

const copy = {
  de: {
    nav: ["Projekte", "Details", "Studio", "Anfrage"],
    eyebrow: "Eventdesign · Wien",
    heroA: "Wir gestalten Feste,",
    heroB: "die sich wie Sie anfühlen.",
    heroText: "Dekoration für Hochzeiten, Verlobungen, standesamtliche Trauungen, Hennaabende und besondere Tage — persönlich inszeniert in Wien.",
    explore: "Atmosphäre entdecken",
    inquiry: "Unverbindlich anfragen",
    signature: "Unsere Handschrift",
    signatureTitle: "Nicht einfach dekoriert. Für Sie komponiert.",
    signatureText: "Kulisse, Blumen, Stoffe, Licht, Tisch und persönliche Details werden zu einer ruhigen, stimmigen Geschichte — vom ersten Blick bis zum letzten Gastgeschenk.",
    selected: "Ausgewählte Momente",
    selectedTitle: "Große Bilder. Kleine Zeichen.",
    viewAll: "Alle Projekte ansehen",
    services: "Ergänzende Services",
    servicesTitle: "Alles, was Ihre Einladung vollendet.",
    cake: "Torte",
    cakeText: "Eine Torte, die Farbwelt, Stil und Stimmung Ihres Festes geschmackvoll aufnimmt.",
    photo: "Fotografie",
    photoText: "Fotobegleitung und kuratierte Erinnerungen für die Momente zwischen den großen Augenblicken.",
    invite: "Digitale Einladung",
    inviteText: "Persönliche, interaktive digitale Einladungen — individuell für Sie und Ihr Konzept gestaltet.",
    projectsKicker: "Dekorationen · Wien",
    projectsTitle: "Jedes Fest hat seine eigene Farbe.",
    projectsText: "Hintergründe, Kulissen und Tischwelten aus echten Feiern. Die kreativen Namen der bestehenden Konzepte bleiben Teil ihrer Geschichte.",
    detailsKicker: "Leihen · Schenken · Erinnern",
    detailsTitle: "Die Details, die ein Fest tragen.",
    detailsText: "Von zeremoniellen Objekten bis zu personalisierten Gastgeschenken: jedes Detail wird passend zu Anlass, Farbe und Stückzahl kuratiert.",
    studioKicker: "Mint Event · Wien",
    studioTitle: "Wir hören zuerst zu. Dann gestalten wir Atmosphäre.",
    studioText: "Für Paare und Familien, deren Fest elegant, persönlich und selbstverständlich vielschichtig sein darf.",
    values: ["Zuhören", "Verbinden", "Inszenieren"],
    valueText: ["Anlass, Ort, Gäste, Farben und Rituale bilden den Anfang.", "Kulisse, Blumen, Textilien, Licht und Details finden einen gemeinsamen Rhythmus.", "Wir liefern, bauen auf und richten den Raum für den Moment Ihrer Gäste ein."],
    contactKicker: "Neue Feier · Wien",
    contactTitle: "Was möchten Sie feiern?",
    contactText: "Datum, Ort und eine erste Idee genügen. Wir melden uns in der Regel innerhalb von 1–2 Werktagen.",
    formTitle: "Ein paar Details für den Anfang.",
    name: "Ihr Name",
    email: "E-Mail",
    date: "Datum",
    place: "Ort / Location",
    occasion: "Anlass oder Wunsch",
    idea: "Erzählen Sie uns von Ihrer Idee",
    send: "Anfrage per E-Mail vorbereiten",
    filters: { all: "Alle", backdrops: "Hintergrund-Dekor", tables: "Tisch & Empfang", gifts: "Gastgeschenke", ceremony: "Verleih & Zeremonie" },
    ctaKicker: "Ihr Fest beginnt hier",
    ctaTitle: "Erzählen Sie uns, was Sie feiern.",
    footer: "Feiern mit Atmosphäre · Wien",
    imageOpen: "Bild vergrößern",
    close: "Schließen",
    menu: "Menü",
  },
  tr: {
    nav: ["Projeler", "Detaylar", "Stüdyo", "İletişim"], eyebrow: "Etkinlik tasarımı · Viyana", heroA: "Sizi yansıtan", heroB: "davetler tasarlıyoruz.", heroText: "Düğün, nişan, nikâh, kına gecesi ve özel günler için Viyana’da kişiye özel dekorasyon.", explore: "Atmosferi keşfet", inquiry: "Teklif iste", signature: "Tasarım dilimiz", signatureTitle: "Sadece dekore etmiyoruz. Size özel kurguluyoruz.", signatureText: "Arka plan, çiçek, kumaş, ışık, masa ve kişisel detayları ilk bakıştan son hediyeye kadar tek bir hikâyede buluşturuyoruz.", selected: "Seçili anlar", selectedTitle: "Büyük sahneler. İnce detaylar.", viewAll: "Tüm projeleri gör", services: "Tamamlayıcı hizmetler", servicesTitle: "Davetinizi tamamlayan her şey.", cake: "Pasta", cakeText: "Kutlamanızın renklerini, stilini ve ruhunu zarifçe taşıyan konsept pasta.", photo: "Fotoğraf çekimi", photoText: "Büyük anların arasındaki duyguları da yakalayan fotoğraf çekimi ve seçili hatıralar.", invite: "Dijital Davetiye", inviteText: "Kişiye ve konsepte özel, interaktif dijital davetiye tasarımı yapılır.", projectsKicker: "Dekorasyonlar · Viyana", projectsTitle: "Her davetin kendine ait bir rengi vardır.", projectsText: "Gerçek etkinliklerden arka planlar, dekor sahneleri ve masa dünyaları. Mevcut konseptlerin yaratıcı isimleri hikâyelerinin bir parçası olarak korunur.", detailsKicker: "Kiralık · Hediye · Hatıra", detailsTitle: "Bir daveti taşıyan detaylar.", detailsText: "Seremoni objelerinden kişiselleştirilmiş misafir hediyelerine kadar her parça konsepte, renge ve adede göre hazırlanır.", studioKicker: "Mint Event · Viyana", studioTitle: "Önce dinliyor, sonra atmosferi tasarlıyoruz.", studioText: "Zarif, kişisel ve farklı gelenekleri doğal biçimde bir araya getiren kutlamalar için.", values: ["Dinlemek", "Birleştirmek", "Sahnelemek"], valueText: ["Davet türü, mekân, misafirler, renkler ve ritüeller başlangıç noktamızdır.", "Arka plan, çiçek, tekstil, ışık ve detaylar ortak bir ritim bulur.", "Teslim eder, kurar ve mekânı misafirlerinizin gelişi için hazırlarız."], contactKicker: "Yeni kutlama · Viyana", contactTitle: "Neyi kutlamak istiyorsunuz?", contactText: "Tarih, mekân ve ilk fikriniz yeterli. Genellikle 1–2 iş günü içinde dönüş yapıyoruz.", formTitle: "Başlangıç için birkaç detay.", name: "Adınız", email: "E-posta", date: "Tarih", place: "Mekân / Konum", occasion: "Davet türü veya isteğiniz", idea: "Fikrinizi bize anlatın", send: "E-posta talebi hazırla", filters: { all: "Tümü", backdrops: "Arka plan dekorları", tables: "Masa & karşılama", gifts: "Misafir hediyeleri", ceremony: "Kiralık & seremoni" }, ctaKicker: "Kutlamanız burada başlar", ctaTitle: "Bize neyi kutladığınızı anlatın.", footer: "Atmosferli kutlamalar · Viyana", imageOpen: "Görseli büyüt", close: "Kapat", menu: "Menü",
  },
  en: {
    nav: ["Projects", "Details", "Studio", "Enquiry"], eyebrow: "Event design · Vienna", heroA: "We design celebrations", heroB: "that feel unmistakably yours.", heroText: "Personal event styling in Vienna for weddings, engagements, civil ceremonies, henna nights and meaningful days.", explore: "Discover the atmosphere", inquiry: "Start an enquiry", signature: "Our signature", signatureTitle: "Not simply decorated. Composed for you.", signatureText: "Backdrops, flowers, textiles, light, tables and personal touches become one calm, coherent story — from the first impression to the final favour.", selected: "Selected moments", selectedTitle: "Grand scenes. Intimate details.", viewAll: "View all projects", services: "Complementary services", servicesTitle: "Everything that completes your invitation.", cake: "Cake", cakeText: "A concept cake that elegantly echoes the palette, style and mood of your celebration.", photo: "Photography", photoText: "Thoughtful photography and curated keepsakes for the emotion between the grand moments.", invite: "Digital invitation", inviteText: "A personal, interactive digital invitation designed around you and your concept.", projectsKicker: "Decorations · Vienna", projectsTitle: "Every celebration has its own colour.", projectsText: "Real backdrops, settings and table stories. The original creative names remain part of each concept's identity.", detailsKicker: "Hire · Gift · Remember", detailsTitle: "The details that carry a celebration.", detailsText: "From ceremonial objects to personalised favours, every detail is curated around your occasion, palette and quantity.", studioKicker: "Mint Event · Vienna", studioTitle: "We listen first. Then we shape the atmosphere.", studioText: "For couples and families who want a celebration that feels elegant, personal and beautifully layered.", values: ["Listen", "Connect", "Stage"], valueText: ["The occasion, venue, guests, palette and rituals are where we begin.", "Backdrop, flowers, textiles, light and details settle into one rhythm.", "We deliver, install and prepare the room for the moment your guests arrive."], contactKicker: "New celebration · Vienna", contactTitle: "What would you like to celebrate?", contactText: "A date, location and first idea are enough. We usually reply within 1–2 business days.", formTitle: "A few details to begin.", name: "Your name", email: "Email", date: "Date", place: "Venue / Location", occasion: "Occasion or request", idea: "Tell us about your idea", send: "Prepare email enquiry", filters: { all: "All", backdrops: "Backdrop decor", tables: "Table & welcome", gifts: "Guest favours", ceremony: "Hire & ceremony" }, ctaKicker: "Your celebration begins here", ctaTitle: "Tell us what you are celebrating.", footer: "Celebrations with atmosphere · Vienna", imageOpen: "Enlarge image", close: "Close", menu: "Menu",
  },
  ar: {
    nav: ["المشاريع", "التفاصيل", "الاستوديو", "طلب عرض"], eyebrow: "تصميم مناسبات · فيينا", heroA: "نصمم احتفالات", heroB: "تشبهكم تماماً.", heroText: "تنسيق شخصي في فيينا لحفلات الزفاف والخطوبة وعقد القران وليالي الحناء والأيام المميزة.", explore: "اكتشفوا الأجواء", inquiry: "أرسلوا طلباً", signature: "بصمتنا", signatureTitle: "ليست زينة فحسب، بل مشهد صُمم لكم.", signatureText: "نجمع الخلفيات والزهور والأقمشة والإضاءة والطاولات والتفاصيل الشخصية في قصة واحدة متناغمة.", selected: "لحظات مختارة", selectedTitle: "مشاهد كبيرة. تفاصيل حميمة.", viewAll: "عرض كل المشاريع", services: "خدمات مكمّلة", servicesTitle: "كل ما يُكمل دعوتكم.", cake: "الكيك", cakeText: "كيك بتصميم ينسجم بأناقة مع ألوان المناسبة وأسلوبها.", photo: "التصوير", photoText: "تصوير مدروس وذكريات منتقاة لكل المشاعر بين اللحظات الكبيرة.", invite: "دعوة رقمية", inviteText: "تصميم دعوة رقمية تفاعلية وشخصية تناسبكم وتناسب مفهوم مناسبتكم.", projectsKicker: "ديكورات · فيينا", projectsTitle: "لكل احتفال لونه الخاص.", projectsText: "خلفيات ومشاهد وطاولات من مناسبات حقيقية، مع الحفاظ على الأسماء الإبداعية الأصلية لكل مفهوم.", detailsKicker: "استئجار · هدايا · ذكريات", detailsTitle: "التفاصيل التي تحمل روح الاحتفال.", detailsText: "من أدوات الطقوس إلى هدايا الضيوف الشخصية، ننسق كل تفصيل حسب المناسبة واللون والعدد.", studioKicker: "Mint Event · فيينا", studioTitle: "نستمع أولاً، ثم نصمم الأجواء.", studioText: "للأزواج والعائلات الذين يرغبون في احتفال أنيق وشخصي وغني بالتفاصيل.", values: ["الاستماع", "الربط", "التنسيق"], valueText: ["نبدأ بنوع المناسبة والمكان والضيوف والألوان والطقوس.", "نجمع الخلفية والزهور والأقمشة والضوء والتفاصيل في إيقاع واحد.", "نقوم بالتوصيل والتركيب وتجهيز المكان لاستقبال ضيوفكم."], contactKicker: "مناسبة جديدة · فيينا", contactTitle: "ماذا ترغبون في الاحتفال به؟", contactText: "يكفينا التاريخ والمكان وفكرة أولية. نرد عادة خلال يوم أو يومي عمل.", formTitle: "بعض التفاصيل للبدء.", name: "الاسم", email: "البريد الإلكتروني", date: "التاريخ", place: "المكان", occasion: "نوع المناسبة أو الطلب", idea: "حدثونا عن فكرتكم", send: "إعداد الطلب عبر البريد", filters: { all: "الكل", backdrops: "ديكور الخلفيات", tables: "الطاولات والاستقبال", gifts: "هدايا الضيوف", ceremony: "الاستئجار والطقوس" }, ctaKicker: "احتفالكم يبدأ هنا", ctaTitle: "حدثونا عما تحتفلون به.", footer: "احتفالات بأجواء مميزة · فيينا", imageOpen: "تكبير الصورة", close: "إغلاق", menu: "القائمة",
  },
  ru: {
    nav: ["Проекты", "Детали", "Студия", "Запрос"], eyebrow: "Дизайн событий · Вена", heroA: "Мы создаём праздники,", heroB: "которые похожи именно на вас.", heroText: "Индивидуальный декор в Вене для свадеб, помолвок, регистраций, вечеров хны и особенных дней.", explore: "Открыть атмосферу", inquiry: "Оставить запрос", signature: "Наш почерк", signatureTitle: "Не просто декор. Композиция для вас.", signatureText: "Фоны, цветы, текстиль, свет, столы и личные детали складываются в одну спокойную и цельную историю.", selected: "Избранные моменты", selectedTitle: "Большие сцены. Тонкие детали.", viewAll: "Все проекты", services: "Дополнительные услуги", servicesTitle: "Всё, что завершает ваше приглашение.", cake: "Торт", cakeText: "Концептуальный торт, который деликатно поддерживает палитру и настроение праздника.", photo: "Фотосъёмка", photoText: "Продуманная фотосъёмка и отобранные воспоминания о чувствах между главными моментами.", invite: "Цифровое приглашение", inviteText: "Персональное интерактивное цифровое приглашение, созданное для вас и вашей концепции.", projectsKicker: "Декор · Вена", projectsTitle: "У каждого праздника свой цвет.", projectsText: "Фоны, декорации и оформление столов с реальных событий. Оригинальные творческие названия концепций сохранены.", detailsKicker: "Аренда · Подарки · Память", detailsTitle: "Детали, на которых держится праздник.", detailsText: "От церемониальных предметов до персональных подарков гостям — всё подбирается под событие, палитру и количество.", studioKicker: "Mint Event · Вена", studioTitle: "Сначала мы слушаем. Потом создаём атмосферу.", studioText: "Для пар и семей, которые хотят элегантный, личный и многогранный праздник.", values: ["Слушать", "Соединять", "Воплощать"], valueText: ["Начинаем с повода, места, гостей, палитры и ритуалов.", "Фон, цветы, текстиль, свет и детали обретают общий ритм.", "Доставляем, монтируем и готовим пространство к встрече гостей."], contactKicker: "Новый праздник · Вена", contactTitle: "Что вы хотите отпраздновать?", contactText: "Достаточно даты, места и первой идеи. Обычно мы отвечаем в течение 1–2 рабочих дней.", formTitle: "Несколько деталей для начала.", name: "Ваше имя", email: "Эл. почта", date: "Дата", place: "Место", occasion: "Повод или пожелание", idea: "Расскажите о вашей идее", send: "Подготовить запрос", filters: { all: "Все", backdrops: "Фоновый декор", tables: "Столы и welcome-зона", gifts: "Подарки гостям", ceremony: "Аренда и церемония" }, ctaKicker: "Ваш праздник начинается здесь", ctaTitle: "Расскажите, что вы празднуете.", footer: "Праздники с атмосферой · Вена", imageOpen: "Увеличить изображение", close: "Закрыть", menu: "Меню",
  },
};

const navLinks = ["/projects", "/details", "/studio", "/contact"];

function Picture({ item, priority = false }: { item: GalleryItem; priority?: boolean }) {
  return <img src={galleryPath(item.kind, item.file)} alt={item.alt} loading={priority ? "eager" : "lazy"} decoding="async" />;
}

function Gallery({ items, onOpen, label }: { items: GalleryItem[]; onOpen: (item: GalleryItem) => void; label: string }) {
  return (
    <div className="gallery-grid">
      {items.map((item, index) => (
        <article className={`gallery-card ${index % 5 === 0 ? "gallery-card--wide" : ""}`} key={item.id}>
          <button className="gallery-card__image" onClick={() => onOpen(item)} aria-label={`${label}: ${item.title}`}>
            <Picture item={item} />
            <span className="gallery-card__zoom" aria-hidden="true">↗</span>
          </button>
          <div className="gallery-card__copy">
            <span>{item.tag}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function MintSite({ page }: { page: SitePage }) {
  const [lang, setLang] = useState<Lang>("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const t = copy[lang] as typeof copy.de;
  const rtl = lang === "ar";

  useEffect(() => {
    const saved = window.localStorage.getItem("mint-lang") as Lang | null;
    if (saved && languages.some((item) => item.id === saved)) setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mint-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const filteredProjects = useMemo(() => filter === "backdrops" ? backdropProjects : filter === "tables" ? tableProjects : allProjects, [filter]);
  const filteredDetails = useMemo(() => filter === "gifts" ? giftDetails : filter === "ceremony" ? ceremonyDetails : allDetails, [filter]);

  return (
    <div className="site-shell" dir={rtl ? "rtl" : "ltr"}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={page === "home" ? "site-header site-header--overlay" : "site-header"}>
        <Link className="brand" href="/" aria-label="Mint Event home">
          <img src={page === "home" ? "/brand/mintevent-logo-cream.svg" : "/brand/mintevent-logo-green.svg"} alt="Mint Event" />
        </Link>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={t.menu}>☰</button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navLinks.map((href, index) => <Link key={href} className={page === (["projects", "details", "studio", "contact"] as SitePage[])[index] ? "active" : ""} href={href} onClick={() => setMenuOpen(false)}>{t.nav[index]}</Link>)}
        </nav>
        <label className="language-picker">
          <span className="sr-only">Language</span>
          <select value={lang} onChange={(event) => setLang(event.target.value as Lang)} aria-label="Language">
            {languages.map((item) => <option key={item.id} value={item.id}>{item.flag} {item.id.toUpperCase()} · {item.label}</option>)}
          </select>
        </label>
      </header>

      <main id="main">
        {page === "home" && <Home t={t} occasions={occasionLabels[lang]} open={setLightbox} />}
        {page === "projects" && <PortfolioPage kind="projects" t={t} filter={filter} setFilter={setFilter} items={filteredProjects} open={setLightbox} />}
        {page === "details" && <PortfolioPage kind="details" t={t} filter={filter} setFilter={setFilter} items={filteredDetails} open={setLightbox} />}
        {page === "studio" && <Studio t={t} />}
        {page === "contact" && <Contact t={t} />}
      </main>

      <footer className="site-footer">
        <div><img src="/brand/mintevent-logo-cream.svg" alt="Mint Event" /><p>{t.footer}</p></div>
        <div className="footer-links">{navLinks.map((href, index) => <Link key={href} href={href}>{t.nav[index]}</Link>)}</div>
        <div><a href="mailto:mintevent@outlook.com">mintevent@outlook.com</a><a href="https://www.instagram.com/mintevents.vienna/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        <p className="copyright">© 2026 Mint Event · Vienna</p>
      </footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}>
        <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label={t.close}>×</button>
        <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
          <Picture item={lightbox} priority />
          <div><span>{lightbox.tag}</span><h2>{lightbox.title}</h2><p>{lightbox.description}</p></div>
        </div>
      </div>}
    </div>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="kicker">{kicker}</p><h2>{title}</h2>{text && <p className="section-heading__text">{text}</p>}</div>;
}

function Home({ t, occasions, open }: { t: typeof copy.de; occasions: string[]; open: (item: GalleryItem) => void }) {
  const featured = [backdropProjects[2], ceremonyDetails[20], giftDetails[13]];
  return <>
    <section className="hero">
      <div className="hero__background"><video autoPlay muted loop playsInline poster="/videos/mint-events-film-poster.jpg" preload="metadata" aria-hidden="true"><source src="/videos/mint-events-film.mp4" type="video/mp4" /></video></div>
      <div className="hero__copy"><p className="kicker">{t.eyebrow}</p><h1>{t.heroA}<em>{t.heroB}</em></h1><p>{t.heroText}</p><div className="button-row"><Link className="button button--gold" href="/projects">{t.explore} <span>↗</span></Link><Link className="text-link" href="/contact">{t.inquiry} <span>→</span></Link></div></div>
      <div className="hero__scroll">Scroll <span>↓</span></div>
    </section>
    <section className="promise-strip">{occasions.map((occasion, index) => <span key={occasion}>{occasion}{index < occasions.length - 1 && <i aria-hidden="true">✦</i>}</span>)}</section>
    <section className="intro-section"><SectionHeading kicker={t.signature} title={t.signatureTitle} text={t.signatureText} /><div className="intro-collage"><div><Picture item={backdropProjects[8]} /></div><div><Picture item={giftDetails[0]} /></div><p>Vienna<br />with feeling</p></div></section>
    <section className="featured-section"><div className="featured-top"><SectionHeading kicker={t.selected} title={t.selectedTitle} /><Link className="text-link" href="/projects">{t.viewAll} <span>→</span></Link></div><div className="featured-grid">{featured.map((item, index) => <article key={item.id} className={`feature-card feature-card--${index + 1}`}><button onClick={() => open(item)} aria-label={`${t.imageOpen}: ${item.title}`}><Picture item={item} /><span>{String(index + 1).padStart(2, "0")}</span></button><p>{item.tag}</p><h3>{item.title}</h3></article>)}</div></section>
    <section className="services-section"><SectionHeading kicker={t.services} title={t.servicesTitle} /><div className="service-grid"><Service number="01" title={t.cake} text={t.cakeText} symbol="◇" /><Service number="02" title={t.photo} text={t.photoText} symbol="◎" /><Service number="03" title={t.invite} text={t.inviteText} symbol="✦" featured /></div></section>
    <Cta t={t} />
  </>;
}

function Service({ number, title, text, symbol, featured = false }: { number: string; title: string; text: string; symbol: string; featured?: boolean }) {
  return <article className={featured ? "service-card service-card--featured" : "service-card"}><span className="service-card__number">{number}</span><span className="service-card__symbol">{symbol}</span><h3>{title}</h3><p>{text}</p></article>;
}

function PortfolioPage({ kind, t, filter, setFilter, items, open }: { kind: "projects" | "details"; t: typeof copy.de; filter: string; setFilter: (value: string) => void; items: GalleryItem[]; open: (item: GalleryItem) => void }) {
  const isProjects = kind === "projects";
  const filters = isProjects ? [["all", t.filters.all], ["backdrops", t.filters.backdrops], ["tables", t.filters.tables]] : [["all", t.filters.all], ["gifts", t.filters.gifts], ["ceremony", t.filters.ceremony]];
  const heroItem = isProjects ? backdropProjects[7] : ceremonyDetails[3];
  return <>
    <section className="page-hero"><div className="page-hero__copy"><p className="kicker">{isProjects ? t.projectsKicker : t.detailsKicker}</p><h1>{isProjects ? t.projectsTitle : t.detailsTitle}</h1><p>{isProjects ? t.projectsText : t.detailsText}</p><span className="page-count">{isProjects ? "21" : "44"} · Mint Event</span></div><div className="page-hero__image"><Picture item={heroItem} priority /></div></section>
    <section className="portfolio-section"><div className="filter-bar" role="group" aria-label="Gallery filters">{filters.map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div><Gallery items={items} onOpen={open} label={t.imageOpen} /></section>
    <Cta t={t} />
  </>;
}

function Studio({ t }: { t: typeof copy.de }) {
  return <>
    <section className="studio-hero"><div><p className="kicker">{t.studioKicker}</p><h1>{t.studioTitle}</h1><p>{t.studioText}</p></div><div className="studio-hero__images"><div><Picture item={ceremonyDetails[20]} /></div><div><Picture item={giftDetails[15]} /></div></div></section>
    <section className="values-section"><SectionHeading kicker="01 · 02 · 03" title={t.signatureTitle} /><div className="value-list">{t.values.map((value, index) => <article key={value}><span>0{index + 1}</span><h3>{value}</h3><p>{t.valueText[index]}</p></article>)}</div></section>
    <section className="studio-quote"><p>“</p><h2>{t.studioText}</h2><span>Mint Event · Vienna</span></section>
    <Cta t={t} />
  </>;
}

function Contact({ t }: { t: typeof copy.de }) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [t.name, data.get("name"), t.email, data.get("email"), t.date, data.get("date"), t.place, data.get("place"), t.occasion, data.get("occasion"), "", t.idea, data.get("idea")].join("%0D%0A");
    window.location.href = `mailto:mintevent@outlook.com?subject=Mint Event · ${encodeURIComponent(String(data.get("occasion") || "Anfrage"))}&body=${body}`;
  };
  return <section className="contact-page"><div className="contact-intro"><p className="kicker">{t.contactKicker}</p><h1>{t.contactTitle}</h1><p>{t.contactText}</p><div className="contact-details"><a href="mailto:mintevent@outlook.com">mintevent@outlook.com</a><a href="https://www.instagram.com/mintevents.vienna/" target="_blank" rel="noreferrer">@mintevents.vienna ↗</a><span>Wien, Österreich</span></div></div><form className="contact-form" onSubmit={submit}><p className="kicker">Mint Event</p><h2>{t.formTitle}</h2><div className="form-grid"><label>{t.name}<input name="name" required autoComplete="name" /></label><label>{t.email}<input name="email" type="email" required autoComplete="email" /></label><label>{t.date}<input name="date" type="date" /></label><label>{t.place}<input name="place" /></label></div><label>{t.occasion}<select name="occasion"><option>Hochzeit / Düğün</option><option>Verlobung / Nişan</option><option>Hennaabend / Kına</option><option>Dekoration</option><option>{t.invite}</option><option>{t.photo}</option><option>{t.cake}</option></select></label><label>{t.idea}<textarea name="idea" rows={5} /></label><button className="button button--gold" type="submit">{t.send} <span>↗</span></button></form></section>;
}

function Cta({ t }: { t: typeof copy.de }) {
  return <section className="cta"><p className="kicker">{t.ctaKicker}</p><h2>{t.ctaTitle}</h2><Link className="button button--light" href="/contact">{t.inquiry} <span>↗</span></Link></section>;
}
