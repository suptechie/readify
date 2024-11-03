import Image from 'next/image';
import { ShareOption } from '@/types';

export const GENRES = [
  { id: "technology", label: "Technology" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "travel", label: "Travel" },
  { id: "finance", label: "Finance" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "education", label: "Education" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "environment", label: "Environment" },
  { id: "sports", label: "Sports" },
  { id: "history", label: "History" },
  { id: "culture", label: "Culture" },
  { id: "politics", label: "Politics" },
  { id: "philosophy", label: "Philosophy" },
  { id: "psychology", label: "Psychology" },
  { id: "art", label: "Art" },
  { id: "literature", label: "Literature" },
  { id: "food", label: "Food" },
  { id: "fashion", label: "Fashion" }
];

export const GENDER = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" }
]

const base = '/assets/profile'
export const AVATARIMAGES = [
  `${base}/1.jpg`,
  `${base}/2.jpg`,
  `${base}/3.jpg`,
  `${base}/4.jpg`,
  `${base}/5.jpg`,
  `${base}/6.jpg`,
  `${base}/7.jpg`,
  `${base}/8.jpg`,
  `${base}/10.jpg`,
  `${base}/11.jpg`,
]



export const shareOptions: ShareOption[] = [
  {
    name: 'Facebook',
    icon: (
      <Image
        src="/assets/social/facebook.svg"
        alt="Facebook"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
    color: 'bg-[#1877F2]',
    hoverColor: 'hover:bg-[#0E5FC1]',
    shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Twitter',
    icon: (
      <Image
        src="/assets/social/twitter.svg"
        alt="Twitter"
        width={32}
        height={32}
        className="h-8 w-8 font-bold"
      />
    ),
    color: 'bg-black',
    hoverColor: 'hover:bg-zinc-800',
    shareUrl: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: (
      <Image
        src="/assets/social/linkedin.svg"
        alt="LinkedIn"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
    color: 'bg-[#0A66C2]',
    hoverColor: 'hover:bg-[#084E96]',
    shareUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Instagram',
    icon: (
      <Image
        src="/assets/social/instagram.svg"
        alt="Instagram"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
    color: 'bg-gradient-to-tr from-[#FF0069] via-[#E4405F] to-[#FD1D1D]',
    hoverColor: 'hover:opacity-90',
    shareUrl: (url) => url,
  },
  {
    name: 'WhatsApp',
    icon: (
      <Image
        src="/assets/social/whatsapp.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
    color: 'bg-[#008000]',
    hoverColor: 'hover:bg-[#128C7E]', 
    shareUrl: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: 'GitHub',
    icon: (
      <Image
        src="/assets/social/github.svg"
        alt="GitHub"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ),
    color: 'bg-[#25D366]',
    hoverColor: 'hover:bg-[#128C7E]',
    shareUrl: (url) => url, 
  }
];
