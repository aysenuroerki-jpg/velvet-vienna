"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  allProjects,
  backdropProjects,
  ceremonyDetails,
  decorBackdropProjects,
  giftDetails,
  giftCatalogItems,
  galleryPath,
  receptionProjects,
  rentalCatalogGroups,
  tableProjects,
  welcomeProjects,
  type CatalogGroup,
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

const categoryLabels: Record<Lang, { gifts: string; rental: string }> = {
  de: { gifts: "Gastgeschenke", rental: "Miete" },
  tr: { gifts: "Hediyelikler", rental: "Kiralama" },
  en: { gifts: "Guest Favours", rental: "Hire" },
  ar: { gifts: "هدايا الضيوف", rental: "الإيجار" },
  ru: { gifts: "Подарки гостям", rental: "Аренда" },
};

const inspirationTexts: Record<Lang, string> = {
  de: "Die auf unserer Website präsentierten Produkte und Konzeptideen wurden sorgfältig zusammengestellt, um Ihnen die Entscheidung zu erleichtern und Sie zu inspirieren. Für individuelle Ideen und besondere Wünsche können Sie uns jederzeit kontaktieren; wir freuen uns darauf, Ihr Konzept gemeinsam mit Ihnen zu gestalten.",
  tr: "Sitemizde sunulan ürünler ve konsept fikirleri, karar verme sürecinizi kolaylaştırmak ve sizlere ilham olmak amacıyla özenle hazırlanmıştır. Hayalinizdeki farklı fikir ve özel istekleriniz için bizimle iletişime geçebilirsiniz; konseptinizi birlikte tasarlamaktan mutluluk duyarız.",
  en: "The products and concept ideas presented on our website have been carefully curated to make your decision easier and inspire you. Contact us with your individual ideas and special requests; we would be delighted to design your concept together.",
  ar: "تم إعداد المنتجات وأفكار التصاميم المعروضة في موقعنا بعناية لتسهيل اختياركم ومنحكم الإلهام. يمكنكم التواصل معنا لأفكاركم المختلفة وطلباتكم الخاصة؛ ويسعدنا أن نصمم مفهوم مناسبتكم معاً.",
  ru: "Продукты и идеи оформления на нашем сайте тщательно подобраны, чтобы облегчить ваш выбор и подарить вдохновение. Свяжитесь с нами, если у вас есть особые идеи или пожелания; мы с радостью разработаем вашу концепцию вместе.",
};

const localeExtras: Record<Lang, { skip: string; scroll: string; feeling: [string, string]; city: string; address: string; occasions: string[] }> = {
  de: { skip: "Zum Inhalt", scroll: "Scrollen", feeling: ["Wien", "mit Gefühl"], city: "Wien", address: "Wien, Österreich", occasions: ["Hochzeit", "Verlobung", "Hennaabend", "Dekoration"] },
  tr: { skip: "İçeriğe geç", scroll: "Kaydır", feeling: ["Viyana", "duyguyla"], city: "Viyana", address: "Viyana, Avusturya", occasions: ["Düğün", "Nişan", "Kına Gecesi", "Dekorasyon"] },
  en: { skip: "Skip to content", scroll: "Scroll", feeling: ["Vienna", "with feeling"], city: "Vienna", address: "Vienna, Austria", occasions: ["Wedding", "Engagement", "Henna Night", "Decoration"] },
  ar: { skip: "انتقل إلى المحتوى", scroll: "مرر", feeling: ["فيينا", "بإحساس"], city: "فيينا", address: "فيينا، النمسا", occasions: ["زفاف", "خطوبة", "ليلة الحناء", "ديكور"] },
  ru: { skip: "Перейти к содержанию", scroll: "Листайте", feeling: ["Вена", "с чувством"], city: "Вена", address: "Вена, Австрия", occasions: ["Свадьба", "Помолвка", "Вечер хны", "Декор"] },
};

const tagTranslations: Record<Lang, Record<string, string>> = {
  de: { Verlobung: "Verlobung", Zeremonie: "Zeremonie", Feier: "Feier", Hochzeit: "Hochzeit", Hennaabend: "Hennaabend", "Evlilik Teklifi": "Heiratsantrag", "Masa Karşılama": "Tisch & Empfang", Tischdeko: "Tischdekoration", Empfang: "Empfang", "Stoffbeutel Monogram": "Stoffbeutel Monogramm", Gastgeschenk: "Gastgeschenk", "Gelin Yelpazesi": "Brautfächer", Kiralama: "Miete" },
  tr: { Verlobung: "Nişan", Zeremonie: "Tören", Feier: "Kutlama", Hochzeit: "Düğün", Hennaabend: "Kına Gecesi", "Evlilik Teklifi": "Evlilik Teklifi", "Masa Karşılama": "Masa & Karşılama", Tischdeko: "Masa Dekoru", Empfang: "Karşılama", "Stoffbeutel Monogram": "Monogramlı Kumaş Kese", Gastgeschenk: "Hediyelik", "Gelin Yelpazesi": "Gelin Yelpazesi", Kiralama: "Kiralama" },
  en: { Verlobung: "Engagement", Zeremonie: "Ceremony", Feier: "Celebration", Hochzeit: "Wedding", Hennaabend: "Henna Night", "Evlilik Teklifi": "Marriage Proposal", "Masa Karşılama": "Table & Welcome", Tischdeko: "Table Decor", Empfang: "Welcome", "Stoffbeutel Monogram": "Monogram Fabric Pouch", Gastgeschenk: "Guest Favour", "Gelin Yelpazesi": "Bridal Fan", Kiralama: "Hire" },
  ar: { Verlobung: "خطوبة", Zeremonie: "مراسم", Feier: "احتفال", Hochzeit: "زفاف", Hennaabend: "ليلة الحناء", "Evlilik Teklifi": "طلب زواج", "Masa Karşılama": "طاولة واستقبال", Tischdeko: "ديكور الطاولة", Empfang: "استقبال", "Stoffbeutel Monogram": "كيس قماشي بالأحرف", Gastgeschenk: "هدية للضيوف", "Gelin Yelpazesi": "مروحة العروس", Kiralama: "إيجار" },
  ru: { Verlobung: "Помолвка", Zeremonie: "Церемония", Feier: "Праздник", Hochzeit: "Свадьба", Hennaabend: "Вечер хны", "Evlilik Teklifi": "Предложение руки и сердца", "Masa Karşılama": "Стол и welcome-зона", Tischdeko: "Декор стола", Empfang: "Welcome-зона", "Stoffbeutel Monogram": "Тканевый мешочек с монограммой", Gastgeschenk: "Подарок гостям", "Gelin Yelpazesi": "Веер невесты", Kiralama: "Аренда" },
};

const itemDescriptionTranslations: Record<Lang, Record<string, string>> = {
  de: {
    "Scarlet Feather": "Auf Wunsch personalisierbar", "Burgundy Tef": "Spezielles Tef für die Henna-Braut · Auf Wunsch personalisierbar", "Midnight Masks": "Auf Wunsch personalisierbar", "Instant Memories": "Inklusive 20 Aufnahmen", "Davul Kiralama": "Auf Wunsch personalisierbar", "rental-crimson-garden": "Roter Teppich und Henna-Thron können separat gemietet werden.", "Initials in Ivory": "Personalisierung möglich", "gift-canvas-bag": "Namenspersonalisierung gegen Aufpreis", "gift-bridal-fan": "Auf Wunsch personalisierbar",
  },
  tr: {
    "Sarı & Orange Garden": "Çiçekler · Kumaş · Açık alan", "White Geometry": "Tekstil · Geometri · Beyaz", "Rosé & Gold": "Pudra pembe · Işık · Altın", "Luminous White": "Işık kemerleri · Çiçek tasarımı", "Butterfly Geometry": "Tekstil · Kelebek detayları", "White Circle": "Masa · Yuvarlak kemer · Çiçekler", "Pearl Light": "Sedef · Işık · Çiçek tasarımı", "Crimson Garden": "Taht · Halı · Fenerler", "rental-crimson-garden": "Kırmızı Halı ve Kına Tahtı ayrı ayrı kiralanabilir.", "Sage & Gold Garden": "Adaçayı yeşili · Altın · Çiçekler", "Davul & Drapes": "Taht · Davul · Kumaş", "Pampas Heart": "Kalp kemeri · Pampas · Kırmızı", "Heart Curtain": "Kumaş · Kalpler · Işık", "Blue Drapery": "Mavi · Pembe · Çiçekler", "Burgundy Circle": "Yuvarlak kemer · Kumaş · Çiçekler", "Kına Welcome": "Tüller · Ayna · Karşılama", "Burgundy Welcome": "Çiçekler · Kurdeleler · Mumlar", "Memory Table": "Kartlar · Mumlar · Çiçekler", "Burgundy Sweets": "Tatlılar · Tekstil · Mumlar", "Sweet Gathering": "Büfe · Çiçekler · Sunum", "Rustic Table": "Ahşap · Çiçekler · Mumlar", "At Your Place": "Peçete · İsim kartı", "Lace Welcome": "Dantel · Şövale · Çiçekler", "Butterfly Welcome": "Ayna · Kelebekler · Çiçekler", "Golden Reflection": "Kemer ayna · Altın · Çiçek tasarımı", "Castle Promise": "Göl · Şato · Evlilik teklifi", "Initials in Ivory": "Kişiselleştirme yapılır", "Scarlet Feather": "İsteğe göre kişiselleştirme yapılır", "Burgundy Tef": "Kına gelinine özel tef · İsteğe göre kişiselleştirme yapılır", "Midnight Masks": "İsteğe göre kişiselleştirme yapılır", "Instant Memories": "20 poz ile birlikte", "Davul Kiralama": "İsteğe göre kişiselleştirme yapılır", "gift-canvas-bag": "İsimlendirme ekstra ücretle yapılır", "gift-bridal-fan": "İsteğe göre kişiselleştirme yapılır",
  },
  en: { "Scarlet Feather": "Personalisation available on request", "Burgundy Tef": "Special tef for the henna bride · Personalisation available on request", "Midnight Masks": "Personalisation available on request", "Instant Memories": "Includes 20 shots", "Davul Kiralama": "Personalisation available on request", "rental-crimson-garden": "The red carpet and henna throne can be hired separately.", "Initials in Ivory": "Personalisation available", "gift-canvas-bag": "Name personalisation is available for an additional fee", "gift-bridal-fan": "Personalisation available on request" },
  ar: { "Scarlet Feather": "يمكن تخصيصه حسب الطلب", "Burgundy Tef": "دف خاص لعروس الحناء · يمكن تخصيصه حسب الطلب", "Midnight Masks": "يمكن تخصيصه حسب الطلب", "Instant Memories": "يشمل 20 لقطة", "Davul Kiralama": "يمكن تخصيصه حسب الطلب", "rental-crimson-garden": "يمكن استئجار السجادة الحمراء وعرش الحناء بشكل منفصل.", "Initials in Ivory": "التخصيص متاح", "gift-canvas-bag": "تخصيص الاسم متاح مقابل رسوم إضافية", "gift-bridal-fan": "يمكن تخصيصه حسب الطلب" },
  ru: { "Scarlet Feather": "Персонализация по запросу", "Burgundy Tef": "Особый теф для невесты на вечере хны · Персонализация по запросу", "Midnight Masks": "Персонализация по запросу", "Instant Memories": "Включено 20 снимков", "Davul Kiralama": "Персонализация по запросу", "rental-crimson-garden": "Красную дорожку и трон для хны можно арендовать отдельно.", "Initials in Ivory": "Возможна персонализация", "gift-canvas-bag": "Именная персонализация доступна за дополнительную плату", "gift-bridal-fan": "Персонализация по запросу" },
};

const itemTitleTranslations: Record<Lang, Record<string, string>> = {
  de: { "Mandal Toka Örnekleri": "Haarklammer-Beispiele", "Bez Çanta": "Stofftasche", Toka: "Haarspange", "Gelin Yelpazesi": "Brautfächer" },
  tr: { "Mandal Toka Örnekleri": "Mandal Toka Örnekleri", "Bez Çanta": "Bez Çanta", Toka: "Toka", "Gelin Yelpazesi": "Gelin Yelpazesi" },
  en: { "Mandal Toka Örnekleri": "Hair Clip Examples", "Bez Çanta": "Fabric Bag", Toka: "Hair Clip", "Gelin Yelpazesi": "Bridal Fan" },
  ar: { "Mandal Toka Örnekleri": "أمثلة مشابك الشعر", "Bez Çanta": "حقيبة قماش", Toka: "مشبك شعر", "Gelin Yelpazesi": "مروحة العروس" },
  ru: { "Mandal Toka Örnekleri": "Примеры заколок", "Bez Çanta": "Тканевая сумка", Toka: "Заколка", "Gelin Yelpazesi": "Веер невесты" },
};

const catalogGroupTitles: Record<Lang, Record<string, string>> = {
  de: { stoffbeutel: "Stoffbeutel & Monogramm", clips: "Henna-Geschenkbeispiele", "hair-ties": "Haargummi-Beispiele", "small-gifts": "Kleine Geschenke", "halay-gift": "Personalisierte Halay-Tücher", "light-gifts": "Leuchtende Gastgeschenke", fans: "Fächer-Varianten", memories: "Erinnerungsecke", "henna-trays": "Henna-Tablett-Beispiele", "bridal-accessories": "Brautaccessoires", tef: "Tef-Vorlagen", halay: "Halay-Tuch-Beispiele", "ring-trays": "Ringtablett-Varianten", "henna-stage": "Henna-Thron & roter Teppich", davul: "Davul-Miete" },
  tr: { stoffbeutel: "Kumaş Kese & Monogram", clips: "Hediyelik Kına Örnekleri", "hair-ties": "Saç Lastiği Örnekleri", "small-gifts": "Küçük Hediyeler", "halay-gift": "Kişiye Özel Halay Mendili", "light-gifts": "Işıklı Hediyelikler", fans: "Yelpaze Çeşitleri Örnekleri", memories: "Anı Köşesi", "henna-trays": "Kına Tepsisi Örnekleri", "bridal-accessories": "Gelin Aksesuarları", tef: "Tef Örnekleri", halay: "Halay Mendili Örnekleri", "ring-trays": "Yüzük Tepsisi Çeşitleri Örnekleri", "henna-stage": "Kına Tahtı & Kırmızı Halı", davul: "Davul Kiralama" },
  en: { stoffbeutel: "Fabric Pouches & Monograms", clips: "Henna Favour Examples", "hair-ties": "Hair Tie Examples", "small-gifts": "Small Favours", "halay-gift": "Personalised Halay Scarves", "light-gifts": "Illuminated Favours", fans: "Fan Variations", memories: "Memory Corner", "henna-trays": "Henna Tray Examples", "bridal-accessories": "Bridal Accessories", tef: "Tef Examples", halay: "Halay Scarf Examples", "ring-trays": "Ring Tray Variations", "henna-stage": "Henna Throne & Red Carpet", davul: "Davul Hire" },
  ar: { stoffbeutel: "أكياس قماشية وأحرف", clips: "أمثلة هدايا الحناء", "hair-ties": "أمثلة ربطات الشعر", "small-gifts": "هدايا صغيرة", "halay-gift": "مناديل هالاي مخصصة", "light-gifts": "هدايا مضيئة", fans: "نماذج المراوح", memories: "ركن الذكريات", "henna-trays": "أمثلة صواني الحناء", "bridal-accessories": "إكسسوارات العروس", tef: "أمثلة الدف", halay: "أمثلة مناديل الهالاي", "ring-trays": "نماذج صواني الخواتم", "henna-stage": "عرش الحناء والسجادة الحمراء", davul: "استئجار الطبل" },
  ru: { stoffbeutel: "Тканевые мешочки и монограммы", clips: "Примеры подарков для вечера хны", "hair-ties": "Примеры резинок", "small-gifts": "Небольшие подарки", "halay-gift": "Именные платки для халай", "light-gifts": "Светящиеся подарки", fans: "Варианты вееров", memories: "Уголок воспоминаний", "henna-trays": "Примеры подносов для хны", "bridal-accessories": "Аксессуары невесты", tef: "Примеры тефа", halay: "Примеры платков для халай", "ring-trays": "Варианты подносов для колец", "henna-stage": "Трон для хны и красная дорожка", davul: "Аренда давула" },
};

function localizeItem(item: GalleryItem, lang: Lang): GalleryItem {
  return {
    ...item,
    title: itemTitleTranslations[lang][item.title] ?? item.title,
    tag: tagTranslations[lang][item.tag] ?? item.tag,
    description: itemDescriptionTranslations[lang][item.id] ?? itemDescriptionTranslations[lang][item.title] ?? item.description,
  };
}

const occasionLabels: Record<Lang, string[]> = {
  de: ["Hochzeit", "Verlobung", "Standesamtliche Trauung", "Hennaabend", "Heiratsantrag", "Private Feste"],
  tr: ["Düğün", "Nişan", "Nikâh", "Kına Gecesi", "Evlilik Teklifi", "Özel Davetler"],
  en: ["Wedding", "Engagement", "Civil Ceremony", "Henna Night", "Marriage Proposal", "Private Events"],
  ar: ["زفاف", "خطوبة", "عقد قران", "ليلة الحناء", "طلب زواج", "مناسبات خاصة"],
  ru: ["Свадьба", "Помолвка", "Регистрация", "Вечер хны", "Предложение руки и сердца", "Частные праздники"],
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

function Gallery({ items, onOpen, label, lang }: { items: GalleryItem[]; onOpen: (item: GalleryItem) => void; label: string; lang: Lang }) {
  return (
    <div className="gallery-grid">
      {items.map((sourceItem, index) => {
        const item = localizeItem(sourceItem, lang);
        return <article className={`gallery-card ${index % 5 === 0 ? "gallery-card--wide" : ""}`} key={item.id}>
          <button className="gallery-card__image" onClick={() => onOpen(item)} aria-label={`${label}: ${item.title}`}>
            <Picture item={item} />
            <span className="gallery-card__zoom" aria-hidden="true">↗</span>
          </button>
          <div className="gallery-card__copy">
            <span>{item.tag}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </article>;
      })}
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
  const lightboxItem = lightbox ? localizeItem(lightbox, lang) : null;

  useEffect(() => {
    const saved = window.localStorage.getItem("mint-lang") as Lang | null;
    if (saved && languages.some((item) => item.id === saved)) {
      const frame = window.requestAnimationFrame(() => setLang(saved));
      return () => window.cancelAnimationFrame(frame);
    }
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

  const filteredProjects = useMemo(() => {
    if (filter === "backdrops") return decorBackdropProjects;
    if (filter === "tables") return [...tableProjects, ...welcomeProjects, ...receptionProjects];
    return allProjects;
  }, [filter]);

  return (
    <div className="site-shell" dir={rtl ? "rtl" : "ltr"}>
      <a className="skip-link" href="#main">{localeExtras[lang].skip}</a>
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
        {page === "home" && <Home t={t} occasions={occasionLabels[lang]} open={setLightbox} lang={lang} />}
        {page === "projects" && <PortfolioPage t={t} filter={filter} setFilter={setFilter} items={filteredProjects} open={setLightbox} lang={lang} />}
        {page === "details" && <DetailsCatalog t={t} filter={filter} setFilter={setFilter} open={setLightbox} labels={categoryLabels[lang]} lang={lang} />}
        {page === "studio" && <Studio t={t} lang={lang} />}
        {page === "contact" && <Contact t={t} lang={lang} />}
      </main>

      <InspirationBanner lang={lang} />
      <footer className="site-footer">
        <div><img src="/brand/mintevent-logo-cream.svg" alt="Mint Event" /><p>{t.footer}</p></div>
        <div className="footer-links">{navLinks.map((href, index) => <Link key={href} href={href}>{t.nav[index]}</Link>)}</div>
        <div><a href="mailto:mintevent@outlook.com">mintevent@outlook.com</a><a href="https://www.instagram.com/mintevents.vienna/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        <p className="copyright">© 2026 Mint Event · {localeExtras[lang].city}</p>
      </footer>

      {lightboxItem && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightboxItem.title} onClick={() => setLightbox(null)}>
        <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label={t.close}>×</button>
        <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
          <Picture item={lightboxItem} priority />
          <div>{lightboxItem.tag && <span>{lightboxItem.tag}</span>}<h2>{lightboxItem.title}</h2>{lightboxItem.description && <p>{lightboxItem.description}</p>}</div>
        </div>
      </div>}
    </div>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="kicker">{kicker}</p><h2>{title}</h2>{text && <p className="section-heading__text">{text}</p>}</div>;
}

function Home({ t, occasions, open, lang }: { t: typeof copy.de; occasions: string[]; open: (item: GalleryItem) => void; lang: Lang }) {
  const featured = [backdropProjects[2], ceremonyDetails[20], giftDetails[9]];
  return <>
    <section className="hero">
      <div className="hero__background"><video autoPlay muted loop playsInline poster="/videos/mint-events-film-poster.jpg" preload="metadata" aria-hidden="true"><source src="/videos/mint-events-film.mp4" type="video/mp4" /></video></div>
      <div className="hero__copy"><p className="kicker">{t.eyebrow}</p><h1>{t.heroA}<em>{t.heroB}</em></h1><p>{t.heroText}</p><div className="button-row"><Link className="button button--gold" href="/projects">{t.explore} <span>↗</span></Link><Link className="text-link" href="/contact">{t.inquiry} <span>→</span></Link></div></div>
      <div className="hero__scroll">{localeExtras[lang].scroll} <span>↓</span></div>
    </section>
    <section className="promise-strip">{occasions.map((occasion, index) => <span key={occasion}>{occasion}{index < occasions.length - 1 && <i aria-hidden="true">✦</i>}</span>)}</section>
    <section className="intro-section"><SectionHeading kicker={t.signature} title={t.signatureTitle} text={t.signatureText} /><div className="intro-collage"><div><Picture item={backdropProjects[8]} /></div><div><Picture item={giftDetails[0]} /></div><p>{localeExtras[lang].feeling[0]}<br />{localeExtras[lang].feeling[1]}</p></div></section>
    <section className="featured-section"><div className="featured-top"><SectionHeading kicker={t.selected} title={t.selectedTitle} /><Link className="text-link" href="/projects">{t.viewAll} <span>→</span></Link></div><div className="featured-grid">{featured.map((sourceItem, index) => { const item = localizeItem(sourceItem, lang); return <article key={item.id} className={`feature-card feature-card--${index + 1}`}><button onClick={() => open(item)} aria-label={`${t.imageOpen}: ${item.title}`}><Picture item={item} /><span>{String(index + 1).padStart(2, "0")}</span></button>{item.tag && <p>{item.tag}</p>}<h3>{item.title}</h3></article>; })}</div></section>
    <section className="services-section"><SectionHeading kicker={t.services} title={t.servicesTitle} /><div className="service-grid"><Service number="01" title={t.cake} text={t.cakeText} symbol="◇" /><Service number="02" title={t.photo} text={t.photoText} symbol="◎" /><Service number="03" title={t.invite} text={t.inviteText} symbol="✦" featured /></div></section>
    <Cta t={t} />
  </>;
}

function Service({ number, title, text, symbol, featured = false }: { number: string; title: string; text: string; symbol: string; featured?: boolean }) {
  return <article className={featured ? "service-card service-card--featured" : "service-card"}><span className="service-card__number">{number}</span><span className="service-card__symbol">{symbol}</span><h3>{title}</h3><p>{text}</p></article>;
}

function PortfolioPage({ t, filter, setFilter, items, open, lang }: { t: typeof copy.de; filter: string; setFilter: (value: string) => void; items: GalleryItem[]; open: (item: GalleryItem) => void; lang: Lang }) {
  const filters = [["all", t.filters.all], ["backdrops", t.filters.backdrops], ["tables", t.filters.tables]];
  const heroItem = backdropProjects[7];
  return <>
    <section className="page-hero"><div className="page-hero__copy"><p className="kicker">{t.projectsKicker}</p><h1>{t.projectsTitle}</h1><p>{t.projectsText}</p><span className="page-count">{allProjects.length} · Mint Event</span></div><div className="page-hero__image"><Picture item={heroItem} priority /></div></section>
    <section className="portfolio-section"><div className="filter-bar" role="group" aria-label="Gallery filters">{filters.map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div><Gallery items={items} onOpen={open} label={t.imageOpen} lang={lang} /></section>
    <Cta t={t} />
  </>;
}

function DetailsCatalog({ t, filter, setFilter, open, labels, lang }: { t: typeof copy.de; filter: string; setFilter: (value: string) => void; open: (item: GalleryItem) => void; labels: (typeof categoryLabels)[Lang]; lang: Lang }) {
  const active = filter === "ceremony" ? "ceremony" : "gifts";
  const count = active === "gifts"
    ? giftCatalogItems.length
    : rentalCatalogGroups.reduce((total, group) => total + group.items.length, 0);

  return <>
    <section className="page-hero"><div className="page-hero__copy"><p className="kicker">{t.detailsKicker}</p><h1>{t.detailsTitle}</h1><p>{t.detailsText}</p><span className="page-count">{count} · Mint Event</span></div><div className="page-hero__image"><Picture item={ceremonyDetails[3]} priority /></div></section>
    <section className="catalog-section">
      <div className="catalog-tabs" role="tablist" aria-label="Detaylar kategorileri">
        <button role="tab" aria-selected={active === "gifts"} className={active === "gifts" ? "active" : ""} onClick={() => setFilter("gifts")}>{labels.gifts}</button>
        <button role="tab" aria-selected={active === "ceremony"} className={active === "ceremony" ? "active" : ""} onClick={() => setFilter("ceremony")}>{labels.rental}</button>
      </div>
      {active === "gifts"
        ? <div className="catalog-flat-grid">{giftCatalogItems.map((item) => <ProductCard key={item.id} sourceItem={item} onOpen={open} label={t.imageOpen} lang={lang} hideTag />)}</div>
        : <div className="catalog-groups">{rentalCatalogGroups.map((group, index) => <CatalogSection key={group.id} group={group} index={index} onOpen={open} label={t.imageOpen} lang={lang} />)}</div>}
    </section>
    <Cta t={t} />
  </>;
}

function CatalogSection({ group, index, onOpen, label, lang }: { group: CatalogGroup; index: number; onOpen: (item: GalleryItem) => void; label: string; lang: Lang }) {
  const groupTitle = catalogGroupTitles[lang][group.id] ?? group.title;
  return <section className="catalog-group" aria-labelledby={`catalog-${group.id}`}>
    <header className="catalog-group__heading"><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`catalog-${group.id}`}>{groupTitle}</h2><i>{group.items.length}</i></header>
    <div className="catalog-group__grid">{group.items.map((item) => <ProductCard key={`${group.id}-${item.id}`} sourceItem={item} onOpen={onOpen} label={label} lang={lang} />)}</div>
  </section>;
}

function ProductCard({ sourceItem, onOpen, label, lang, hideTag = false }: { sourceItem: GalleryItem; onOpen: (item: GalleryItem) => void; label: string; lang: Lang; hideTag?: boolean }) {
  const item = localizeItem(sourceItem, lang);
  return <article className="product-card">
    <button className="product-card__image" onClick={() => onOpen(item)} aria-label={`${label}: ${item.title}`}><Picture item={item} /><span aria-hidden="true">↗</span></button>
    <div className="product-card__body">{!hideTag && item.tag && <span>{item.tag}</span>}<h3>{item.title}</h3>{item.description && <p className={item.id === "rental-crimson-garden" ? "product-card__note product-card__note--italic" : "product-card__note"}>{item.description}</p>}</div>
  </article>;
}

function Studio({ t, lang }: { t: typeof copy.de; lang: Lang }) {
  return <>
    <section className="studio-hero"><div><p className="kicker">{t.studioKicker}</p><h1>{t.studioTitle}</h1><p>{t.studioText}</p></div><div className="studio-hero__images"><div><Picture item={ceremonyDetails[20]} /></div><div><Picture item={giftDetails[10]} /></div></div></section>
    <section className="values-section"><SectionHeading kicker="01 · 02 · 03" title={t.signatureTitle} /><div className="value-list">{t.values.map((value, index) => <article key={value}><span>0{index + 1}</span><h3>{value}</h3><p>{t.valueText[index]}</p></article>)}</div></section>
    <section className="studio-quote"><p>“</p><h2>{t.studioText}</h2><span>Mint Event · {localeExtras[lang].city}</span></section>
    <Cta t={t} />
  </>;
}

function Contact({ t, lang }: { t: typeof copy.de; lang: Lang }) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [t.name, data.get("name"), t.email, data.get("email"), t.date, data.get("date"), t.place, data.get("place"), t.occasion, data.get("occasion"), "", t.idea, data.get("idea")].join("%0D%0A");
    window.location.href = `mailto:mintevent@outlook.com?subject=Mint Event · ${encodeURIComponent(String(data.get("occasion") || "Anfrage"))}&body=${body}`;
  };
  return <section className="contact-page"><div className="contact-intro"><p className="kicker">{t.contactKicker}</p><h1>{t.contactTitle}</h1><p>{t.contactText}</p><div className="contact-details"><a href="mailto:mintevent@outlook.com">mintevent@outlook.com</a><a href="https://www.instagram.com/mintevents.vienna/" target="_blank" rel="noreferrer">@mintevents.vienna ↗</a><span>{localeExtras[lang].address}</span></div></div><form className="contact-form" onSubmit={submit}><p className="kicker">Mint Event</p><h2>{t.formTitle}</h2><div className="form-grid"><label>{t.name}<input name="name" required autoComplete="name" /></label><label>{t.email}<input name="email" type="email" required autoComplete="email" /></label><label>{t.date}<input name="date" type="date" /></label><label>{t.place}<input name="place" /></label></div><label>{t.occasion}<select name="occasion">{localeExtras[lang].occasions.map((occasion) => <option key={occasion}>{occasion}</option>)}<option>{t.invite}</option><option>{t.photo}</option><option>{t.cake}</option></select></label><label>{t.idea}<textarea name="idea" rows={5} /></label><button className="button button--gold" type="submit">{t.send} <span>↗</span></button></form></section>;
}

function InspirationBanner({ lang }: { lang: Lang }) {
  return <aside className="inspiration-banner"><span aria-hidden="true">✦</span><p><em>{inspirationTexts[lang]}</em></p></aside>;
}

function Cta({ t }: { t: typeof copy.de }) {
  return <section className="cta"><p className="kicker">{t.ctaKicker}</p><h2>{t.ctaTitle}</h2><Link className="button button--light" href="/contact">{t.inquiry} <span>↗</span></Link></section>;
}
