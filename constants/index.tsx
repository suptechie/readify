import Image from 'next/image';
import { ShareOption } from '@/types';

export const articles = [
  {
    _id: '672717b14f2d95f9b773899c',
    title: 'What Are Articles in Grammar? Definition and Examples',
    author: '67260facdb9b00c83057fb43',
    content: 'What are articles?\n' +
      'Articles are words that identify a noun as being specific or unspecific. Consider the following examples:\n' +
      '\n' +
      'After the long day, the cup of tea tasted particularly good.\n' +
      '\n' +
      'By using the article the, we’ve shown that it was one specific day that was long and one specific cup of tea that tasted good.\n' +
      '\n' +
      'After a long day, a cup of tea tastes particularly good.\n' +
      '\n' +
      'By using the article a, we’ve created a general statement, implying that any cup of tea would taste good after any long day.\n' +
      '\n' +
      '\n' +
      'Here’s a tip: Want to make sure your writing shines? Grammarly can check your spelling and save you from grammar and punctuation mistakes. It even proofreads your text, so your work is extra polished wherever you write.',
    image: 'https://res.cloudinary.com/dlew32edm/image/upload/v1730615215/articles/v2fqhqf7qpekmemt5qor.png',
    genre: 'education',
    tags: [ 'education' ],
    createdAt: '2024-11-03T06:26:57.152Z',
    updatedAt: '2024-11-03T06:26:57.152Z',
    likeCount: 2,
    userIds: [ '67260facdb9b00c83057fb43', '672390467d44c71147a0ace7' ]
  },
  {
    _id: '6728571a285da05418baf927',
    title: 'Nextjs 15 App router: A Node.js API is used (process.version at line: 3) which is not supported in the Edge Runtime. ',
    author: '672390467d44c71147a0ace7',
    content: 'Which area(s) are affected? (Select all that apply)\n' +
      'Linting, Module Resolution, Runtime\n' +
      '\n' +
      'Which stage(s) are affected? (Select all that apply)\n' +
      'next build (local), Vercel (Deployed)\n' +
      '\n' +
      'Additional context\n' +
      ' npm run build \n' +
      '\n' +
      '> readify@0.1.0 build\n' +
      '> next build\n' +
      '\n' +
      '  ▲ Next.js 15.0.1\n' +
      '  - Environments: .env\n' +
      '\n' +
      '   Creating an optimized production build ...\n' +
      '(node:1776) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.\n' +
      '(Use `node --trace-deprecation ...` to show where the warning was created)\n' +
      ' ⚠ Compiled with warnings\n' +
      '\n' +
      './node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js\n' +
      'A Node.js API is used (process.version at line: 3) which is not supported in the Edge Runtime.\n' +
      'Learn more: https://nextjs.org/docs/api-reference/edge-runtime\n' +
      '\n' +
      'Import trace for requested module:\n' +
      './node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js\n' +
      './node_modules/jsonwebtoken/lib/validateAsymmetricKey.js\n' +
      './node_modules/jsonwebtoken/sign.js\n' +
      './node_modules/jsonwebtoken/index.js\n' +
      './lib/services/JWTService.ts\n' +
      '\n' +
      './node_modules/jsonwebtoken/lib/psSupported.js\n' +
      'A Node.js API is used (process.version at line: 3) which is not supported in the Edge Runtime.\n' +
      'Learn more: https://nextjs.org/docs/api-reference/edge-runtime\n' +
      '\n' +
      'Import trace for requested module:\n' +
      './node_modules/jsonwebtoken/lib/psSupported.js\n' +
      './node_modules/jsonwebtoken/sign.js\n' +
      './node_modules/jsonwebtoken/index.js\n' +
      './lib/services/JWTService.ts\n' +
      '\n' +
      './node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js\n' +
      'A Node.js API is used (process.version at line: 3) which is not supported in the Edge Runtime.\n' +
      'Learn more: https://nextjs.org/docs/api-reference/edge-runtime\n' +
      '\n' +
      'Import trace for requested module:\n' +
      './node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js\n' +
      './node_modules/jsonwebtoken/lib/validateAsymmetricKey.js\n' +
      './node_modules/jsonwebtoken/sign.js\n' +
      './node_modules/jsonwebtoken/index.js\n' +
      './lib/services/JWTService.ts\n' +
      '\n' +
      './node_modules/jws/lib/data-stream.js\n' +
      'A Node.js API is used (process.nextTick at line: 29) which is not supported in the Edge Runtime.\n' +
      'Learn more: https://nextjs.org/docs/api-reference/edge-runtime\n' +
      '\n' +
      'Import trace for requested module:\n' +
      './node_modules/jws/lib/data-stream.js\n' +
      './node_modules/jws/lib/verify-stream.js\n' +
      './node_modules/jws/index.js\n' +
      './node_modules/jsonwebtoken/sign.js\n' +
      './node_modules/jsonwebtoken/index.js\n' +
      './lib/services/JWTService.ts',
    image: 'https://res.cloudinary.com/dlew32edm/image/upload/v1730696983/articles/gvvsyykhnpb7ttraly7m.png',
    genre: 'technology',
    tags: [ 'technology' ],
    createdAt: '2024-11-04T05:09:46.887Z',
    updatedAt: '2024-11-04T05:09:46.887Z',
    likeCount: 2,
    userIds: [ '672390467d44c71147a0ace7', '67286f3e4f5e8c5cb9b37095' ]
  },
  {
    _id: '67285cbf2411a3d9acc181b8',
    title: 'Google LLC is an American multinational corporation',
    author: '672390467d44c71147a0ace7',
    content: 'Google LLC is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence. Wikipedia\n' +
      'ഇൻറർനെറ്റ് തിരച്ചിൽ, വെബ് അധിഷ്ഠിത സേവനം, വെബ്സൈറ്റ് പരസ്യം എന്നീ രംഗങ്ങളിൽ പ്രവർത്തിക്കു              ന്ന അമേരിക്കൻ കമ്പനിയാണ് ഗൂഗിൾ ലോകത്തിലെ ഏറ്റവും വിശാലമായ ഇന്റർനെറ്റ് തിരച്ചിൽ സംവിധാ‍നമാണ് ഗൂഗി              ിൾ. അറിവുകൾ ശേഖരിച്ച് സാർവ്വ ദേശീയമായി ലഭ്യമാക്കുക എന്നതാണ് ഗൂഗിളിന്റെ പ്രഖ്യാപിത ലക്ഷ്യം',      
    image: 'https://res.cloudinary.com/dlew32edm/image/upload/v1730698418/articles/xbmopnghpedflsmlvmrz.png',
    genre: 'technology',
    tags: [ 'business' ],
    createdAt: '2024-11-04T05:33:51.477Z',
    updatedAt: '2024-11-04T05:33:51.477Z',
    likeCount: 0,
    userIds: []
  },
  {
    _id: '672870dc00ab3655672ed807',
    title: 'What Is An Article? Types & Examples',
    author: '67286f3e4f5e8c5cb9b37095',
    content: 'The man ate an extravagant meal at a fancy restaurant. Ritzy! This classy sentence uses three of some of the most commonly used words: the, a, and an. However, there is more to these words than simply the number of times that we use them. These three words belong to a class of words known as articles. If you want to become a grammar master, it is really important to know how to use articles because of how often they show up in our sentences.\n' +
      '\n' +
      'What is an article?\n' +
      'An article is a word that is used to indicate that a noun is a noun without describing it. For example, in the sentence Nick bought a dog, the article a indicates that the word dog is a noun. Articles can also modify anything that acts as a noun, such as a pronoun or a noun phrase.\n' +
      '\n' +
      'Often, a sentence needs an article before a noun in order to make grammatical sense. For example,\n' +
      '\n' +
      '❌ Incorrect: I have box.\n' +
      '✅ Correct: I have a box.\n' +
      '\n' +
      '❌ Incorrect: She opened door.\n' +
      '✅ Correct: She opened the door.\n' +
      '\n' +
      '❌ Incorrect: French is spoken by French.\n' +
      '✅ Correct: French is spoken by the French.',
    image: 'https://res.cloudinary.com/dlew32edm/image/upload/v1730703578/articles/g5j31n8r2rsb0t13dozt.png',
    genre: 'environment',
    tags: [
      'technology',    'science',
      'health',        'travel',
      'finance',       'lifestyle',
      'education',     'business',
      'entertainment', 'environment',
      'sports',        'history',
      'culture',       'politics',
      'philosophy',    'psychology',
      'art',           'literature',
      'food',          'fashion'
    ],
    createdAt: '2024-11-04T06:59:40.813Z',
    updatedAt: '2024-11-04T06:59:40.813Z',
    likeCount: 2,
    userIds: [ '67286f3e4f5e8c5cb9b37095', '672390467d44c71147a0ace7' ]
  },
  {
    _id: '6728713400ab3655672ed80d',
    title: 'A Comprehensive Guide to Next.js',
    author: '67286f3e4f5e8c5cb9b37095',
    content: 'Introduction to Next.js\n' +
      'Next.js is a popular open-source React framework that makes building web applications a breeze. Developed and maintained by Vercel, Next.js has gained immense popularity in the web development community due to its performance, developer-friendly features, and seamless integration with React.\n' +
      '\n' +
      'In this comprehensive guide, we’ll explore Next.js, its core concepts, features, and how to get started with it. Whether you’re new to web development or an experienced developer looking to dive into Next.js, this guide will provide you with the knowledge you need to build powerful web applications.\n' +
      '\n' +
      'Table of Contents\n' +
      'What is Next.js?\n' +
      'Key Features of Next.js\n' +
      'Getting Started with Next.js\n' +
      'Pages and Routing\n' +
      'Data Fetching\n' +
      'Styling in Next.js\n' +
      'Optimizing Performance\n' +
      'Deployment with Vercel\n' +
      'Conclusion\n' +
      '1. What is Next.js?\n' +
      'Next.js is a React framework that simplifies the development of server-rendered React applications. It offers a range of features and conventions that make it easier to build modern web applications while providing excellent performance out of the box.\n' +
      '\n' +
      'Key features of Next.js include server-side rendering (SSR), static site generation (SSG), client-side routing, automatic code splitting, and an intuitive file-based routing system. These features enable developers to create fast, SEO-friendly web applications with minimal configuration.\n' +
      '\n' +
      '2. Key Features of Next.js\n' +
      'Let’s delve deeper into some of the key features that make Next.js a preferred choice for web developers:\n' +
      '\n' +
      'a. Server-Side Rendering (SSR)\n' +
      'One of Next.js’ standout features is SSR, which allows rendering React components on the server instead of the client. This results in faster initial page loads and better SEO since search engines can crawl the fully rendered HTML.\n' +
      '\n' +
      'b. Static Site Generation (SSG)\n' +
      'Next.js offers SSG, which pre-renders pages at build time. This approach generates static HTML files for each page, resulting in incredibly fast page loads and enabling easy deployment to content delivery networks (CDNs).\n' +
      '\n' +
      'c. Client-Side Routing\n' +
      'Next.js provides a built-in client-side routing system. You can create dynamic, single-page applications (SPAs) without the need for complex routing configurations.\n' +
      '\n' +
      'd. Automatic Code Splitting\n' +
      'Next.js automatically splits your JavaScript code into smaller chunks, ensuring that users only download the code necessary for the current page. This optimizes load times and performance.\n' +
      '\n' +
      'e. File-Based Routing\n' +
      'Next.js simplifies routing by allowing developers to create pages using a file-based system. Simply create a JavaScript file in the “pages” directory, and Next.js handles the routing for you.\n' +
      '\n' +
      '3. Getting Started with Next.js\n' +
      'To start building with Next.js, you’ll need Node.js and npm (Node Package Manager) installed on your computer. Follow these steps to create a new Next.js project:\n' +
      '\n' +
      'Step 1: Create a New Next.js Project\n' +
      'Open your terminal and run the following command to create a new Next.js project:\n' +   
      '\n' +
      'bashCopy code',
    image: 'https://res.cloudinary.com/dlew32edm/image/upload/v1730703667/articles/pt9hwqym56bskqifmm3t.png',
    genre: 'science',
    tags: [
      'technology',    'science',
      'health',        'travel',
      'finance',       'lifestyle',
      'education',     'business',
      'entertainment', 'environment',
      'sports',        'history',
      'culture',       'politics',
      'philosophy',    'psychology',
      'art',           'literature',
      'food',          'fashion'
    ],
    createdAt: '2024-11-04T07:01:08.371Z',
    updatedAt: '2024-11-04T07:01:08.371Z',
    likeCount: 0,
    userIds: []
  },
  {
    _id: '672871bd00ab3655672ed817',
    title: 'How to Create Animations in React 18``',
    author: '67286f3e4f5e8c5cb9b37095',
    content: 'We are surrounded by gorgeous web applications. Sometimes I catch myself admiring visual effects on some website and wondering how they were made.\n' +
      '\n' +
      "Well today I'll show you how you can create awesome CSS animations in React 18.\n" +     
      '\n' +
      "As always, we'll work on the real world example but we'll just focus on the animations only to avoid confusion. If you want to see the final results applied to a proper application, then don't worry. I've attached the source code of a pet project so feel free to play with it.\n" +
      '\n' +
      'Before we start, I need to give you some context – I designed those animations for my 2048 Game in React. This game is a part of my online course on Udemy but I will tell you more about it at the end of this article.\n' +
      '\n' +
      "You can find the source code on GitHub. Here's the final result of what we'll be creating:\n" +
      '\n' +
      'ImageAll animations of 2048-in-react\n' +
      '\n' +
      '🛠️ Prerequisites**\n'  +
      "Before we start, make sure you know some basics of React and CSS. It would be great if you are familiar CSS transitions but it isn't necessary. Actually I'm hoping this article will encourage you to go down that rabbit hole on your own. Believe me – nothing is more rewarding than users admiring your work.\n" +
      '\n' +
      "Also, you don't need any tools, but if you want to run the example project on your computer, then you will need to install Node.js first.\n" +
      '\n' +
      '🕹️ Quick Introduction\n'  +
      "If you aren't familiar with the 2048 game, here's the gist: the player must combine tiles containing the same numbers until they reach the number 2048. The tiles can contain only numbers that represent a power of two starting from 2 – this means 2, 4, 8, 16, 32, and so on. The board has dimension of 4 x 4 tiles, so that it can fit up to 16 tiles.\n" +
      '\n' +
      "Let me briefly show you what animations I prepared for the game's users:\n" +
      '\n' +
      'The first animation is supposed to visualize the tile movement.\n' +
      '\n' +
      'ImageThe "tile sliding" animation\n' +
      '\n' +
      'The game would look janky if tiles disappeared and popped up in different places. CSS transitions help make the movement smooth for users.\n' +
      '\n' +
      'The second animation highlights tile creation and their merges.\n' +
      '\n' +
      'ImageThe "tile highlighting" animation\n' +
      '\n' +
      'This animation helps users spot tiles that are changed after the movement.\n' +
      '\n' +
      "I think that's all I need to tell you about the project. Let's get our hands dirty!\n" + 
      '\n' +
      '🌟 How to Create the Highlighting Animation\n' +
      `We'll start with the animation responsible for highlighting changes. I must admit I had a hard time to find a "beautiful" way to visualize it. The main objective was to bring the user's focus to tiles that changed their values or were created. I decided to rescale those tiles because it didn't want the animation to be too "intrusive".\n` +
      '\n' +
      "So how is this going to work? First, we'll increase the size of the tile to 110%. Once the tile reaches 110% of its original size, we will downscale it back to 100%. The entire animation will last 0.2s (0.1s upscale, 0.1s downscale). I think that's enough to show the user's updated elements.\n" +
      '\n' +
      'We can accomplish this animation using the following CSS transitions:\n' +
      '\n' +
      '.tile {',
    image: 'https://res.cloudinary.com/dlew32edm/image/upload/v1730703804/articles/wxcazo77xgqntshonpcq.png',
    genre: 'environment',
    tags: [ 'travel', 'business' ],
    createdAt: '2024-11-04T07:03:25.925Z',
    updatedAt: '2024-11-04T07:03:25.925Z',
    likeCount: 0,
    userIds: []
  }
]
 

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
];

const base = '/assets/profile';
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
];

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
    hoverColor: 'hover:bg-[#166FE5]',
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
    color: 'bg-[#1DA1F2]',
    hoverColor: 'hover:bg-[#1A91DA]',
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
    hoverColor: 'hover:bg-[#004182]',
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
    color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
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
    color: 'bg-[#25D366]',
    hoverColor: 'hover:bg-[#20BD5C]',
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
    color: 'bg-[#333333]',
    hoverColor: 'hover:bg-[#24292F]',
    shareUrl: (url) => url,
  }
];