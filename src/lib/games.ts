export type Genre =
  | "action"
  | "adventure"
  | "puzzle"
  | "racing"
  | "rpg"
  | "shooter"
  | "strategy";

export type Platform = "windows" | "mac" | "linux";

export type Game = {
  slug: string;
  title: string;
  studio: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  genre: Genre;
  tags: string[];
  platforms: Platform[];
  image: string;
  description: string;
  details: string;
  featured?: boolean;
  hero?: boolean;
  isNew?: boolean;
};

export const GENRES: { slug: Genre; label: string }[] = [
  { slug: "action", label: "Action" },
  { slug: "adventure", label: "Adventure" },
  { slug: "rpg", label: "RPG" },
  { slug: "strategy", label: "Strategy" },
  { slug: "shooter", label: "Shooter" },
  { slug: "racing", label: "Racing" },
  { slug: "puzzle", label: "Puzzle" },
];

export const games: Game[] = [
  {
    slug: "neon-drift",
    title: "Neon Drift",
    studio: "Nightline Games",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    ratingCount: 12840,
    genre: "racing",
    tags: ["arcade", "cyberpunk", "multiplayer"],
    platforms: ["windows", "mac"],
    image: "/games/neon-drift.jpg",
    description:
      "Street racing through a rain-soaked megacity. Tune, drift, and outrun the grid.",
    details:
      "Build a garage of street machines, race across twelve neon districts, and climb the Nightline ladder. Supports split-screen and online lobbies. Wheel and controller support included.",
    featured: true,
    hero: true,
  },
  {
    slug: "hollow-crown",
    title: "Hollow Crown",
    studio: "Ashmere",
    price: 49.99,
    rating: 4.9,
    ratingCount: 8640,
    genre: "rpg",
    tags: ["dark fantasy", "story", "singleplayer"],
    platforms: ["windows"],
    image: "/games/hollow-crown.jpg",
    description:
      "A fallen monarch walks a ruined kingdom. Choices cut deeper than the sword.",
    details:
      "A narrative RPG of ruined courts and broken oaths. Explore a connected world, recruit fractured companions, and decide who wears the crown. Combat mixes real-time positioning with pause tactics.",
    featured: true,
  },
  {
    slug: "tidebound",
    title: "Tidebound",
    studio: "Salt & Sail",
    price: 19.99,
    rating: 4.6,
    ratingCount: 5321,
    genre: "adventure",
    tags: ["exploration", "sailing", "story"],
    platforms: ["windows", "mac", "linux"],
    image: "/games/tidebound.jpg",
    description:
      "Chart luminous seas toward a temple the tide was never meant to reveal.",
    details:
      "Sail, dive, and map a chain of forgotten isles. Weather shifts the routes, and the ocean keeps its own calendar. A quiet adventure about navigation, salvage, and the people who live between storms.",
  },
  {
    slug: "orbit-echo",
    title: "Orbit Echo",
    studio: "Lagrange",
    price: 24.99,
    rating: 4.5,
    ratingCount: 4102,
    genre: "adventure",
    tags: ["sci-fi", "exploration", "mystery"],
    platforms: ["windows", "mac"],
    image: "/games/orbit-echo.jpg",
    description:
      "A silent station. A dying giant. One last transmission from the ring.",
    details:
      "Investigate a derelict orbital habitat as systems fail around you. Zero-g traversal, environmental puzzles, and recovered logs piece together why the crew never came home.",
    featured: true,
  },
  {
    slug: "paper-siege",
    title: "Paper Siege",
    studio: "Foldline",
    price: 9.99,
    originalPrice: 14.99,
    rating: 4.4,
    ratingCount: 9904,
    genre: "strategy",
    tags: ["tactics", "turn-based", "co-op"],
    platforms: ["windows", "mac", "linux"],
    image: "/games/paper-siege.jpg",
    description:
      "Command origami armies across a tabletop world that folds as you fight.",
    details:
      "A light tactics game of paper units, clever terrain, and short campaigns. Play solo or pass-and-play. Each map is a diorama you can crease, tear, and rebuild.",
  },
  {
    slug: "night-market",
    title: "Night Market",
    studio: "Lantern House",
    price: 19.99,
    rating: 4.8,
    ratingCount: 7210,
    genre: "action",
    tags: ["stealth", "immersive sim"],
    platforms: ["windows"],
    image: "/games/night-market.jpg",
    description:
      "Slip through lantern-lit alleys. Steal a name, return a debt, vanish in steam.",
    details:
      "A dense stealth sandbox set in a single rain-soaked market district. Multiple routes, social disguises, and systems that remember how you moved last night.",
  },
  {
    slug: "ember-protocol",
    title: "Ember Protocol",
    studio: "Kiln",
    price: 39.99,
    rating: 4.3,
    ratingCount: 15602,
    genre: "shooter",
    tags: ["campaign", "co-op", "sci-fi"],
    platforms: ["windows"],
    image: "/games/ember-protocol.jpg",
    description:
      "Push through a burning industrial complex before the core goes critical.",
    details:
      "A campaign shooter built for two-to-four player co-op. Loadouts, destructible cover, and set-piece corridors that collapse as the heat rises. Offline campaign included.",
  },
  {
    slug: "lumen-vale",
    title: "Lumen Vale",
    studio: "Mosslight",
    price: 8.99,
    rating: 4.8,
    ratingCount: 3401,
    genre: "puzzle",
    tags: ["cozy", "exploration", "relaxing"],
    platforms: ["windows", "mac", "linux"],
    image: "/games/lumen-vale.jpg",
    description:
      "Walk a valley of giant mushrooms and wake the lights the forest forgot.",
    details:
      "A gentle puzzle walkabout. Place lanterns, follow spores, and restore a living map. No timers, no fail states — just a place to wander and a few quiet mysteries.",
    isNew: true,
  },
  {
    slug: "iron-hymn",
    title: "Iron Hymn",
    studio: "Vesper Works",
    price: 34.99,
    rating: 4.6,
    ratingCount: 2877,
    genre: "action",
    tags: ["mechs", "boss fights", "singleplayer"],
    platforms: ["windows"],
    image: "/games/iron-hymn.jpg",
    description:
      "Pilot a cathedral-forged mech through a winter city of duels and hymns.",
    details:
      "Weighty melee-ranged mech combat against named rivals. Customize frames between bouts, learn each opponent’s cadence, and take the plaza. A focused action campaign — no open world.",
    featured: true,
    isNew: true,
  },
  {
    slug: "skyward-keep",
    title: "Skyward Keep",
    studio: "Cloudstep",
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.5,
    ratingCount: 6118,
    genre: "adventure",
    tags: ["platformer", "colorful", "family"],
    platforms: ["windows", "mac"],
    image: "/games/skyward-keep.jpg",
    description:
      "Leap island to island toward a castle that refuses to stay still.",
    details:
      "A bright precision platformer of floating isles, wind currents, and collectible maps. Assist options for younger players, and a time-trial mode for everyone else.",
    isNew: true,
  },
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function isGenre(value: string | undefined): value is Genre {
  return GENRES.some((genre) => genre.slug === value);
}

export function relatedGames(game: Game, limit = 4) {
  return games.filter((item) => item.slug !== game.slug && item.genre === game.genre).slice(0, limit);
}

export function filterGames({ q, genre }: { q?: string; genre?: string }) {
  const query = q?.trim().toLowerCase();
  return games.filter((game) => {
    if (genre && isGenre(genre) && game.genre !== genre) return false;
    if (!query) return true;
    return (
      game.title.toLowerCase().includes(query) ||
      game.studio.toLowerCase().includes(query) ||
      game.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
}
