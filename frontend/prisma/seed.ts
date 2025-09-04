// StackHunt - Database Seed File
// Phase 2: Technology Interest Management

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Popular technologies organized by category with popularity scores
const technologies = [
  // Programming Languages
  { name: 'JavaScript', category: 'language', popularityScore: 100, description: 'Dynamic programming language for web development' },
  { name: 'TypeScript', category: 'language', popularityScore: 95, description: 'Typed superset of JavaScript' },
  { name: 'Python', category: 'language', popularityScore: 98, description: 'High-level programming language for web, data science, and AI' },
  { name: 'Java', category: 'language', popularityScore: 90, description: 'Object-oriented programming language' },
  { name: 'Go', category: 'language', popularityScore: 85, description: 'Fast, statically typed compiled language by Google' },
  { name: 'Rust', category: 'language', popularityScore: 82, description: 'Systems programming language focused on safety and performance' },
  { name: 'C++', category: 'language', popularityScore: 78, description: 'General-purpose programming language' },
  { name: 'C#', category: 'language', popularityScore: 75, description: 'Programming language developed by Microsoft' },
  { name: 'PHP', category: 'language', popularityScore: 70, description: 'Server-side scripting language' },
  { name: 'Ruby', category: 'language', popularityScore: 65, description: 'Dynamic, open source programming language' },
  { name: 'Swift', category: 'language', popularityScore: 68, description: 'Programming language for iOS and macOS development' },
  { name: 'Kotlin', category: 'language', popularityScore: 72, description: 'Modern programming language for Android development' },
  { name: 'Dart', category: 'language', popularityScore: 60, description: 'Client-optimized language for apps on multiple platforms' },
  
  // Frontend Frameworks
  { name: 'React', category: 'framework', popularityScore: 100, description: 'JavaScript library for building user interfaces' },
  { name: 'Vue.js', category: 'framework', popularityScore: 88, description: 'Progressive JavaScript framework' },
  { name: 'Angular', category: 'framework', popularityScore: 85, description: 'Platform for building mobile and desktop web applications' },
  { name: 'Next.js', category: 'framework', popularityScore: 92, description: 'React framework with hybrid static & server rendering' },
  { name: 'Nuxt.js', category: 'framework', popularityScore: 75, description: 'Vue.js framework for production' },
  { name: 'Svelte', category: 'framework', popularityScore: 78, description: 'Cybernetically enhanced web apps' },
  { name: 'SvelteKit', category: 'framework', popularityScore: 70, description: 'The fastest way to build svelte apps' },
  { name: 'Astro', category: 'framework', popularityScore: 65, description: 'Build faster websites with less client-side JavaScript' },
  { name: 'Remix', category: 'framework', popularityScore: 62, description: 'Full stack web framework focused on web standards' },
  
  // Backend Frameworks
  { name: 'Node.js', category: 'framework', popularityScore: 95, description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
  { name: 'Express.js', category: 'framework', popularityScore: 90, description: 'Fast, unopinionated, minimalist web framework for Node.js' },
  { name: 'Django', category: 'framework', popularityScore: 85, description: 'High-level Python Web framework' },
  { name: 'Flask', category: 'framework', popularityScore: 80, description: 'Lightweight WSGI web application framework' },
  { name: 'FastAPI', category: 'framework', popularityScore: 88, description: 'Modern, fast web framework for building APIs with Python' },
  { name: 'Spring Boot', category: 'framework', popularityScore: 82, description: 'Java-based framework for creating microservices' },
  { name: 'Laravel', category: 'framework', popularityScore: 78, description: 'PHP web application framework' },
  { name: 'Ruby on Rails', category: 'framework', popularityScore: 70, description: 'Server-side web application framework written in Ruby' },
  { name: 'ASP.NET Core', category: 'framework', popularityScore: 75, description: 'Cross-platform .NET framework for building modern web apps' },
  { name: 'Gin', category: 'framework', popularityScore: 65, description: 'HTTP web framework written in Go' },
  { name: 'Fiber', category: 'framework', popularityScore: 60, description: 'Express inspired web framework written in Go' },
  
  // Mobile Development
  { name: 'React Native', category: 'framework', popularityScore: 85, description: 'Framework for building native apps using React' },
  { name: 'Flutter', category: 'framework', popularityScore: 82, description: 'UI toolkit for building natively compiled applications' },
  { name: 'Ionic', category: 'framework', popularityScore: 65, description: 'Cross-platform mobile app development framework' },
  { name: 'Xamarin', category: 'framework', popularityScore: 55, description: 'Microsoft\'s mobile application platform' },
  
  // Databases
  { name: 'PostgreSQL', category: 'tool', popularityScore: 90, description: 'Advanced open source relational database' },
  { name: 'MySQL', category: 'tool', popularityScore: 85, description: 'Open-source relational database management system' },
  { name: 'MongoDB', category: 'tool', popularityScore: 88, description: 'Document-oriented NoSQL database' },
  { name: 'Redis', category: 'tool', popularityScore: 82, description: 'In-memory data structure store' },
  { name: 'SQLite', category: 'tool', popularityScore: 75, description: 'Self-contained, serverless SQL database engine' },
  { name: 'Elasticsearch', category: 'tool', popularityScore: 70, description: 'Distributed search and analytics engine' },
  { name: 'Supabase', category: 'tool', popularityScore: 78, description: 'Open source Firebase alternative' },
  { name: 'PlanetScale', category: 'tool', popularityScore: 68, description: 'MySQL-compatible serverless database platform' },
  
  // DevOps & Cloud
  { name: 'Docker', category: 'tool', popularityScore: 95, description: 'Platform for developing, shipping, and running applications' },
  { name: 'Kubernetes', category: 'tool', popularityScore: 88, description: 'Container orchestration system' },
  { name: 'AWS', category: 'tool', popularityScore: 92, description: 'Amazon Web Services cloud platform' },
  { name: 'Google Cloud', category: 'tool', popularityScore: 80, description: 'Google\'s cloud computing services' },
  { name: 'Azure', category: 'tool', popularityScore: 78, description: 'Microsoft\'s cloud computing service' },
  { name: 'Vercel', category: 'tool', popularityScore: 85, description: 'Platform for frontend frameworks and static sites' },
  { name: 'Netlify', category: 'tool', popularityScore: 75, description: 'Platform for automating modern web projects' },
  { name: 'Railway', category: 'tool', popularityScore: 65, description: 'Infrastructure platform for deploying applications' },
  { name: 'Render', category: 'tool', popularityScore: 62, description: 'Cloud platform for building and running applications' },
  
  // Version Control & CI/CD
  { name: 'Git', category: 'tool', popularityScore: 100, description: 'Distributed version control system' },
  { name: 'GitHub', category: 'tool', popularityScore: 98, description: 'Web-based hosting service for Git repositories' },
  { name: 'GitLab', category: 'tool', popularityScore: 75, description: 'Web-based DevOps lifecycle tool' },
  { name: 'GitHub Actions', category: 'tool', popularityScore: 88, description: 'CI/CD platform that lets you automate workflows' },
  { name: 'Jenkins', category: 'tool', popularityScore: 70, description: 'Open source automation server' },
  
  // Development Tools
  { name: 'VS Code', category: 'tool', popularityScore: 100, description: 'Source-code editor made by Microsoft' },
  { name: 'Webpack', category: 'tool', popularityScore: 78, description: 'Static module bundler for JavaScript applications' },
  { name: 'Vite', category: 'tool', popularityScore: 85, description: 'Build tool that provides faster development experience' },
  { name: 'ESLint', category: 'tool', popularityScore: 82, description: 'Static code analysis tool for JavaScript' },
  { name: 'Prettier', category: 'tool', popularityScore: 80, description: 'Opinionated code formatter' },
  { name: 'Jest', category: 'tool', popularityScore: 85, description: 'JavaScript testing framework' },
  { name: 'Cypress', category: 'tool', popularityScore: 75, description: 'End-to-end testing framework' },
  { name: 'Playwright', category: 'tool', popularityScore: 72, description: 'Framework for Web Testing and Automation' },
  
  // CSS & Styling
  { name: 'Tailwind CSS', category: 'framework', popularityScore: 88, description: 'Utility-first CSS framework' },
  { name: 'Bootstrap', category: 'framework', popularityScore: 75, description: 'CSS framework for responsive web design' },
  { name: 'Sass', category: 'tool', popularityScore: 70, description: 'CSS extension language' },
  { name: 'Styled Components', category: 'framework', popularityScore: 68, description: 'CSS-in-JS library for styling React components' },
  { name: 'Chakra UI', category: 'framework', popularityScore: 65, description: 'Modular and accessible component library' },
  { name: 'Material-UI', category: 'framework', popularityScore: 72, description: 'React components implementing Google\'s Material Design' },
  
  // State Management
  { name: 'Redux', category: 'framework', popularityScore: 80, description: 'Predictable state container for JavaScript apps' },
  { name: 'Zustand', category: 'framework', popularityScore: 75, description: 'Small, fast and scalable state management' },
  { name: 'Recoil', category: 'framework', popularityScore: 60, description: 'Experimental state management library for React' },
  { name: 'MobX', category: 'framework', popularityScore: 58, description: 'Simple, scalable state management through reactive programming' },
  
  // API & Data Fetching
  { name: 'GraphQL', category: 'tool', popularityScore: 85, description: 'Query language and runtime for APIs' },
  { name: 'Apollo', category: 'framework', popularityScore: 75, description: 'Comprehensive state management library for JavaScript' },
  { name: 'Prisma', category: 'tool', popularityScore: 82, description: 'Next-generation ORM for Node.js and TypeScript' },
  { name: 'tRPC', category: 'framework', popularityScore: 78, description: 'End-to-end typesafe APIs made easy' },
  { name: 'Axios', category: 'tool', popularityScore: 88, description: 'Promise-based HTTP client for JavaScript' },
  { name: 'SWR', category: 'framework', popularityScore: 72, description: 'Data fetching library for React' },
  { name: 'React Query', category: 'framework', popularityScore: 85, description: 'Data fetching and caching library for React' },
  
  // Domain-Specific Technologies
  { name: 'Machine Learning', category: 'domain', popularityScore: 95, description: 'Field of AI focused on algorithms that improve through experience' },
  { name: 'Data Science', category: 'domain', popularityScore: 90, description: 'Field that uses scientific methods to extract insights from data' },
  { name: 'DevOps', category: 'domain', popularityScore: 88, description: 'Practices combining software development and IT operations' },
  { name: 'Cybersecurity', category: 'domain', popularityScore: 85, description: 'Practice of protecting systems and networks from digital attacks' },
  { name: 'Blockchain', category: 'domain', popularityScore: 70, description: 'Distributed ledger technology' },
  { name: 'IoT', category: 'domain', popularityScore: 68, description: 'Internet of Things - network of interconnected computing devices' },
  { name: 'AR/VR', category: 'domain', popularityScore: 65, description: 'Augmented and Virtual Reality technologies' },
  { name: 'Game Development', category: 'domain', popularityScore: 75, description: 'Process of creating video games' },
  { name: 'Mobile Development', category: 'domain', popularityScore: 80, description: 'Development of applications for mobile devices' },
  { name: 'Web Development', category: 'domain', popularityScore: 95, description: 'Development of websites and web applications' },
  { name: 'Desktop Development', category: 'domain', popularityScore: 60, description: 'Development of applications for desktop computers' },
  { name: 'API Development', category: 'domain', popularityScore: 85, description: 'Development of Application Programming Interfaces' },
  { name: 'Microservices', category: 'domain', popularityScore: 78, description: 'Architectural approach to building distributed systems' },
  
  // AI & ML Specific
  { name: 'TensorFlow', category: 'framework', popularityScore: 85, description: 'Open source machine learning framework' },
  { name: 'PyTorch', category: 'framework', popularityScore: 88, description: 'Machine learning framework based on Torch library' },
  { name: 'Scikit-learn', category: 'framework', popularityScore: 80, description: 'Machine learning library for Python' },
  { name: 'Pandas', category: 'framework', popularityScore: 82, description: 'Data manipulation and analysis library for Python' },
  { name: 'NumPy', category: 'framework', popularityScore: 78, description: 'Library for scientific computing with Python' },
  { name: 'OpenAI', category: 'tool', popularityScore: 90, description: 'AI research and deployment company' },
  { name: 'Hugging Face', category: 'tool', popularityScore: 75, description: 'Platform for machine learning and natural language processing' },
]

async function main() {
  console.log('🌱 Seeding database with technologies...')
  
  // Clear existing technologies (if tables exist)
  try {
    await prisma.userTechnology.deleteMany({})
    await prisma.technology.deleteMany({})
    console.log('🗑️ Cleared existing technology data')
  } catch (error) {
    console.log('ℹ️ No existing data to clear (fresh database)')
  }
  
  // Seed technologies
  for (const tech of technologies) {
    await prisma.technology.create({
      data: tech,
    })
  }
  
  console.log(`✅ Created ${technologies.length} technologies`)
  
  // Log statistics by category
  const categories = ['language', 'framework', 'tool', 'domain']
  for (const category of categories) {
    const count = technologies.filter(t => t.category === category).length
    console.log(`   📊 ${category}: ${count} technologies`)
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🔌 Database connection closed')
  })