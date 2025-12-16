/**
 * Sample Seed Data for Portfolio
 * 
 * Use this to populate your database with initial data.
 * Can be imported into MongoDB Compass or run as a script.
 */

// ==============================================================================
// SKILLS Collection
// ==============================================================================
db.skills.insertMany([
   // Frontend
   {
      name: "React",
      category: "Frontend",
      icon: "⚛️",
      color: "#61DAFB",
      level: "Expert",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "TypeScript",
      category: "Frontend",
      icon: "📘",
      color: "#3178C6",
      level: "Advanced",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "Tailwind CSS",
      category: "Frontend",
      icon: "🎨",
      color: "#06B6D4",
      level: "Expert",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "JavaScript",
      category: "Frontend",
      icon: "📙",
      color: "#F7DF1E",
      level: "Expert",
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date()
   },

   // Backend
   {
      name: "Node.js",
      category: "Backend",
      icon: "🟢",
      color: "#68A063",
      level: "Expert",
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "Express.js",
      category: "Backend",
      icon: "⚡",
      color: "#000000",
      level: "Expert",
      order: 6,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "Python",
      category: "Backend",
      icon: "🐍",
      color: "#3776AB",
      level: "Intermediate",
      order: 7,
      createdAt: new Date(),
      updatedAt: new Date()
   },

   // Database
   {
      name: "MongoDB",
      category: "Database",
      icon: "🍃",
      color: "#13AA52",
      level: "Advanced",
      order: 8,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "PostgreSQL",
      category: "Database",
      icon: "🐘",
      color: "#336791",
      level: "Intermediate",
      order: 9,
      createdAt: new Date(),
      updatedAt: new Date()
   },

   // Tools
   {
      name: "Git",
      category: "Tools",
      icon: "🔗",
      color: "#F1502F",
      level: "Expert",
      order: 10,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "Docker",
      category: "Tools",
      icon: "🐳",
      color: "#2496ED",
      level: "Intermediate",
      order: 11,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "VS Code",
      category: "Tools",
      icon: "💻",
      color: "#007ACC",
      level: "Expert",
      order: 12,
      createdAt: new Date(),
      updatedAt: new Date()
   }
]);

// ==============================================================================
// EXPERIENCE Collection
// ==============================================================================
db.experience.insertMany([
   {
      title: "Senior Full Stack Engineer",
      company: "Tech Corp",
      startDate: new Date("2022-01-15"),
      endDate: null,
      location: "San Francisco, CA",
      description: "Led frontend and backend architecture for production applications",
      responsibilities: [
         "Architected microservices backend handling 1M+ requests/day",
         "Mentored 5 junior developers, improving team productivity by 30%",
         "Reduced API latency by 40% through optimization and caching strategies",
         "Implemented CI/CD pipelines reducing deployment time from 2h to 15m",
         "Designed and implemented real-time collaborative features using WebSockets"
      ],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "Full Stack Engineer",
      company: "StartUp Labs",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2021-12-31"),
      location: "New York, NY",
      description: "Built and maintained MERN stack applications for various clients",
      responsibilities: [
         "Developed 3 full-featured web applications from scratch to production",
         "Implemented MongoDB schemas and optimized database queries",
         "Created responsive UI components using React and Tailwind CSS",
         "Set up automated testing pipeline increasing code coverage to 85%",
         "Integrated third-party APIs (Stripe, Cloudinary, SendGrid)"
      ],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "Junior Frontend Developer",
      company: "Digital Agency",
      startDate: new Date("2019-03-01"),
      endDate: new Date("2020-05-31"),
      location: "Boston, MA",
      description: "Developed responsive web interfaces for diverse client projects",
      responsibilities: [
         "Built responsive websites using HTML, CSS, and JavaScript",
         "Collaborated with designers to implement pixel-perfect UI designs",
         "Improved website performance, increasing speed score from 45 to 92",
         "Maintained legacy jQuery codebase while gradually migrating to React",
         "Participated in daily standups and sprint planning meetings"
      ],
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date()
   }
]);

// ==============================================================================
// CERTIFICATES Collection
// ==============================================================================
db.certificates.insertMany([
   {
      title: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      issueDate: new Date("2023-06-15"),
      expiryDate: new Date("2025-06-15"),
      credentialId: "AWS-SOLUTIONS-ARCH-2023",
      description: "Professional-level certification demonstrating expertise in designing scalable, reliable, and secure AWS architectures. Covers advanced AWS services, cost optimization, and best practices for enterprise deployments.",
      skills: [
         "AWS EC2",
         "AWS S3",
         "AWS Lambda",
         "AWS RDS",
         "CloudFront",
         "VPC",
         "IAM",
         "Auto Scaling"
      ],
      highlights: [
         "Designed highly available multi-region architectures",
         "Implemented advanced security with encryption and IAM policies",
         "Optimized costs through reserved instances and caching",
         "Passed exam with 850/1000 score"
      ],
      gradient: "linear-gradient(135deg, #FF9900 0%, #232F3E 100%)",
      verificationUrl: "https://aws.amazon.com/verification/",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "Google Cloud Associate Cloud Engineer",
      issuer: "Google Cloud",
      issueDate: new Date("2023-03-20"),
      expiryDate: new Date("2025-03-20"),
      credentialId: "GCP-CLOUD-ENGINEER-2023",
      description: "Associate-level certification validating expertise in deploying and managing applications on Google Cloud. Covers compute, storage, networking, and operations.",
      skills: [
         "Google Compute Engine",
         "Google Cloud Storage",
         "Google Cloud SQL",
         "Google App Engine",
         "Cloud Run",
         "Cloud Functions"
      ],
      highlights: [
         "Deployed applications using Kubernetes on GKE",
         "Managed cloud resources and monitoring",
         "Implemented networking and security policies"
      ],
      gradient: "linear-gradient(135deg, #EA4335 0%, #4285F4 100%)",
      verificationUrl: "https://cloud.google.com/certification/cloud-engineer",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "MongoDB Certified Developer Associate",
      issuer: "MongoDB, Inc.",
      issueDate: new Date("2023-01-10"),
      expiryDate: new Date("2025-01-10"),
      credentialId: "MONGO-DEV-ASSOC-2023",
      description: "Developer-level certification demonstrating proficiency in developing applications using MongoDB. Covers CRUD operations, aggregation framework, and indexing strategies.",
      skills: [
         "MongoDB Aggregation",
         "Data Modeling",
         "Indexing",
         "Transactions",
         "Replication",
         "Sharding"
      ],
      highlights: [
         "Mastered aggregation pipeline for complex queries",
         "Optimized indexes for query performance",
         "Designed scalable data models"
      ],
      gradient: "linear-gradient(135deg, #13AA52 0%, #0B7E3F 100%)",
      verificationUrl: "https://university.mongodb.com/certification",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date()
   }
]);

// ==============================================================================
// PROJECTS Collection
// ==============================================================================
db.projects.insertMany([
   {
      title: "Neural Canvas",
      slug: "neural-canvas",
      description: "AI-powered digital art generation platform using deep learning",
      fullDescription: "Neural Canvas is a full-stack web application that leverages cutting-edge deep learning models to generate unique digital artwork from user inputs. The platform features real-time rendering, advanced image processing, and a collaborative canvas where users can share and remix creations. Built with React for the frontend and Node.js/Express for the backend, with TensorFlow.js for ML computations on the client side.",
      techStack: [
         "React",
         "TypeScript",
         "Node.js",
         "Express",
         "MongoDB",
         "TensorFlow.js",
         "WebSocket",
         "Tailwind CSS"
      ],
      features: [
         "Real-time AI image generation using neural networks",
         "Collaborative drawing canvas with live multiplayer support",
         "User artwork gallery with social features",
         "Advanced style transfer capabilities",
         "Export in multiple formats (PNG, SVG, WebP)",
         "Community sharing and artwork remixing system"
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: "https://res.cloudinary.com/example/image/upload/neural-canvas.jpg",
      links: {
         live: "https://neural-canvas-demo.com",
         repo: "https://github.com/username/neural-canvas"
      },
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "CryptoFlow",
      slug: "cryptoflow",
      description: "Real-time cryptocurrency portfolio tracking and analytics platform",
      fullDescription: "CryptoFlow is a comprehensive cryptocurrency portfolio management application. Users can track their investments across multiple wallets, view detailed analytics with interactive charts, and receive alerts for price movements. The backend integrates with multiple crypto APIs to provide real-time price data and market analysis. Advanced features include portfolio rebalancing suggestions and tax reporting for gains and losses.",
      techStack: [
         "React",
         "Redux",
         "Node.js",
         "Express",
         "PostgreSQL",
         "Chart.js",
         "Stripe API",
         "CoinGecko API"
      ],
      features: [
         "Multi-wallet portfolio tracking and aggregation",
         "Real-time price updates and market data",
         "Interactive portfolio analytics with advanced charts",
         "Price alert notifications for cryptocurrencies",
         "Portfolio rebalancing recommendations",
         "Tax reporting and capital gains calculation",
         "Secure user authentication with 2FA"
      ],
      gradient: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
      imageUrl: "https://res.cloudinary.com/example/image/upload/cryptoflow.jpg",
      links: {
         live: "https://cryptoflow-app.com",
         repo: "https://github.com/username/cryptoflow"
      },
      featured: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "DevSync",
      slug: "devsync",
      description: "Team collaboration platform for distributed software development",
      fullDescription: "DevSync is a unified collaboration platform designed specifically for distributed development teams. It integrates code repositories, project management, team communication, and knowledge sharing into one seamless experience. Features include real-time code collaboration, automated deployment tracking, and intelligent team insights.",
      techStack: [
         "React",
         "Next.js",
         "Node.js",
         "MongoDB",
         "Socket.io",
         "Git API",
         "Docker"
      ],
      features: [
         "Real-time collaborative code editor",
         "GitHub and GitLab integration",
         "Team task management and sprint planning",
         "Code review and CI/CD pipeline integration",
         "Team communication with channels and DMs",
         "Knowledge base and documentation sharing"
      ],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      imageUrl: "https://res.cloudinary.com/example/image/upload/devsync.jpg",
      links: {
         live: "https://devsync-platform.com",
         repo: "https://github.com/username/devsync"
      },
      featured: false,
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      title: "EcoTrack",
      slug: "ecotrack",
      description: "Personal carbon footprint tracker and sustainability recommendations",
      fullDescription: "EcoTrack helps individuals understand and reduce their environmental impact. The app tracks carbon emissions from daily activities including transportation, energy consumption, and shopping habits. Provides personalized recommendations for reducing carbon footprint and connects users with local sustainability initiatives.",
      techStack: [
         "React Native",
         "Firebase",
         "Python",
         "Flask",
         "TensorFlow",
         "Google Maps API"
      ],
      features: [
         "Activity tracking and carbon calculation",
         "Personalized sustainability recommendations",
         "Community challenges and achievements",
         "Integration with smart home devices",
         "Carbon offset marketplace",
         "Progress visualization and goal setting"
      ],
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      imageUrl: "https://res.cloudinary.com/example/image/upload/ecotrack.jpg",
      links: {
         live: "https://ecotrack-app.com",
         repo: "https://github.com/username/ecotrack"
      },
      featured: false,
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date()
   }
]);

console.log("✅ Seed data inserted successfully!");
console.log("Skills: 12 inserted");
console.log("Experience: 3 inserted");
console.log("Certificates: 3 inserted");
console.log("Projects: 4 inserted");

// ==============================================================================
// HOW TO USE THIS DATA
// ==============================================================================
// 1. Copy the content above
// 2. Open MongoDB Compass
// 3. Connect to your database
// 4. Open the "mongosh" terminal (View > Show Console)
// 5. Paste the code and run
//
// Alternative - Save as file and run:
// mongosh < seed-data.js
//
// Note: This will insert duplicate data if run multiple times.
// To clear first, run:
// db.skills.deleteMany({})
// db.experience.deleteMany({})
// db.certificates.deleteMany({})
// db.projects.deleteMany({})
