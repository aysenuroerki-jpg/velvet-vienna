export type GalleryKind = "backdrops" | "tables" | "gifts" | "ceremony" | "reception";

export type GalleryItem = {
  id: string;
  title: string;
  kind: GalleryKind;
  file: string;
  tag: string;
  description: string;
  alt: string;
};

export type CatalogGroup = {
  id: string;
  title: string;
  items: GalleryItem[];
};

const IMAGE_ROOT = "/images";

export function galleryPath(kind: GalleryKind, file: string) {
  return `${IMAGE_ROOT}/${kind}/${file}.webp`;
}

const createItems = (
  kind: GalleryKind,
  items: Array<Omit<GalleryItem, "id" | "kind">>,
): GalleryItem[] =>
  items.map((item, index) => ({
    ...item,
    kind,
    id: `${kind}-${String(index + 1).padStart(2, "0")}`,
  }));

export const backdropProjects = createItems("backdrops", [
  { file: "sari-orange-garden", title: "Sarı & Orange Garden", tag: "Verlobung", description: "Blumen · Stoff · Außenbereich", alt: "Gelb-orange florale Verlobungsdekoration im Garten" },
  { file: "white-geometry", title: "White Geometry", tag: "Zeremonie", description: "Textil · Geometrie · Weiß", alt: "Weiße geometrische Kulisse im Garten" },
  { file: "rose-gold", title: "Rosé & Gold", tag: "Verlobung", description: "Rosé · Licht · Gold", alt: "Rosa-goldene beleuchtete Verlobungskulisse" },
  { file: "luminous-white", title: "Luminous White", tag: "Feier", description: "Lichtbögen · Floristik", alt: "Beleuchtete weiße Bogenkulisse mit Blumen" },
  { file: "white-geometry-butterfly", title: "Butterfly Geometry", tag: "Zeremonie", description: "Textil · Butterfly Details", alt: "Weiße geometrische Kulisse mit Schmetterlingsdetails" },
  { file: "white-circle", title: "White Circle", tag: "Hochzeit", description: "Tafel · Rundbogen · Blumen", alt: "Weißer Blumenbogen hinter einer festlichen Tafel" },
  { file: "pearl-light", title: "Pearl Light", tag: "Verlobung", description: "Perlmutt · Licht · Floristik", alt: "Perlmuttfarbene Lichtkulisse mit weißen Blumen" },
  { file: "crimson-garden", title: "Crimson Garden", tag: "Hennaabend", description: "Thron · Teppich · Laternen", alt: "Roter Henna-Thron im Freien" },
  { file: "sage-gold-garden", title: "Sage & Gold Garden", tag: "Zeremonie", description: "Salbei · Gold · Blumen", alt: "Salbeigrüne und goldene Zeremoniekulisse" },
  { file: "davul-drapes", title: "Davul & Drapes", tag: "Hennaabend", description: "Thron · Davul · Stoff", alt: "Rot-weiße Henna-Kulisse mit Thron und Davul" },
  { file: "pampas-heart", title: "Pampas Heart", tag: "Evlilik Teklifi", description: "Herzbogen · Pampas · Rot", alt: "Roter Pampas-Herzbogen für einen Heiratsantrag" },
  { file: "heart-curtain", title: "Heart Curtain", tag: "Feier", description: "Stoff · Herzen · Licht", alt: "Weiße Vorhangkulisse mit roten Herzen" },
  { file: "blue-drapery", title: "Blue Drapery", tag: "Verlobung", description: "Blau · Rosa · Blumen", alt: "Blaue drapierte Verlobungskulisse mit Blumen" },
  { file: "burgundy-circle", title: "Burgundy Circle", tag: "Verlobung", description: "Rundbogen · Stoff · Blumen", alt: "Bordeauxfarbene Rundbogen-Kulisse" },
  { file: "kina-welcome", title: "Kına Welcome", tag: "Masa Karşılama", description: "Tücher · Spiegel · Empfang", alt: "Roter Henna-Empfangstisch im Freien" },
  { file: "burgundy-welcome", title: "Burgundy Welcome", tag: "Masa Karşılama", description: "Blumen · Schleifen · Kerzen", alt: "Bordeauxfarbene Empfangskulisse mit Kerzen" },
]);

export const decorBackdropProjects = backdropProjects.slice(0, 14);
export const welcomeProjects = backdropProjects.slice(14);

export const tableProjects = createItems("tables", [
  { file: "memory-table", title: "Memory Table", tag: "Tischdeko", description: "Karten · Kerzen · Blumen", alt: "Bordeauxfarbener Erinnerungstisch" },
  { file: "burgundy-sweets", title: "Burgundy Sweets", tag: "Tischdeko", description: "Dessert · Textil · Kerzen", alt: "Sweet Table mit bordeauxfarbenem Tischläufer" },
  { file: "sweet-gathering", title: "Sweet Gathering", tag: "Tischdeko", description: "Buffet · Blumen · Präsentation", alt: "Hochzeitsbuffet mit Cupcakes und Süßigkeiten" },
  { file: "rustic-table", title: "Rustic Table", tag: "Tischdeko", description: "Holz · Blumen · Kerzen", alt: "Rustikale Tischdekoration mit Blumen und Holz" },
  { file: "at-your-place", title: "At Your Place", tag: "Tischdeko", description: "Serviette · Namenskarte", alt: "Personalisierte Serviette und Tischkarte" },
]);

export const receptionProjects = createItems("reception", [
  { file: "lace-welcome", title: "Lace Welcome", tag: "Empfang", description: "Spitze · Staffelei · Blumen", alt: "Willkommensschild mit Spitze, Blumen und goldener Staffelei" },
  { file: "butterfly-mirror-welcome", title: "Butterfly Welcome", tag: "Empfang", description: "Spiegel · Schmetterlinge · Blumen", alt: "Verspiegeltes Willkommensschild mit Schmetterlingen und Blumen" },
  { file: "arched-mirror-welcome", title: "Golden Reflection", tag: "Empfang", description: "Bogenspiegel · Gold · Floristik", alt: "Goldener Bogenspiegel als elegante Empfangsdekoration" },
  { file: "castle-proposal", title: "Castle Promise", tag: "Evlilik Teklifi", description: "See · Schloss · Heiratsantrag", alt: "Romantischer Heiratsantrag am See vor einem Schloss" },
]);

export const giftDetails = createItems("gifts", [
  { file: "organza-bouquets", title: "Blush Bouquets", tag: "", description: "", alt: "Zarte Stoffbeutel mit Monogramm und Trockenblumen" },
  { file: "initials-bags", title: "Initials in Ivory", tag: "", description: "Kişiselleştirme yapılır", alt: "Elfenbeinfarbene Stoffbeutel mit Initialen" },
  { file: "floral-perfume", title: "A Little Scent", tag: "Gastgeschenk", description: "", alt: "Personalisierter Dudak Kalemi mit kleiner Blume" },
  { file: "pearl-bracelets", title: "Pearl Wishes", tag: "Gastgeschenk", description: "", alt: "Personalisierte Perlenarmbänder als Gastgeschenke" },
  { file: "burgundy-sets", title: "Burgundy Keepsake", tag: "Gastgeschenk", description: "", alt: "Bordeauxfarbene persönliche Gastgeschenk-Sets" },
  { file: "organza-flower", title: "Ivory Blossom", tag: "Gastgeschenk", description: "", alt: "Organza-Beutel mit elfenbeinfarbener Blume" },
  { file: "comb-rose", title: "Sweet Comb", tag: "Gastgeschenk", description: "", alt: "Kamm mit Rose als Gastgeschenk" },
  { file: "ivory-flower", title: "Cream Petals", tag: "Gastgeschenk", description: "", alt: "Elfenbeinfarbene Blumengeschenke mit Perlen" },
  { file: "blush-pouches", title: "Blush Pouches", tag: "Gastgeschenk", description: "", alt: "Rosa und weiße personalisierte Beutel" },
  { file: "henna-favors", title: "Henna Welcome", tag: "Gastgeschenk", description: "", alt: "Rote Gastgeschenke mit Zimtstange" },
  { file: "mint-jars", title: "Mint in a Jar", tag: "Gastgeschenk", description: "", alt: "Personalisierte kleine Gläser als Gastgeschenke" },
]);

export const ceremonyDetails = createItems("ceremony", [
  { file: "henna-tray", title: "Crimson Ritual", tag: "", description: "", alt: "Rotes florales Henna-Tablett mit Kerzen" },
  { file: "candle-tray", title: "Circle of Light", tag: "", description: "", alt: "Rundes rotes Kerzentablett für einen Hennaabend" },
  { file: "red-fan", title: "Scarlet Feather", tag: "Gelin Yelpazesi", description: "İsteğe göre kişiselleştirme yapılır", alt: "Roter Federfächer" },
  { file: "calla-bouquet", title: "Calla Pearl", tag: "", description: "", alt: "Weißer Calla-Brautstrauß mit Perlengriff" },
  { file: "custom-tef", title: "Burgundy Tef", tag: "Kiralama", description: "Kına gelinine özel tef · İsteğe göre kişiselleştirme yapılır", alt: "Bordeauxfarbenes personalisiertes Tef" },
  { file: "henna-coffee-set", title: "Henna Coffee", tag: "", description: "", alt: "Bordeaux-goldenes Henna-Kaffeeset" },
  { file: "white-tef", title: "White Satin Tef", tag: "", description: "", alt: "Weißes Tef mit Satinband" },
  { file: "lace-tef", title: "Ivory Lace Tef", tag: "", description: "", alt: "Cremefarbenes Tef mit Spitze" },
  { file: "sleep-masks", title: "Midnight Masks", tag: "", description: "İsteğe göre kişiselleştirme yapılır", alt: "Schwarze herzförmige Schlafmasken zur Miete" },
  { file: "red-headbands", title: "Crimson Crowns", tag: "", description: "", alt: "Rote florale Haarreifen" },
  { file: "white-halay", title: "White Halay", tag: "", description: "", alt: "Weiße Halay-Tücher an einem dekorativen Ständer" },
  { file: "dress-keepsakes", title: "Dress Keepsakes", tag: "", description: "", alt: "Bordeaux-grüne Halay-Mendili-Beispiele" },
  { file: "personalized-halay", title: "Names in Motion", tag: "Gastgeschenk", description: "", alt: "Personalisierte Halay-Tücher als Gastgeschenk" },
  { file: "green-candles", title: "Emerald Glow", tag: "Gastgeschenk", description: "", alt: "Grüne florale LED-Kerzen als Gastgeschenke" },
  { file: "rustic-candles", title: "Rustic Glow", tag: "Gastgeschenk", description: "", alt: "Rustikale LED-Kerzen mit Trockenblumen" },
  { file: "red-wood-fans", title: "Scarlet Breeze", tag: "Gastgeschenk", description: "", alt: "Personalisierbare Holzfächer mit roten Federn" },
  { file: "white-wood-fans", title: "Ivory Breeze", tag: "Gastgeschenk", description: "", alt: "Personalisierbare Holzfächer mit weißen Federn" },
  { file: "personalized-wood-fans", title: "A Name in the Breeze", tag: "Gastgeschenk", description: "", alt: "Personalisierte Holzfächer" },
  { file: "floral-ring-boxes", title: "Blooming Rings", tag: "", description: "", alt: "Ringboxen in einer floralen Inszenierung" },
  { file: "floral-ring-tray", title: "Garden Promise", tag: "", description: "", alt: "Florales Ringtablett für eine Verlobungszeremonie" },
  { file: "silver-ring-mirror", title: "Silver Promise", tag: "", description: "", alt: "Verspiegeltes Ringtablett mit silbernen Details" },
  { file: "gold-ring-boxes", title: "Golden Vow", tag: "", description: "", alt: "Goldene Glas-Ringboxen auf einem personalisierten Kissen" },
  { file: "gold-ring-tray", title: "Golden Initials", tag: "", description: "", alt: "Personalisiertes weiß-goldenes Ringtablett" },
  { file: "instant-memories", title: "Instant Memories", tag: "", description: "20 poz ile birlikte", alt: "Bunte Sofortbild- und Fotoecke" },
  { file: "guestbook-corner", title: "Guestbook Corner", tag: "", description: "", alt: "Gästebuch- und Fotoecke" },
  { file: "davul-personalized", title: "Davul Kiralama", tag: "", description: "İsteğe göre kişiselleştirme yapılır", alt: "Kişiselleştirilebilir kiralık davul" },
]);

const getGift = (title: string) => giftDetails.find((item) => item.title === title)!;
const getCeremony = (title: string) => ceremonyDetails.find((item) => item.title === title)!;

const guestbookForever = getGift("Guestbook Forever") ?? {
  id: "gifts-guestbook-forever",
  kind: "gifts" as const,
  file: "guestbook-frame",
  title: "Guestbook Forever",
  tag: "",
  description: "",
  alt: "Gerahmtes Gästebuch mit Foto",
};

const mandalTokaGift: GalleryItem = {
  ...getGift("Cream Petals"),
  id: "gift-mandal-toka",
  title: "Mandal Toka Örnekleri",
  tag: "",
  description: "",
};

const canvasBagGift: GalleryItem = {
  ...getGift("Initials in Ivory"),
  id: "gift-canvas-bag",
  title: "Linen Signature",
  tag: "",
  description: "İsteğe göre kişiselleştirme yapılır",
};

const hairClipGift: GalleryItem = {
  ...getCeremony("Crimson Crowns"),
  id: "gift-hair-clip",
  title: "Crimson Grace",
  tag: "",
  description: "",
};

export const giftCatalogItems: GalleryItem[] = [
  getGift("Pearl Wishes"),
  getGift("Burgundy Keepsake"),
  getGift("Blush Pouches"),
  getGift("Henna Welcome"),
  getGift("Initials in Ivory"),
  getGift("Blush Bouquets"),
  getGift("Ivory Blossom"),
  getGift("A Little Scent"),
  getGift("Sweet Comb"),
  mandalTokaGift,
  getCeremony("Names in Motion"),
  getCeremony("Emerald Glow"),
  getCeremony("Rustic Glow"),
  getCeremony("Scarlet Breeze"),
  getCeremony("Ivory Breeze"),
  getCeremony("A Name in the Breeze"),
  canvasBagGift,
  hairClipGift,
];

const crimsonGardenRental: GalleryItem = {
  ...backdropProjects[7],
  id: "rental-crimson-garden",
  tag: "",
  description: "Kırmızı Halı ve Kına Tahtı ayrı ayrı kiralanabilir.",
};

export const rentalCatalogGroups: CatalogGroup[] = [
  { id: "memories", title: "Erinnerungsecke", items: [guestbookForever, getCeremony("Instant Memories"), getCeremony("Guestbook Corner")] },
  { id: "henna-trays", title: "Kına Tepsisi Örnekleri", items: [getCeremony("Crimson Ritual"), getCeremony("Henna Coffee"), getCeremony("Circle of Light")] },
  { id: "bridal-accessories", title: "Gelin Aksesuarları", items: [getCeremony("Scarlet Feather"), getCeremony("Midnight Masks"), getCeremony("Crimson Crowns"), getCeremony("Calla Pearl")] },
  { id: "tef", title: "Tef Örnekleri / Vorlagen", items: [getCeremony("Burgundy Tef"), getCeremony("White Satin Tef"), getCeremony("Ivory Lace Tef")] },
  { id: "halay", title: "Halay Mendili Örnekleri", items: [getCeremony("White Halay"), getCeremony("Dress Keepsakes")] },
  { id: "ring-trays", title: "Yüzük Tepsisi Çeşitleri Örnekleri", items: [getCeremony("Blooming Rings"), getCeremony("Garden Promise"), getCeremony("Silver Promise"), getCeremony("Golden Vow"), getCeremony("Golden Initials")] },
  { id: "henna-stage", title: "Kına Tahtı & Kırmızı Halı", items: [crimsonGardenRental] },
  { id: "davul", title: "Davul Kiralama", items: [getCeremony("Davul Kiralama")] },
];

export const allProjects = [...decorBackdropProjects, ...tableProjects, ...welcomeProjects, ...receptionProjects];
export const allDetails = [...giftCatalogItems, ...rentalCatalogGroups.flatMap((group) => group.items)];
export const allGallery = [...allProjects, ...allDetails];
