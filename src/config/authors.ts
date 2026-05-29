export interface Book {
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  buyUrl?: string;
  downloadUrl?: string;
  retailers?: { name: string; url: string }[];
  highlight?: string;
}

export interface Author {
  name: string;
  slug: string;
  title: string;
  email: string;
  avatar: string;
  bio: string;
  books: Book[];
}

export const authors: Author[] = [
  {
    name: "Michael Schustereit",
    slug: "michael-schustereit",
    title: "Architect of Star-Spanning Sagas and Forgotten Realms",
    email: "mschustereit@gmail.com",
    avatar: "https://mysticvaultsociety.com/wp-content/uploads/2025/07/IMG_7628-scaled.jpg",
    bio: "As a science fiction and fantasy author, Michael Schustereit writes stories that explore the frontiers of human potential and the echoes of ancient magic, born from a lifelong passion for the grand scale of the genre. Consequently, after years of navigating the publishing world, he founded Mystic Vault Society to create a better path for fellow genre authors. In addition, his work is characterized by detailed world-building, morally complex characters, and a relentless sense of adventure. Ultimately, Michael believes that a great story is a journey worth sharing, and he is dedicated to helping other writers embark on their own.",
    books: [
      {
        title: "Rise of the Veilbreaker",
        slug: "rise-of-the-veilbreaker",
        coverImage: "https://mysticvaultsociety.com/wp-content/uploads/2025/08/ROTV-Book-Mockup.png",
        description: "In a world bound by ancient pacts and shadowed by warring gods, the Veil between realms is thinning. Thomas, a young knight sworn to the goddess of order, believes his duty is to fight the monstrous servants of a chaos god. But when a mission goes awry, he uncovers a conspiracy that shatters his faith, suggesting the greatest threat isn't from invading hordes, but from the deceptions holding his world together. To save his realm, he must become something more than a knight—he must become the Veilbreaker, a figure of prophecy with the power to tear down illusions and expose the terrible truths that lie beneath. But is the price of truth the destruction of reality itself?",
        buyUrl: "https://a.co/d/fDf9E1W",
        retailers: [
          { name: "Amazon", url: "https://a.co/d/fDf9E1W" },
          { name: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/rise-of-the-veilbreaker-michael-schustereit/1148001466?ean=9798999164902" }
        ]
      },
      {
        title: "Shattered Oaths",
        slug: "shattered-oaths",
        coverImage: "https://mysticvaultsociety.com/wp-content/uploads/2025/08/Shattered-Oath-Book-Mockup-scaled.png",
        description: "On the storm-lashed islands of Sambor, a mysterious civilization has emerged. Their supposed alliance with the Lord of Tempests and a new form of magic has the Council of Orders desperate to gather some intel. Selvus, after turning down the position of Grand Druid, is challenged with the task. He must navigate a foreign land, becoming a spy, when all he wants to do is retire to a quiet grove in the forest. As rival wizards tighten their grip on the hierarchy of power, Selvus discovers just how frightening the Grey Wizards of Sambor really are. To survive, he must choose to forge new bonds or let the ashes of shattered oaths consume him and his companions.",
        downloadUrl: "https://drive.google.com/file/d/1qZjjIozgUyUBAfOyN3LfYNkQzt2jCLra/view?usp=sharing",
        highlight: "Now one of 9 finalists shortlisted for the AutoCrit Novel90 Summer Edition Grand Prize."
      }
    ]
  },
  {
    name: "Thomas Schustereit",
    slug: "thomas-schustereit",
    title: "Lead Guild Designer & Illustrator",
    email: "bonesy@bonesydesign.com",
    avatar: "https://mysticvaultsociety.com/wp-content/uploads/2025/06/Text-White@3x-scaled.png",
    bio: "Thomas (Bonesy) Schustereit is the lead designer and illustrator for Mystic Vault Society. Specializing in branding, promotional gear, and formatting, Thomas ensures every book and brand under the society has an immersive, stunning visual presence.",
    books: []
  }
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find(a => a.slug === slug);
}
