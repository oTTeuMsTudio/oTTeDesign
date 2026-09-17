export type ProductType =
  | "3d"
  | "environments"
  | "materials"
  | "characters"
  | "vfx"
  | "vegetation"
  | "vehicles";

export type Channel = "unreal" | "unity" | "blender" | "universal";

export type License = "personal" | "professional";

export type Product = {
  slug: string;
  title: string;
  publisher: string;
  publisherSlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  type: ProductType;
  channels: Channel[];
  tags: string[];
  formats: string[];
  image: string;
  description: string;
  details: string;
  style: "realistic" | "stylized" | "lowpoly";
  triangles: string;
  featured?: boolean;
  freeThisMonth?: boolean;
  isNew?: boolean;
  hero?: boolean;
};

export const PRODUCT_TYPES: { slug: ProductType; label: string }[] = [
  { slug: "3d", label: "3D" },
  { slug: "environments", label: "Environments" },
  { slug: "materials", label: "Materials" },
  { slug: "characters", label: "Characters" },
  { slug: "vfx", label: "VFX" },
  { slug: "vegetation", label: "Vegetation" },
  { slug: "vehicles", label: "Vehicles" },
];

export const CHANNELS: { slug: Channel; label: string }[] = [
  { slug: "unreal", label: "Unreal Engine" },
  { slug: "unity", label: "Unity" },
  { slug: "blender", label: "Blender" },
  { slug: "universal", label: "Universal" },
];

export const products: Product[] = [
  {
    slug: "cedar-shrine-forest",
    title: "Cedar Shrine Forest",
    publisher: "Ash & Cedar",
    publisherSlug: "ash-and-cedar",
    price: 79,
    originalPrice: 119,
    rating: 4.9,
    ratingCount: 1842,
    type: "environments",
    channels: ["unreal", "unity", "universal"],
    tags: ["forest", "japan", "fog", "temple", "nanite"],
    formats: ["Unreal", "FBX", "glTF", "USD"],
    image: "/products/cedar-shrine.jpg",
    description:
      "A dawn-lit cedar shrine forest built for real-time. Moss, wet stone, and volumetric fog — game-ready and film-ready.",
    details:
      "Includes Nanite-ready meshes, tiled moss and bark materials, wind-animated foliage, and a complete lighting scenario for Unreal Engine 5. Universal FBX and glTF exports are included for DCC and other engines. Optimized collision, distance meshes, and a 4K texture set ship with every format.",
    style: "realistic",
    triangles: "2.4M (Nanite)",
    featured: true,
    hero: true,
    isNew: true,
  },
  {
    slug: "neon-courier",
    title: "Neon Courier",
    publisher: "Voltform",
    publisherSlug: "voltform",
    price: 49,
    rating: 4.8,
    ratingCount: 966,
    type: "characters",
    channels: ["unreal", "unity", "blender"],
    tags: ["scifi", "character", "armor", "rigged"],
    formats: ["Unreal", "FBX", "glTF"],
    image: "/products/neon-courier.jpg",
    description:
      "A fully rigged night-runner in matte armor and a cyan visor. Built for cinematics and third-person gameplay.",
    details:
      "Epic skeleton compatible, 4K PBR textures, modular visor and pack variants, and a 72-animation locomotion set. Blendshapes for visor glow. Unity Humanoid and Blender Control Rig files included.",
    style: "realistic",
    triangles: "86k",
    featured: true,
    hero: true,
  },
  {
    slug: "velvet-lounge",
    title: "Velvet Lounge Collection",
    publisher: "Studio Meridian",
    publisherSlug: "studio-meridian",
    price: 39,
    rating: 4.7,
    ratingCount: 512,
    type: "3d",
    channels: ["unreal", "blender", "universal"],
    tags: ["interior", "furniture", "archviz", "velvet"],
    formats: ["FBX", "glTF", "USDZ"],
    image: "/products/velvet-lounge.jpg",
    description:
      "Twenty-four mid-century seating, table, and lighting pieces with calibrated velvet, brass, and marble materials.",
    details:
      "Each asset includes LODs, lightmap UVs, and colliders. Materials are fully parametric in Unreal and Blender. Ideal for residential archviz, hotel lobbies, and narrative interiors.",
    style: "realistic",
    triangles: "12k avg",
    featured: true,
  },
  {
    slug: "brass-and-stone",
    title: "Brushed Brass & Stone",
    publisher: "Lumen Foundry",
    publisherSlug: "lumen-foundry",
    price: 0,
    rating: 4.6,
    ratingCount: 3201,
    type: "materials",
    channels: ["unreal", "unity", "universal"],
    tags: ["pbr", "brass", "marble", "terrazzo"],
    formats: ["Unreal", "Substance", "PNG"],
    image: "/products/brass-materials.jpg",
    description:
      "A free PBR set of brass, terrazzo, marble, concrete, and velvet — 4K, tileable, and production-tested.",
    details:
      "Sixteen tileable materials with ORM packing, height, and optional tessellation. Unreal Master Material with wear, wetness, and tint controls. Unity HDRP/URP graphs included.",
    style: "realistic",
    triangles: "n/a",
    featured: true,
    freeThisMonth: true,
  },
  {
    slug: "brutalist-housing",
    title: "Modular Brutalist Housing",
    publisher: "Kite & Kiln",
    publisherSlug: "kite-and-kiln",
    price: 149,
    originalPrice: 189,
    rating: 4.9,
    ratingCount: 704,
    type: "environments",
    channels: ["unreal", "unity"],
    tags: ["city", "modular", "concrete", "dusk"],
    formats: ["Unreal", "FBX"],
    image: "/products/brutalist-housing.jpg",
    description:
      "A modular concrete housing kit: towers, plazas, skybridges, and night interiors that snap on a 2-meter grid.",
    details:
      "140 unique modules, vertex-painted concrete, emissive apartment interiors, and a dusk lighting scenario. Designed for open-world streaming and cinematic establishing shots.",
    style: "realistic",
    triangles: "Nanite",
    featured: true,
    hero: true,
  },
  {
    slug: "analog-camera-kit",
    title: "Analog Camera Kit",
    publisher: "Northwind Atelier",
    publisherSlug: "northwind-atelier",
    price: 19,
    rating: 4.5,
    ratingCount: 288,
    type: "3d",
    channels: ["universal", "blender"],
    tags: ["props", "camera", "vintage", "scans"],
    formats: ["FBX", "glTF", "USDZ", "Blend"],
    image: "/products/vintage-cameras.jpg",
    description:
      "Scanned rangefinders, brass lenses, film canisters, and leather straps — hero props for tabletop and set dressing.",
    details:
      "Photogrammetry cleaned in ZBrush with baked 8K maps. Separate movable parts for lenses and backs. Collision and decimated realtime meshes included.",
    style: "realistic",
    triangles: "48k–220k",
    isNew: true,
  },
  {
    slug: "tempest-sky",
    title: "Tempest Sky VFX",
    publisher: "Voltform",
    publisherSlug: "voltform",
    price: 29,
    rating: 4.8,
    ratingCount: 1190,
    type: "vfx",
    channels: ["unreal", "unity"],
    tags: ["lightning", "weather", "niagara", "storm"],
    formats: ["Unreal", "Unity"],
    image: "/products/storm-vfx.jpg",
    description:
      "A cinematic storm system: volumetric clouds, bolt meshes, rain sheets, and ocean response.",
    details:
      "Niagara and VFX Graph systems with director-facing intensity controls. Includes lightning decals, thunder cues, and a sample ocean level.",
    style: "realistic",
    triangles: "n/a",
    featured: true,
  },
  {
    slug: "coral-atoll",
    title: "Coral Atoll Kit",
    publisher: "Kite & Kiln",
    publisherSlug: "kite-and-kiln",
    price: 0,
    originalPrice: 24,
    rating: 4.7,
    ratingCount: 2560,
    type: "environments",
    channels: ["unreal", "unity", "universal"],
    tags: ["island", "stylized", "water", "lowpoly"],
    formats: ["Unreal", "FBX", "glTF"],
    image: "/products/lowpoly-island.jpg",
    description:
      "A stylized tropical atoll — palms, docks, huts, and crystal water. Free this month.",
    details:
      "Hand-painted atlas textures, vertex-color water, and a toy-like lighting preset. Perfect for mobile, UEFN islands, and prototyping.",
    style: "lowpoly",
    triangles: "86k scene",
    freeThisMonth: true,
    featured: true,
  },
  {
    slug: "alpine-cabin",
    title: "Alpine Cabin",
    publisher: "Ash & Cedar",
    publisherSlug: "ash-and-cedar",
    price: 59,
    rating: 4.8,
    ratingCount: 431,
    type: "environments",
    channels: ["unreal", "blender"],
    tags: ["snow", "cabin", "interior", "landscape"],
    formats: ["Unreal", "FBX", "glTF"],
    image: "/products/alpine-cabin.jpg",
    description:
      "A twilight alpine cabin with dressed interiors, snowscape, and warm practical lights.",
    details:
      "Exterior landscape, fully modeled interior, tiled snow materials, and a dusk/night lighting pair. Includes fireplace VFX and hero furniture.",
    style: "realistic",
    triangles: "1.1M (Nanite)",
    isNew: true,
  },
  {
    slug: "dust-road-outpost",
    title: "Dust Road Outpost",
    publisher: "Northwind Atelier",
    publisherSlug: "northwind-atelier",
    price: 44,
    originalPrice: 62,
    rating: 4.4,
    ratingCount: 157,
    type: "environments",
    channels: ["unreal", "unity"],
    tags: ["desert", "outpost", "western", "modular"],
    formats: ["Unreal", "FBX"],
    image: "/products/desert-outpost.jpg",
    description:
      "Weathered adobe, rusty tanks, and a golden-hour desert outpost ready to drop into an open world.",
    details:
      "Modular walls and roofs, sand-layer vertex painting, and a wind-driven dust Niagara emitter. Collision and navmesh-ready ground.",
    style: "realistic",
    triangles: "640k",
  },
  {
    slug: "copper-kitchen-scans",
    title: "Copper Kitchen Scans",
    publisher: "Studio Meridian",
    publisherSlug: "studio-meridian",
    price: 15,
    rating: 4.6,
    ratingCount: 890,
    type: "3d",
    channels: ["universal", "blender"],
    tags: ["scans", "props", "kitchen", "hero"],
    formats: ["FBX", "glTF", "USDZ"],
    image: "/products/kitchenware.jpg",
    description:
      "A hero scan pack of copper pans, ceramics, glass, and utensils for food and interior scenes.",
    details:
      "Clean topology variants plus raw high-poly. 8K textures, calibrated metalness, and USDZ previews for AR.",
    style: "realistic",
    triangles: "20k–90k",
    isNew: true,
  },
  {
    slug: "nightline-gt",
    title: "Nightline GT",
    publisher: "Voltform",
    publisherSlug: "voltform",
    price: 69,
    rating: 4.9,
    ratingCount: 1504,
    type: "vehicles",
    channels: ["unreal", "unity"],
    tags: ["car", "synthwave", "drivable", "interior"],
    formats: ["Unreal", "FBX"],
    image: "/products/synthwave-car.jpg",
    description:
      "A drivable retro-future GT with a full interior, emissive lighting, and paint-shop materials.",
    details:
      "Physics setup for Chaos and Unity WheelColliders, 4K trim sheets, and interchangeable body kits. Includes a night studio showcase level.",
    style: "realistic",
    triangles: "124k",
    featured: true,
  },
  {
    slug: "painters-grove",
    title: "Painter's Grove",
    publisher: "Ash & Cedar",
    publisherSlug: "ash-and-cedar",
    price: 0,
    rating: 4.5,
    ratingCount: 2104,
    type: "vegetation",
    channels: ["unreal", "unity", "universal"],
    tags: ["trees", "stylized", "foliage", "forest"],
    formats: ["Unreal", "FBX", "glTF"],
    image: "/products/stylized-trees.jpg",
    description:
      "A painterly tree pack — oaks, pines, and birches with summer and autumn variants. Free forever.",
    details:
      "Wind shaders, impostors, and a dense forest example. Atlas and unique-texture versions for both mobile and cinematic.",
    style: "stylized",
    triangles: "4k–18k",
    freeThisMonth: true,
  },
  {
    slug: "neon-drain-alley",
    title: "Neon Drain Alley",
    publisher: "Kite & Kiln",
    publisherSlug: "kite-and-kiln",
    price: 54,
    rating: 4.7,
    ratingCount: 673,
    type: "environments",
    channels: ["unreal", "unity"],
    tags: ["city", "night", "neon", "wet"],
    formats: ["Unreal", "FBX"],
    image: "/products/rain-alley.jpg",
    description:
      "A rain-soaked alley with neon signage, fire escapes, and reflective asphalt — built for night scenes.",
    details:
      "Modular street kit, flickering neon materials, puddle decals, steam VFX, and a wet-weather lighting scenario.",
    style: "realistic",
    triangles: "890k",
    featured: true,
  },
  {
    slug: "polar-aurora",
    title: "Polar Aurora FX",
    publisher: "Lumen Foundry",
    publisherSlug: "lumen-foundry",
    price: 22,
    rating: 4.8,
    ratingCount: 745,
    type: "vfx",
    channels: ["unreal", "unity"],
    tags: ["aurora", "sky", "particles", "night"],
    formats: ["Unreal", "Unity"],
    image: "/products/aurora-vfx.jpg",
    description:
      "Ribbon aurora over tundra — GPU particles, sky dome, and a director intensity curve.",
    details:
      "Includes a sample frozen landscape, HDRI, and color-script presets (green, magenta, pale gold). Lightweight enough for cinematics and games.",
    style: "realistic",
    triangles: "n/a",
    isNew: true,
  },
  {
    slug: "plenum-forms",
    title: "Plenum Forms",
    publisher: "Northwind Atelier",
    publisherSlug: "northwind-atelier",
    price: 35,
    rating: 4.3,
    ratingCount: 98,
    type: "3d",
    channels: ["blender", "universal"],
    tags: ["sculpture", "abstract", "gallery", "hero"],
    formats: ["FBX", "glTF", "USDZ", "Blend"],
    image: "/products/abstract-sculpture.jpg",
    description:
      "Twelve interlocking metal and stone sculptures for galleries, lobbies, and title sequences.",
    details:
      "Hero resolution with 8K maps, plus realtime decimations. Neutral studio HDRI included for turntables.",
    style: "realistic",
    triangles: "60k–180k",
    isNew: true,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPublisherProducts(publisherSlug: string) {
  return products.filter((product) => product.publisherSlug === publisherSlug);
}

export function licensePrice(product: Product, license: License) {
  if (product.price === 0) return 0;
  return license === "professional" ? Math.round(product.price * 2.5) : product.price;
}

export function discountPercent(product: Product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}

export type SearchFilters = {
  q?: string;
  type?: string;
  channel?: string;
  offer?: string;
  style?: string;
  sort?: string;
};

export function searchProducts(filters: SearchFilters) {
  const query = filters.q?.trim().toLowerCase() ?? "";
  let results = products.filter((product) => {
    if (filters.type && product.type !== filters.type) return false;
    if (filters.channel && !product.channels.includes(filters.channel as Channel)) {
      return false;
    }
    if (filters.style && product.style !== filters.style) return false;
    if (filters.offer === "free" && product.price !== 0) return false;
    if (filters.offer === "sale" && !product.originalPrice) return false;
    if (query) {
      const haystack = [
        product.title,
        product.publisher,
        product.description,
        product.type,
        ...product.tags,
        ...product.formats,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results = [...results].sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results = [...results].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    default:
      results = [...results].sort((a, b) => b.ratingCount - a.ratingCount);
  }

  return results;
}
