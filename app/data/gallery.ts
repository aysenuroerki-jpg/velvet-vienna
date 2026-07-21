export type GalleryKind = "backdrops" | "tables" | "gifts" | "ceremony";

export type GalleryItem = {
  id: string;
  title: string;
  kind: GalleryKind;
  file: string;
  tag: string;
  description: string;
  alt: string;
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
  { file: "pampas-heart", title: "Pampas Heart", tag: "Hennaabend", description: "Herzbogen · Pampas · Rot", alt: "Roter Pampas-Herzbogen für einen Hennaabend" },
  { file: "heart-curtain", title: "Heart Curtain", tag: "Feier", description: "Stoff · Herzen · Licht", alt: "Weiße Vorhangkulisse mit roten Herzen" },
  { file: "blue-drapery", title: "Blue Drapery", tag: "Verlobung", description: "Blau · Rosa · Blumen", alt: "Blaue drapierte Verlobungskulisse mit Blumen" },
  { file: "burgundy-circle", title: "Burgundy Circle", tag: "Verlobung", description: "Rundbogen · Stoff · Blumen", alt: "Bordeauxfarbene Rundbogen-Kulisse" },
  { file: "kina-welcome", title: "Kına Welcome", tag: "Empfang", description: "Empfang · Tücher · Spiegel", alt: "Roter Henna-Empfangstisch im Freien" },
  { file: "burgundy-welcome", title: "Burgundy Welcome", tag: "Empfang", description: "Blumen · Schleifen · Kerzen", alt: "Bordeauxfarbene Empfangskulisse mit Kerzen" },
]);

export const tableProjects = createItems("tables", [
  { file: "memory-table", title: "Memory Table", tag: "Empfang", description: "Karten · Kerzen · Blumen", alt: "Bordeauxfarbener Erinnerungstisch" },
  { file: "burgundy-sweets", title: "Burgundy Sweets", tag: "Tisch", description: "Dessert · Textil · Kerzen", alt: "Sweet Table mit bordeauxfarbenem Tischläufer" },
  { file: "sweet-gathering", title: "Sweet Gathering", tag: "Hochzeit", description: "Buffet · Blumen · Präsentation", alt: "Hochzeitsbuffet mit Cupcakes und Süßigkeiten" },
  { file: "rustic-table", title: "Rustic Table", tag: "Tisch", description: "Holz · Blumen · Kerzen", alt: "Rustikale Tischdekoration mit Blumen und Holz" },
  { file: "at-your-place", title: "At Your Place", tag: "Tisch", description: "Serviette · Namenskarte", alt: "Personalisierte Serviette und Tischkarte" },
]);

export const giftDetails = createItems("gifts", [
  { file: "organza-bouquets", title: "Blush Bouquets", tag: "Gastgeschenk", description: "Organza · Trockenblumen", alt: "Zarte Gastgeschenk-Beutel mit Trockenblumen" },
  { file: "initials-bags", title: "Initials in Ivory", tag: "Personalisierung", description: "Stoffbeutel · Monogramm", alt: "Elfenbeinfarbene Stoffbeutel mit Initialen" },
  { file: "floral-perfume", title: "A Little Scent", tag: "Gastgeschenk", description: "Mini-Parfum · Blume", alt: "Personalisiertes Mini-Parfum mit kleiner Blume" },
  { file: "pearl-bracelets", title: "Pearl Wishes", tag: "Gastgeschenk", description: "Perlen · Karten · Blumen", alt: "Personalisierte Perlenarmbänder als Gastgeschenke" },
  { file: "burgundy-sets", title: "Burgundy Keepsake", tag: "Gastgeschenk", description: "Satin · Glas · Personalisierung", alt: "Bordeauxfarbene persönliche Gastgeschenk-Sets" },
  { file: "organza-flower", title: "Ivory Blossom", tag: "Gastgeschenk", description: "Organza · Blume", alt: "Organza-Beutel mit elfenbeinfarbener Blume" },
  { file: "comb-rose", title: "Sweet Comb", tag: "Hennaabend", description: "Kamm · Rose · Mini-Flakon", alt: "Kamm mit Rose und kleinem Duftflakon" },
  { file: "ivory-flower", title: "Cream Petals", tag: "Gastgeschenk", description: "Perlen · Blume · Karte", alt: "Elfenbeinfarbene Blumengeschenke mit Perlen" },
  { file: "blush-pouches", title: "Blush Pouches", tag: "Gastgeschenk", description: "Satin · Tüll · Namen", alt: "Rosa und weiße personalisierte Beutel" },
  { file: "henna-favors", title: "Henna Welcome", tag: "Hennaabend", description: "Tuch · Zimt · Rot", alt: "Rote Henna-Gastgeschenke mit Zimtstange" },
  { file: "fortune-cookies", title: "Sweet Messages", tag: "Gastgeschenk", description: "Glückskeks · Botschaft", alt: "Personalisierte Glückskekse" },
  { file: "ivory-pouches", title: "Ivory Promise", tag: "Hochzeit", description: "Satin · Ring · Tüll", alt: "Weiße Gastgeschenke in transparentem Tüll" },
  { file: "olive-favors", title: "Olive & Ivory", tag: "Gastgeschenk", description: "Leinen · Satin · Anhänger", alt: "Olivefarbene und cremefarbene Geschenkbeutel" },
  { file: "emerald-pouches", title: "Emerald Details", tag: "Gastgeschenk", description: "Leinen · Smaragd · Gold", alt: "Cremefarbene Beutel mit smaragdgrünen Schleifen" },
  { file: "tulle-rose", title: "Tulle & Rose", tag: "Hochzeit", description: "Tüll · Blume · Holz", alt: "Tüllsäckchen mit kleiner Rose und Holzanhänger" },
  { file: "mint-jars", title: "Mint in a Jar", tag: "Gastgeschenk", description: "Mini-Glas · Etikett", alt: "Personalisierte kleine Gläser als Gastgeschenke" },
  { file: "sweet-messages", title: "Golden Fortune", tag: "Hochzeit", description: "Glückskeks · Goldschrift", alt: "Glückskekse mit goldener Willkommensbotschaft" },
  { file: "guestbook-frame", title: "Guestbook Forever", tag: "Erinnerung", description: "Gästebuch · Foto · Rahmen", alt: "Gerahmtes Gästebuch mit Foto" },
]);

export const ceremonyDetails = createItems("ceremony", [
  { file: "henna-tray", title: "Crimson Ritual", tag: "Henna", description: "Tablett · Blumen · Kerzen", alt: "Rotes florales Henna-Tablett mit Kerzen" },
  { file: "candle-tray", title: "Circle of Light", tag: "Henna", description: "Kerzen · Blumen · Rot", alt: "Rundes rotes Kerzentablett für einen Hennaabend" },
  { file: "red-fan", title: "Scarlet Feather", tag: "Accessoire", description: "Federfächer · Rot", alt: "Roter Federfächer" },
  { file: "calla-bouquet", title: "Calla Pearl", tag: "Brautstrauß", description: "Calla · Perlen · Satin", alt: "Weißer Calla-Brautstrauß mit Perlengriff" },
  { file: "custom-tef", title: "Burgundy Tef", tag: "Verleih", description: "Tef · Spitze · Personalisierung", alt: "Bordeauxfarbenes personalisiertes Tef" },
  { file: "henna-coffee-set", title: "Henna Coffee", tag: "Verleih", description: "Kaffeeset · Gold · Bordeaux", alt: "Bordeaux-goldenes Henna-Kaffeeset" },
  { file: "white-tef", title: "White Satin Tef", tag: "Verleih", description: "Satin · Schleife · Perlen", alt: "Weißes Tef mit Satinband" },
  { file: "lace-tef", title: "Ivory Lace Tef", tag: "Verleih", description: "Spitze · Creme · Silber", alt: "Cremefarbenes Tef mit Spitze" },
  { file: "sleep-masks", title: "Midnight Masks", tag: "Gastgeschenk", description: "Samt · Herz · Monogramm", alt: "Schwarze herzförmige Schlafmasken als Gastgeschenk" },
  { file: "red-headbands", title: "Crimson Crowns", tag: "Henna", description: "Blumen · Haarreif · Rot", alt: "Rote florale Haarreifen" },
  { file: "white-halay", title: "White Halay", tag: "Tanz", description: "Tücher · Spitze · Präsentation", alt: "Weiße Halay-Tücher an einem dekorativen Ständer" },
  { file: "dress-keepsakes", title: "Dress Keepsakes", tag: "Gastgeschenk", description: "Satin · Anhänger · Gold", alt: "Bordeaux-grüne Kleid-Anhänger" },
  { file: "personalized-halay", title: "Names in Motion", tag: "Tanz", description: "Halay-Tuch · Namen · Gold", alt: "Personalisierte Halay-Tücher" },
  { file: "green-candles", title: "Emerald Glow", tag: "Tischgeschenk", description: "LED-Kerzen · Blumen · Grün", alt: "Grüne florale LED-Kerzen als Gastgeschenke" },
  { file: "rustic-candles", title: "Rustic Glow", tag: "Tischgeschenk", description: "Holz · Trockenblumen · Licht", alt: "Rustikale LED-Kerzen mit Trockenblumen" },
  { file: "red-wood-fans", title: "Scarlet Breeze", tag: "Fächer", description: "Holz · Federn · Rot", alt: "Personalisierbare Holzfächer mit roten Federn" },
  { file: "white-wood-fans", title: "Ivory Breeze", tag: "Fächer", description: "Holz · Federn · Weiß", alt: "Personalisierbare Holzfächer mit weißen Federn" },
  { file: "personalized-wood-fans", title: "A Name in the Breeze", tag: "Fächer", description: "Holz · Schleife · Namen", alt: "Personalisierte Holzfächer" },
  { file: "davul-rental", title: "Davul", tag: "Verleih", description: "Henna · Hochzeit · Einzug", alt: "Traditioneller Davul zur Miete in Wien" },
  { file: "floral-ring-boxes", title: "Blooming Rings", tag: "Trauung", description: "Ringboxen · Blumen · Perlen", alt: "Ringboxen in einer floralen Inszenierung" },
  { file: "floral-ring-tray", title: "Garden Promise", tag: "Trauung", description: "Ringe · Blumen · Perlen", alt: "Florales Ringtablett für eine Verlobungszeremonie" },
  { file: "silver-ring-mirror", title: "Silver Promise", tag: "Trauung", description: "Spiegel · Silber · Perlen", alt: "Verspiegeltes Ringtablett mit silbernen Details" },
  { file: "gold-ring-boxes", title: "Golden Vow", tag: "Trauung", description: "Ringboxen · Glas · Gold", alt: "Goldene Glas-Ringboxen auf einem personalisierten Kissen" },
  { file: "gold-ring-tray", title: "Golden Initials", tag: "Trauung", description: "Tablett · Gold · Monogramm", alt: "Personalisiertes weiß-goldenes Ringtablett" },
  { file: "instant-memories", title: "Instant Memories", tag: "Fotoecke", description: "Instax · Karten · Blumen", alt: "Bunte Sofortbild- und Fotoecke" },
  { file: "guestbook-corner", title: "Guestbook Corner", tag: "Fotoecke", description: "Gästebuch · Sofortbilder", alt: "Gästebuch- und Fotoecke" },
]);

export const allProjects = [...backdropProjects, ...tableProjects];
export const allDetails = [...giftDetails, ...ceremonyDetails];
export const allGallery = [...allProjects, ...allDetails];
