import { Testimonial, MediaItem, TranscriptLine } from './types';

// --- BRAND DATA ---

export const BRAND = {
  name: "Burns Performance Consulting",
  tagline: "Unlock The Greatness Inside Your People",
  phone: "616.667.7101",
  email: "BurnsPerformanceConsulting@gmail.com",
  socials: {
    linkedin: "Tommy Burns",
    twitter: "@BurnsPerf",
    instagram: "@Burns.Consult",
    facebook: "Burns Performance Consulting"
  }
};

export const HERO_CONTENT = {
  headline: "Ignite Your God-Given Potential.",
  subheadline: "Harnessing proven principles, enthusiastic action, and The Holy Spirit's guidance to unlock breakthroughs that create life-changing results.",
  bullets: [
    "Measurable Business ROI",
    "Contagious Enthusiasm",
    "Biblical Principles",
    "10X Growth Mindset"
  ]
};

export const SERVICES = [
  {
    title: "Life-Changing Growth",
    description: "Participants experience increased self-confidence, mindset shifts, and a stronger sense of purpose — even skeptics become believers."
  },
  {
    title: "Real ROI",
    description: "Businesses see a measurable impact in increased sales, and long-term employee engagement."
  },
  {
    title: "Contagious Enthusiasm",
    description: "Tommy’s high-energy presence lifts morale and infuses teams with optimism and drive."
  },
  {
    title: "Organizational Clarity",
    description: "Learn proven systems to reduce stress, boost productivity, and stay focused on what matters most."
  },
  {
    title: "Empowered Communication",
    description: "Team members gain the confidence to speak up, share ideas, and lead more effectively."
  },
  {
    title: "Whole-Life Impact",
    description: "Employees not only become better professionals — they become better parents, spouses, and people."
  }
];

export const PROGRAMS = [
  {
    title: "Success Skills For Life",
    subtitle: "Unleashing Your God Given Potential",
    description: "A powerful 8-week course inspired by Dale Carnegie, Napoleon Hill, and the Bible. Transforms personal potential into real-world results by placing Jesus Christ at the center of growth.",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    title: "The Dream Manager",
    subtitle: "Personal Strategic Planning",
    description: "The ultimate life-coaching program. Participants develop a personal strategic plan, receiving clarity, accountability, and encouragement to achieve their dreams.",
    color: "from-blue-900 to-slate-800"
  },
  {
    title: "Coaching Calls",
    subtitle: "Relational, Results-Focused",
    description: "Personalized, strategic coaching calls designed to mentor individuals at every level. Addresses real-time challenges to accelerate personal and professional growth.",
    color: "from-red-600 to-orange-600"
  }
];

// --- MOCK DATA ---

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Director of Ops, Midwest Logistics",
    excerpt: "Even skeptics became believers...",
    fullText: "I was hesitant at first, but working with Tommy brought life-changing growth to our team. Participants experienced increased self-confidence and mindset shifts. Even skeptics became believers. It wasn't just about business; it was whole-life impact.",
    date: "Jan 15, 2026",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Ross",
    role: "Owner, Ross Construction",
    excerpt: "Measurable impact in increased sales...",
    fullText: "Real ROI. That is what we needed and that is what we got. Businesses see a measurable impact in increased sales and long-term employee engagement. Tommy's energy is absolutely contagious.",
    date: "Dec 02, 2025",
    rating: 5
  },
  {
    id: 3,
    name: "David Miller",
    role: "CEO, Innovate Tech",
    excerpt: "We are operating at our highest potential.",
    fullText: "Tommy creates a safe yet challenging environment where people get real, get focused, and get outside their comfort zones. We are now fully engaged, energized, and operating at our highest potential.",
    date: "Nov 20, 2025",
    rating: 5
  }
];

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: 1,
    title: "Success Skills: 8-Week Transformation",
    type: "image", // Using image type for blog/article view
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    duration: "5 min read",
    views: "2.4k"
  },
  {
    id: 2,
    title: "Video: The Dream Manager Concept",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop",
    duration: "14:20",
    views: "1.2k"
  },
  {
    id: 3,
    title: "Webinar: Faith in the Marketplace",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2940&auto=format&fit=crop",
    duration: "45:00",
    views: "890"
  },
  {
    id: 4,
    title: "Article: Reducing Unwanted Turnover",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2968&auto=format&fit=crop",
    duration: "4 min read",
    views: "3.1k"
  }
];

export const TRANSCRIPT_DATA: TranscriptLine[] = [
  { time: 0, text: "Welcome. Let's talk about unlocking your God-given potential." },
  { time: 5, text: "I've spent over 15 years in business development..." },
  { time: 10, text: "...and over 3,000 hours in corporate training." },
  { time: 15, text: "But this isn't just about leadership skills." },
  { time: 20, text: "It's about 10X enthusiasm." },
  { time: 25, text: "We base our coaching on the teachings of Jesus Christ." },
  { time: 30, text: "Why? Because it brings lasting value." },
  { time: 35, text: "We're building better people, not just professionals." },
  { time: 40, text: "With beast mode intensity and soul-centered purpose." },
  { time: 45, text: "Are you ready to set your team ablaze?" },
  { time: 50, text: "Let's get to work." },
];

export const BLOG_CONTENT = {
  title: "Success Skills For Life: Unleashing Your God Given Potential",
  meta: "Course Overview • 8 Weeks",
  author: "Tommy Burns",
  date: "October 2025",
  quote: "Clients work with Tommy because he doesn't just teach leadership—he ignites lasting internal change that fuels personal and professional success for now and all eternity.",
  intro: "Success Skills for Life Course is a powerful 8-week course that transforms personal potential into real-world results by placing Jesus Christ at the center of your personal and professional growth. Rooted in timeless biblical truth, universal laws, and proven success principles, this faith-forward program empowers individuals to live with purpose, boldness, and breakthrough in every area of life.",
  section1Title: "The Proven Process",
  section1Content: "Through a proven process that life-changing course empowers individuals to dramatically elevate their confidence, communication, and leadership. Participants will experience breakthrough growth in multiple areas of life as they are challenged, encouraged, and equipped to live out a bold vision with purpose and clarity.",
  takeaway: "Consistent application of a proven process, using proven success principles, produces proven results consistently!",
  section2Content: "This is your opportunity to invest in your people and ignite real change in your business and community. Tommy creates a safe yet challenging environment where people get real, get focused, get outside their comfort zone, which gets consistent results."
};