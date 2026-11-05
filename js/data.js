// Fictional sample data for the prototype. Swap this module for an API call
// in the full build; every page reads properties through these helpers only.

export const DESTINATIONS = [
  { name: 'Colombo', blurb: 'City stays, colonial cafés and the Galle Face sunset.' },
  { name: 'Kandy', blurb: 'Hill-country calm beside the sacred lake.' },
  { name: 'Ella', blurb: 'Tea slopes, train rides and misty valley mornings.' },
  { name: 'Galle', blurb: 'Dutch-fort lanes and ocean-facing courtyards.' },
  { name: 'Mirissa', blurb: 'Surf, whales and slow beach afternoons.' },
  { name: 'Nuwara Eliya', blurb: 'Cool air, colonial bungalows and green tea country.' },
  { name: 'Sigiriya', blurb: 'Rock fortress views and jungle-edge villas.' },
  { name: 'Unawatuna', blurb: 'A sheltered bay made for easy swims.' },
];

const img = (id, n) => `assets/img/${id}-${n}.jpg`;

const raw = [
  {
    id: 'cinnamon-ridge-villa',
    name: 'Cinnamon Ridge Villa',
    destination: 'Ella',
    area: 'Ella Gap, Badulla District',
    type: 'Villa',
    price: 34500,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.9,
    reviews: 128,
    tagline: 'A three-bedroom villa above the tea terraces.',
    description:
      'Perched on a ridge with Ella Gap unfolding below, this three-bedroom villa pairs timber floors and open verandas with a plunge pool that faces the sunrise. Mornings begin with breakfast on the terrace; the Nine Arch Bridge is a twenty-minute walk through the tea estate.',
    amenities: ['wifi', 'pool', 'ac', 'parking', 'breakfast', 'kitchen'],
  },
  {
    id: 'lakeview-heritage-kandy',
    name: 'Lakeview Heritage House',
    destination: 'Kandy',
    area: 'Hanthana Road, Kandy',
    type: 'Boutique Hotel',
    price: 21800,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.7,
    reviews: 86,
    tagline: 'A restored colonial home with lake and temple views.',
    description:
      'A 1930s planter\'s house restored room by room, with wide shuttered windows looking over Kandy Lake. A short tuk-tuk ride reaches the Temple of the Tooth, and the garden is the quietest place in town for an evening cup of Ceylon tea.',
    amenities: ['wifi', 'ac', 'parking', 'breakfast', 'garden'],
  },
  {
    id: 'fort-courtyard-galle',
    name: 'Fort Courtyard Residence',
    destination: 'Galle',
    area: 'Church Street, Galle Fort',
    type: 'Holiday Home',
    price: 42000,
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.8,
    reviews: 154,
    tagline: 'A Dutch-era home inside the ramparts.',
    description:
      'Step off the cobbled lane into a cool inner courtyard shaded by frangipani. Three air-conditioned bedrooms, a long dining table and a rooftop that catches the lighthouse at dusk. Cafés, galleries and the ramparts are all on your doorstep.',
    amenities: ['wifi', 'ac', 'kitchen', 'breakfast', 'garden'],
  },
  {
    id: 'coral-bay-mirissa',
    name: 'Coral Bay Beach Cabanas',
    destination: 'Mirissa',
    area: 'Mirissa Beach, Matara District',
    type: 'Beach Cabana',
    price: 16900,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.6,
    reviews: 203,
    tagline: 'Barefoot cabanas thirty steps from the surf.',
    description:
      'Simple, airy cabanas built from reclaimed teak, set in a coconut grove right behind the sand. Wake to the sound of waves, join an early whale-watching boat, then spend the afternoon in a hammock with a king coconut.',
    amenities: ['wifi', 'ac', 'breakfast', 'beach'],
  },
  {
    id: 'pine-hill-bungalow',
    name: 'Pine Hill Bungalow',
    destination: 'Nuwara Eliya',
    area: 'Gregory Lake Road, Nuwara Eliya',
    type: 'Bungalow',
    price: 27500,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.8,
    reviews: 71,
    tagline: 'Fireplaces, rose gardens and tea-country chill.',
    description:
      'A stone bungalow from the British era, now warmed with wood fires, wool throws and a kitchen that cooks on request. The garden slopes toward Gregory Lake and the tea factory is a short stroll uphill.',
    amenities: ['wifi', 'parking', 'breakfast', 'kitchen', 'garden', 'fireplace'],
  },
  {
    id: 'galle-face-suites',
    name: 'Galle Face Sky Suites',
    destination: 'Colombo',
    area: 'Colombo 03',
    type: 'Apartment',
    price: 24900,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.5,
    reviews: 112,
    tagline: 'A high-floor apartment facing the Indian Ocean.',
    description:
      'Floor-to-ceiling glass, a full kitchen and a rooftop pool, with Galle Face Green and the city\'s best restaurants minutes away. Ideal for a stopover or a business-meets-leisure stay.',
    amenities: ['wifi', 'pool', 'ac', 'parking', 'kitchen', 'gym'],
  },
  {
    id: 'rock-view-sigiriya',
    name: 'Rock View Jungle Lodge',
    destination: 'Sigiriya',
    area: 'Sigiriya, Matale District',
    type: 'Eco Lodge',
    price: 19500,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.7,
    reviews: 64,
    tagline: 'Treetop rooms with Lion Rock on the horizon.',
    description:
      'Two raised lodges built among jackfruit and teak trees, each with a deck that looks toward Sigiriya Rock. Bird-watching starts at the door, and the lodge arranges sunrise climbs, village cycling and cooking lessons.',
    amenities: ['wifi', 'pool', 'ac', 'parking', 'breakfast', 'garden'],
  },
  {
    id: 'unawatuna-bay-house',
    name: 'Bay House Unawatuna',
    destination: 'Unawatuna',
    area: 'Rumassala Road, Unawatuna',
    type: 'Holiday Home',
    price: 31000,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.6,
    reviews: 97,
    tagline: 'A four-bedroom family house above the bay.',
    description:
      'Room for the whole group: four bedrooms, a shared pool and a lawn that runs to the edge of the jungle. The beach is a five-minute walk, and the host can arrange a private chef or a snorkelling trip.',
    amenities: ['wifi', 'pool', 'ac', 'parking', 'kitchen', 'beach'],
  },
];

export const PROPERTIES = raw.map((p) => ({
  ...p,
  images: [1, 2, 3, 4].map((n) => img(p.id, n)),
  // 640px version of the cover photo, used by cards so phones don't download the large file
  cover: { small: `assets/img/${p.id}-1-sm.jpg`, large: img(p.id, 1) },
}));

export const coverSrcset = (p) => `${p.cover.small} 640w, ${p.cover.large} 1200w`;

export const AMENITY_LABELS = {
  wifi: 'Free Wi-Fi',
  pool: 'Swimming pool',
  ac: 'Air conditioning',
  parking: 'Free parking',
  breakfast: 'Breakfast included',
  kitchen: 'Full kitchen',
  garden: 'Private garden',
  beach: 'Walk to the beach',
  fireplace: 'Fireplace',
  gym: 'Gym access',
};

export const getProperty = (id) => PROPERTIES.find((p) => p.id === id);

export const formatLKR = (n) => `LKR ${Number(n).toLocaleString('en-LK')}`;
