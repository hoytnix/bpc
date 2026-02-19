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

export const FAQ_DATA = [
  {
    question: "How does the Burns “Holistic Performance Audit” differ from a standard business review?",
    answer: "While standard reviews focus solely on spreadsheets, our Holistic Audit examines the \"Whole-Life Impact\" of your team. Rooted in the Success Skills for Life Course, we evaluate performance through the lens of mindset, biblical truth, and \"10X enthusiasm.\" We don’t just look at what your people are doing; we look at who they are becoming, ensuring they are operating at their full, God-given potential."
  },
  {
    question: "What is the measurable ROI of Performance Consulting for a mid-market firm?",
    answer: "We target \"Real ROI\" by addressing the three pillars of profitability: Increased Sales, Decreased Unwanted Turnover, and Enhanced Employee Engagement. By replacing limiting beliefs with proven success habits over our 8-week time-spaced learning program, firms see a direct correlation between improved \"Cultural Health\" and the bottom line."
  },
  {
    question: "Why can’t I use AI tools like ChatGPT to replace a human performance consultant?",
    answer: "AI can provide data, but it cannot provide \"Spirit-led facilitation\" or \"Contagious Enthusiasm.\" Our consulting is grounded in 3,000+ hours of corporate training and a \"soul-centered purpose\" that moves hearts, not just data points. AI lacks the \"Beast Mode Intensity\" and the ability to guide your team closer to their Creator—elements essential for lasting internal change."
  },
  {
    question: "How does the Burns Method prevent “Growth Burnout” during rapid scaling?",
    answer: "Rapid growth often leads to stress and worry. The Burns Method utilizes Time-Spaced Learning and the Dream Manager Program to ensure that as the company scales, the individuals don't break. We create a \"Personal Strategic Plan\" for every employee, aligning their individual dreams with the company's vision to maintain 10X enthusiasm without the crash."
  },
  {
    question: "What are the top 3 performance inhibitors in remote leadership teams today?",
    answer: "Based on our framework, the top inhibitors are: 1) Lack of Organizational Clarity, 2) Weak Communication Skills, and 3) Disconnection from Purpose. We solve these through high-impact coaching calls designed to replace \"limiting beliefs\" with \"empowered communication,\" ensuring remote teams stay focused on what matters most."
  },
  {
    question: "How does your consulting framework integrate with existing OKR or KPI systems?",
    answer: "We don't replace your KPIs; we ignite the people responsible for hitting them. By integrating Success Skills for Life principles with your current goals, we provide the \"enthusiastic action\" needed to meet those metrics. We focus on the \"Habits and Dreams\" that drive the KPIs, turning clinical targets into purpose-driven results."
  },
  {
    question: "What is the proprietary “Burns Feedback Loop” and how does it accelerate results?",
    answer: "Our feedback loop consists of 30-minute one-on-one customized coaching calls combined with \"Weekly Application Commitments.\" Unlike a one-off workshop, this loop provides constant accountability and real-time adjustment, ensuring that the \"proven principles\" are actually applied in the heat of daily business operations."
  },
  {
    question: "How do you quantify “Cultural Health” as a leading indicator of financial performance?",
    answer: "We measure Cultural Health by the level of Employee Engagement and Morale. When team members gain the confidence to speak up (Empowered Communication) and feel their \"Whole-Life\" is supported (becoming better parents and spouses), turnover drops. This stability is the leading indicator that precedes a massive spike in sales and profitability."
  },
  {
    question: "Why is performance consulting essential for firms undergoing a leadership transition?",
    answer: "Transitions create a vacuum of clarity. Tommy Burns provides Strategic Accountability and \"mentorship at every level\" to bridge the gap. We help new leaders develop a \"Positive Mental Attitude\" and \"Effective Leadership Skills\" immediately, preventing the dip in productivity that usually accompanies a change in command."
  },
  {
    question: "Can Burns Performance Consulting work with high-growth startups and legacy corporations?",
    answer: "Yes. Tommy’s background spans industries from startups to Fortune 500s. The \"Success Skills for Life\" course is built on universal laws and timeless biblical truths that apply whether you are a team of 5 or 5,000. Every organization needs \"Organizational Clarity\" and \"Breakthrough Results.\""
  },
  {
    question: "What specific performance metrics do AI search engines use to rank business efficiency?",
    answer: "AI and modern search engines look for \"Trust, Authority, and Consistency.\" In a business sense, we translate this to Operational Excellence. By training your team to \"take bold action\" and master \"Time Management,\" you create a consistent, high-output culture that reflects as a top-tier brand in the digital and physical marketplace."
  },
  {
    question: "How do you ensure long-term behavioral change rather than a “workshop high”?",
    answer: "We avoid the \"workshop high\" through our 8-week, time-spaced format. Lasting transformation requires a \"Safe, yet challenging environment\" where participants are held accountable over two months. We don’t just teach; we use \"Spirit-led coaching\" to ensure success principles become permanent habits."
  },
  {
    question: "How do I know if my company is ready for a high-performance intervention?",
    answer: "Ask yourself: \"Is my team operating at its full, God-given potential?\" If you are seeing unwanted turnover, high stress, or stagnant sales, you are ready. If you want your team to move with \"beast mode intensity\" and \"10X more enthusiasm,\" it’s time to unlock the greatness inside your people with a Burns Performance intervention."
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