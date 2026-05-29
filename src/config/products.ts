export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stripePriceId: string; // Used to trigger Checkout Session
}

export const products: Product[] = [
  {
    id: "mystic-vault-society-bookmark",
    name: "Mystic Vault Society Steel Bookmark",
    price: 9.99,
    description: "Mark your place in any quest, from the deepest dungeons of fantasy to the farthest reaches of the galaxy. Forged from resilient stainless steel with a smooth, polished finish, this bookmark is designed to slip between pages without causing harm. The front features a subtle monogram emblem of the Society.",
    imageUrl: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/9421366540886838561_2048-1.jpeg",
    category: "Bookmark",
    stripePriceId: "price_mvs_bookmark"
  },
  {
    id: "mystic-vault-society-t-shirt-unisex",
    name: "Mystic Vault Society Logo T-Shirt",
    price: 35.38,
    description: "Comfort Colors unisex t-shirt featuring the official Mystic Vault Society screenprint. Made of ultra-soft 100% ring-spun cotton. High comfort, vintage feel, built to accompany you on any writing or reading adventure.",
    imageUrl: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/13558968380405200241_2048-1.jpeg",
    category: "Apparel",
    stripePriceId: "price_mvs_tshirt"
  },
  {
    id: "mystic-vault-society-hoodie",
    name: "Mystic Vault Society Fleece Hoodie",
    price: 39.34,
    description: "Atmospheric heavy fleece hoodie printed with the guild logo. Warm, heavy, and perfect for long nights of reading or worldbuilding.",
    imageUrl: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/16160577325480578546_2048.jpeg",
    category: "Apparel",
    stripePriceId: "price_mvs_hoodie"
  },
  {
    id: "mystic-vault-society-classic-dad-cap",
    name: "Mystic Vault Society Classic Dad Cap",
    price: 38.96,
    description: "Embroidered dad cap in washed cotton. Adjusts for comfort, shields your eyes from the elements on your creative quest. Features premium custom thread detailing.",
    imageUrl: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/5195240910782599673_2048.jpeg",
    category: "Apparel",
    stripePriceId: "price_mvs_dadcap"
  },
  {
    id: "epic-fantasy-rolled-posters-wall-art-for-game-lovers-adventure-decor-gift-for-fantasy-fans-unique-room-decoration",
    name: "Epic Fantasy Rolled Poster (Binsmuth Landscape)",
    price: 8.82,
    description: "Immersive rolled poster wall art showcasing the rich landscapes of Binsmuth. The perfect adventure decor for any writer's room or gaming den. Features vivid high-resolution printing on premium matte finish paper.",
    imageUrl: "https://mysticvaultsociety.com/wp-content/uploads/2025/08/1742142705584433894_2048.jpeg",
    category: "Office & Art",
    stripePriceId: "price_mvs_poster"
  },
  {
    id: "rise-of-the-veilbreaker-t-shirt",
    name: "Rise of the Veilbreaker T-shirt",
    price: 36.02,
    description: "The official commemorative t-shirt for Michael Schustereit's debut novel 'Rise of the Veilbreaker'. High contrast screen print on a premium fit tee, showcasing original artwork inspired by the book's cosmic themes.",
    imageUrl: "https://mysticvaultsociety.com/wp-content/uploads/2025/08/10818811539437711238_2048.jpeg",
    category: "Apparel",
    stripePriceId: "price_veilbreaker_tshirt"
  }
];

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
