/**
 * Copy and data for the site, taken from the Wise Work company profile deck.
 * Every page reads from here so numbers stay consistent.
 */

export const CONTACT = {
  email: "info@wisework.in",
  site: "www.wisework.in",
  countries: ["India", "Saudi Arabia", "USA"],
};

export const HEADLINE_STATS = [
  { value: 140, suffix: "+", label: "Patents filed" },
  { value: 100, suffix: "+", label: "Grants worldwide" },
  { value: 50, suffix: "+", label: "Years combined leadership" },
  { value: 4, suffix: "", label: "Flagship platforms" },
];

export const GLANCE_STATS = [
  { value: "50+", label: "Years of combined leadership experience" },
  { value: "140+", label: "Patents filed by our founder" },
  { value: "100+", label: "Patent grants worldwide" },
  { value: "1 of 16", label: "Companies recognized by MCIT on the AdopTech stage, LEAP 2026" },
  { value: "4", label: "Flagship platforms, plus AI and IT services and Patent Gym™" },
  { value: "3", label: "Countries: India, Saudi Arabia and USA" },
  { value: "20+", label: "Clients and partners, from enterprise IT to education and health tech" },
  { value: "20+", label: "MOUs signed across USA, Europe, UK, Middle East and India" },
];

export const CLIENT_LOGOS = [
  { name: "SDAIA", file: "sdaia" },
  { name: "Ministry of Communications and Information Technology", file: "mcit" },
  { name: "DXC Technology", file: "dxc" },
  { name: "Allianz", file: "allianz" },
  { name: "Wareef", file: "wareef" },
  { name: "MIS", file: "mis" },
  { name: "Tamer Group", file: "tamer" },
  { name: "HSB", file: "hsb" },
  { name: "PwC", file: "pwc" },
  { name: "Beyond Consulting", file: "beyond-consulting" },
  { name: "Mentora", file: "mentora" },
  { name: "Smart Law", file: "smart-law" },
  { name: "edGICT", file: "edgict" },
  { name: "Progspectra", file: "progspectra" },
  { name: "Third Wave", file: "third-wave" },
  { name: "Awesome IT Solutions", file: "awesome-it" },
  { name: "GICT Training & Certification", file: "gict-training" },
  { name: "Heritage", file: "heritage" },
  { name: "Intelligent Digitalization Ventures", file: "idv" },
  { name: "Longer Life Tech", file: "longer-life" },
  { name: "Hue Learn", file: "hue-learn" },
];

export const INDUSTRIES = ["Banking", "Healthcare", "Logistics", "Education", "Manufacturing", "Retail", "Oil & Gas"];

export const RECOGNITION = {
  eyebrow: "AdopTech third edition · MCIT, Saudi Arabia",
  title: "Recognized by MCIT at LEAP 2026",
  body: "Wise Work received a Certificate of Appreciation from Saudi Arabia's Ministry of Communications and Information Technology for its Wise Maestro™ deployment at Tamer Group.",
  stats: [
    { value: "150+", label: "Technology providers engaged by MCIT" },
    { value: "145", label: "Proposed solutions evaluated, ours included" },
    { value: "20", label: "Proof-of-concept projects for clients in Saudi Arabia" },
    { value: "16", label: "Companies recognized on the AdopTech stage" },
  ],
};

export type Feature = { label: string; icon: string };

export type CaseStudy = {
  client: string;
  logo?: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  highlight: { value: string; label: string };
  quote?: string;
};

export type Comparison = {
  competitors: string[];
  rows: { feature: string; values: string[] }[];
  note: string;
};

export type ProductSlug = "wise-ultima" | "wise-migrate" | "istruct" | "wise-maestro";

export type Product = {
  slug: ProductSlug;
  name: string;
  short: string;
  category: string;
  logo: { src: string; width: number; height: number };
  summary: string;
  description: string;
  headline: { value: string; label: string };
  features: Feature[];
  steps?: { title: string; body: string }[];
  roi: {
    title: string;
    figureLabel: string;
    figure: string;
    figureNote: string;
    baseline: string;
    drivers: { value?: string; label: string }[];
  };
  screens: { src: string; width: number; height: number; title: string; body: string }[];
  comparison: Comparison;
  cases: CaseStudy[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "wise-ultima",
    name: "Wise Ultima™",
    short: "Wise Ultima",
    category: "Infra Health Management",
    logo: { src: "/deck/logo-ultima.webp", width: 600, height: 160 },
    summary:
      "AI-driven IT infrastructure health monitoring with predictive alerts and prescriptive actions, reducing downtime and optimizing costs.",
    description:
      "An AI infra-monitoring and management platform that shows the health of your whole IT infrastructure, predicts issues before they occur and prescribes the actions to fix them. Manage thousands of servers, databases, storage, backup, network and middleware.",
    headline: { value: "50%", label: "faster incident resolution" },
    features: [
      { label: "CXO Health View", icon: "/figma/icon-reports.svg" },
      { label: "Predictive Alerts", icon: "/figma/icon-predictive.svg" },
      { label: "Real-Time Monitoring", icon: "/figma/icon-realtime.svg" },
      { label: "Auto-Healing Actions", icon: "/figma/icon-automated.svg" },
      { label: "WiseAI Chat", icon: "/figma/icon-insights.svg" },
    ],
    steps: [
      { title: "Infra Health", body: "Current, weekly and monthly predictions in three states: green, amber and red." },
      { title: "Prescriptive Actions", body: "AI models recommend the actions that prevent problems before they occur." },
      { title: "Wise Actions", body: "Deep ServiceNow integration turns recommendations into auto-healing." },
      { title: "Wise AI-Chat", body: "Ask about live infrastructure in plain English and get root causes and fixes." },
    ],
    roi: {
      title: "ROI on a typical 100-server environment",
      figureLabel: "Total estimated annual benefit",
      figure: "$500K–$750K",
      figureNote: "Year 1, mid-to-large enterprise with about 100 monitored servers.",
      baseline:
        "Complex hybrid and multi-cloud IT, 24/7 critical operations, with IT Ops, CXOs and IT Heads, and a ServiceNow-integrated support desk.",
      drivers: [
        { value: "40%", label: "Lower operational costs through resource and manual-effort optimization" },
        { value: "50%", label: "Faster incident resolution through automated prescriptive actions" },
        { value: "60%", label: "Early detection of P1 and P2 critical issues" },
        { value: "25%", label: "Overall early issue detection across infrastructure" },
      ],
    },
    screens: [
      { src: "/deck/ultima-cxo-health.webp", width: 1400, height: 875, title: "CXO Health View", body: "Infra health dashboard with current, weekly and monthly predictions." },
      { src: "/deck/ultima-wise-actions.webp", width: 1400, height: 787, title: "Wise Actions", body: "Prescriptive actions with deep ServiceNow integration for auto-healing." },
      { src: "/deck/ultima-monitor.webp", width: 1400, height: 874, title: "Wise Monitor", body: "Real-time monitoring across servers, databases, storage and network." },
      { src: "/deck/ultima-ai-chat.webp", width: 1400, height: 881, title: "Wise AI-Chat", body: "Deep insights and expert guidance through natural language." },
    ],
    comparison: {
      competitors: ["Wise Ultima™", "Dynatrace", "SolarWinds", "Dell AIOps", "Komodor", "Causely", "groundcover"],
      rows: [
        { feature: "Infra observability", values: ["Yes", "Yes", "Yes", "Partial", "Partial", "Partial", "Yes"] },
        { feature: "CXO predictive views", values: ["Yes", "Partial", "Partial", "Partial", "No", "No", "No"] },
        { feature: "Prescriptive actions", values: ["Yes", "Partial", "Partial", "Partial", "Partial", "Partial", "Partial"] },
        { feature: "Auto healing", values: ["Yes", "Yes", "Partial", "Partial", "Yes", "Partial", "No"] },
        { feature: "Specialized AI agents (cost, security, resource)", values: ["Yes", "Partial", "Partial", "No", "Partial", "No", "Partial"] },
        { feature: "LLM-powered chat", values: ["Yes", "Yes", "Yes", "Partial", "Yes", "Partial", "Yes"] },
        { feature: "Automated ITIM ticketing", values: ["Yes", "Yes", "Yes", "Yes", "Partial", "Partial", "Partial"] },
      ],
      note: "Based on vendor documentation, October 2026. Dell AIOps includes Moogsoft, acquired by Dell in 2023.",
    },
    cases: [
      {
        client: "DXC Technology",
        logo: "/deck/clients/dxc.webp",
        title: "Predictive operations for a global US client",
        problem: "Limited real-time visibility and reactive IT management across a complex global infrastructure led to downtime and higher costs.",
        solution: "Wise Ultima™ added predictive monitoring, automated issue resolution and executive-friendly dashboards.",
        impact: "25% earlier issue detection, 50% faster resolutions and 40% cost reduction, with 99.9% uptime.",
        highlight: { value: "99.9%", label: "uptime" },
      },
      {
        client: "Alkraft",
        logo: "/deck/client-alkraft.webp",
        title: "No more surprise server crashes",
        problem: "A critical application's server overheated under sustained 100% CPU load and crashed, with no monitoring to show the warning signs.",
        solution: "Wise Ultima™ now monitors the estate end to end. It predicted the next CPU spike, found the root cause and recommended the fix.",
        impact: "Zero repeat crashes, early warning of CPU and temperature risks, and a team that fixes causes instead of firefighting.",
        highlight: { value: "0", label: "repeat crashes" },
      },
      {
        client: "DXC Technology",
        logo: "/deck/clients/dxc.webp",
        title: "WiseAI for a European financial services firm",
        problem: "4 data centers and 2 clouds. Every question meant a ticket, a specialist and an hours-long wait, and executives had no direct view.",
        solution: "WiseAI, a conversational assistant on live infrastructure data, answers admins and executives in plain English.",
        impact: "70% fewer status-request tickets, answers in seconds instead of hours and 45% faster triage.",
        highlight: { value: "70%", label: "fewer status tickets" },
      },
    ],
  },
  {
    slug: "wise-migrate",
    name: "Wise Migrate™",
    short: "Wise Migrate",
    category: "Cloud Migration Planner",
    logo: { src: "/deck/logo-migrate.webp", width: 600, height: 217 },
    summary:
      "Cloud migration automation with zero-downtime cutovers, multi-cloud support, dependency mapping and rollback readiness.",
    description:
      "AI-driven cloud migration from scope to cutover. Map dependencies automatically, right-size the target cloud and plan every wave with a clear cutover window.",
    headline: { value: "70%", label: "less cutover planning effort" },
    features: [
      { label: "Dependency Mapping", icon: "/figma/icon-realtime.svg" },
      { label: "AI Right-Sizing", icon: "/figma/icon-predictive.svg" },
      { label: "Wave Planning", icon: "/figma/icon-reports.svg" },
      { label: "Multi-Cloud Support", icon: "/figma/icon-transfer-blue.svg" },
      { label: "Rollback Readiness", icon: "/figma/icon-automated.svg" },
    ],
    steps: [
      { title: "Gather Scope", body: "Capture the initial scope and infrastructure inventory of the migration." },
      { title: "Visualize Architecture", body: "Map the current system architecture with accurate dependency mapping." },
      { title: "AI Target Architecture", body: "Right-size the target cloud, with reasoning for the closest-matching instance." },
      { title: "Wave Planning", body: "Sequenced wave plans with cutover windows and move-group scheduling." },
    ],
    roi: {
      title: "ROI on a typical 100-server migration",
      figureLabel: "Total estimated annual benefit",
      figure: "$450K–$600K",
      figureNote: "Year 1, about 100 on-premise servers migrating to AWS or Azure.",
      baseline:
        "Hybrid enterprise workloads, a 4–8 month migration, with Cloud Architects, Infra SMEs, Migration PMO and Application Owners.",
      drivers: [
        { label: "Faster migration planning" },
        { label: "Improved dependency visibility" },
        { label: "Reduced migration risk" },
        { label: "Lower cloud overprovisioning" },
        { label: "Better migration governance and transparency" },
      ],
    },
    screens: [
      { src: "/deck/migrate-dashboard.webp", width: 1400, height: 875, title: "Project Dashboard", body: "Project initialization and cloud provider selection in one place." },
      { src: "/deck/migrate-dependencies.webp", width: 1400, height: 873, title: "Dependency Mapping", body: "Current architecture with critical dependencies between servers and applications." },
      { src: "/deck/migrate-rightsizing.webp", width: 1400, height: 880, title: "AI Right-Sizing", body: "Target cloud architecture with right-sizing for each workload." },
      { src: "/deck/migrate-wave-plan.webp", width: 1400, height: 880, title: "Wave Plan", body: "Non-critical systems early, dependent stacks grouped into move groups." },
    ],
    comparison: {
      competitors: ["Wise Migrate™", "AWS Migration Hub", "Azure Migrate", "Google Cloud MC", "FADDOM"],
      rows: [
        { feature: "Automated data reconciliation", values: ["Yes", "Yes", "Partial", "Partial", "Partial"] },
        { feature: "Interactive architecture visualization", values: ["Yes", "Yes", "Yes", "Partial", "Partial"] },
        { feature: "Automated dependency mapping", values: ["Yes", "Yes", "Yes", "Partial", "Yes"] },
        { feature: "AI target architecture recommendations", values: ["Yes", "Yes", "Yes", "Yes", "Partial"] },
        { feature: "Cost optimization and analysis", values: ["Yes", "Yes", "Yes", "Yes", "Partial"] },
        { feature: "Multi-cloud support", values: ["Yes", "Partial", "Partial", "Partial", "Partial"] },
        { feature: "Wave and move-group planning", values: ["Yes", "Partial", "Partial", "Partial", "Yes"] },
      ],
      note: "“Partial” means the capability is limited or offered only in part.",
    },
    cases: [
      {
        client: "DXC Technology",
        logo: "/deck/clients/dxc.webp",
        title: "154+ servers, planned in a fraction of the time",
        problem: "154+ servers with manual reconciliation, no system visibility and heavy manual cutover effort.",
        solution: "Automated reconciliation, instant dependency mapping, AI-driven right-sizing and automated scheduling.",
        impact: "60% faster reconciliation with higher accuracy, full dependency visibility and 70% less cutover planning effort.",
        highlight: { value: "70%", label: "less cutover planning" },
      },
    ],
  },
  {
    slug: "istruct",
    name: "iStruct™",
    short: "iStruct",
    category: "Document Extraction",
    logo: { src: "/deck/logo-istruct.webp", width: 600, height: 188 },
    summary:
      "Extracts, validates and structures data from Arabic and English documents, with human review and template-based report generation.",
    description:
      "AI-powered document processing. iStruct™ reads Arabic, English and mixed-language documents, including tables and handwriting, validates the values and generates ready-to-use business documents in your template.",
    headline: { value: "~70%", label: "less reporting time" },
    features: [
      { label: "Arabic & English", icon: "/figma/icon-insights.svg" },
      { label: "AI Extraction", icon: "/figma/icon-predictive.svg" },
      { label: "Human Review", icon: "/figma/icon-realtime.svg" },
      { label: "Template Output", icon: "/figma/icon-reports.svg" },
      { label: "Full Traceability", icon: "/figma/icon-automated.svg" },
    ],
    steps: [
      { title: "Ingest and Classify", body: "Upload one document or a related package as a single job; files are validated and classified." },
      { title: "AI Extraction", body: "AI and computer vision extract text, fields, tables and handwriting with confidence scores." },
      { title: "Validate and Review", body: "Values are reconciled; uncertain data goes to human-in-the-loop review." },
      { title: "Generate Output", body: "Approved data is mapped to your Word template to produce the final DOCX." },
    ],
    roi: {
      title: "ROI on a typical fuel station reporting workflow",
      figureLabel: "Estimated time saved",
      figure: "~70%",
      figureNote: "Less time per station on daily reporting: 52.5–75 hours a month today, under 17.5 hours with iStruct™.",
      baseline:
        "A station worker plus a head-office accountant, 30 station-days a month. Indicative figures, to be baselined in a parallel run.",
      drivers: [
        { value: "7 → 4", label: "Steps for the station worker" },
        { value: "8 → 4", label: "Steps for head office" },
        { value: "Same day", label: "Reconciliation on submission, not 1–2 days later" },
        { value: "< 10 hrs", label: "Station worker time a month, down from 30–45" },
      ],
    },
    screens: [
      { src: "/deck/istruct-dashboard.webp", width: 1152, height: 528, title: "Processing Dashboard", body: "AI-assisted extraction with confidence scores." },
      { src: "/deck/istruct-verification.webp", width: 1143, height: 648, title: "Side-by-side Verification", body: "Source and data side by side, with in-place edits." },
      { src: "/deck/istruct-review.webp", width: 1024, height: 460, title: "Human Review Queue", body: "Low-confidence values wait for a person to check them." },
      { src: "/deck/istruct-proposal.webp", width: 1330, height: 607, title: "Credit Proposal Generation", body: "Checks pass, then the full proposal downloads as Word." },
    ],
    comparison: {
      competitors: ["iStruct™", "Reducto", "Extend", "Mindee", "Nanonets", "Azure DI", "Arabic-first*"],
      rows: [
        { feature: "Arabic, including handwriting", values: ["Yes", "Partial", "Partial", "–", "No", "Yes", "Yes"] },
        { feature: "Schema built from a sample report", values: ["Yes", "No", "Yes", "No", "No", "No", "No"] },
        { feature: "Final report in your template", values: ["Yes", "Partial", "Partial", "No", "No", "No", "No"] },
        { feature: "Handwriting detection", values: ["Yes", "Yes", "Yes", "No", "No", "–", "–"] },
        { feature: "Side-by-side review", values: ["Yes", "No", "Yes", "No", "No", "–", "–"] },
        { feature: "Human in the loop", values: ["Yes", "No", "Yes", "No", "No", "No", "Partial"] },
        { feature: "On-prem or private cloud", values: ["Yes", "Yes", "Yes", "No", "Yes", "Yes", "Partial"] },
      ],
      note: "Public vendor information, October 2026. “–” means not rated. * AlQari, Arabic.AI, Sanad.",
    },
    cases: [
      {
        client: "Saudi conglomerate, 200+ fuel stations",
        title: "From WhatsApp and Excel to one dashboard",
        problem: "Station staff photographed meters and receipts and sent them by WhatsApp; a clerk checked every screenshot and typed values into Excel.",
        solution: "Staff capture on an Android phone, iStruct™ extracts and validates the values, and a reviewer approves before the database updates automatically.",
        impact: "Head-office time per station drops from 22.5–30 hours to 5–7.5 hours a month, reconciled the same day.",
        highlight: { value: "200+", label: "stations on one dashboard" },
      },
    ],
  },
  {
    slug: "wise-maestro",
    name: "Wise Maestro™",
    short: "Wise Maestro",
    category: "Enterprise Private GPT",
    logo: { src: "/deck/logo-maestro.webp", width: 600, height: 209 },
    summary:
      "Enterprise AI for document and knowledge intelligence: semantic search, RAG and process automation, cutting manual work by 60–70%.",
    description:
      "A private GPT for businesses to unlock hidden gems in their data. Multi-modal search across text, images, audio and video, with multilingual support including Arabic and English. Your data never leaves your governance.",
    headline: { value: "60–70%", label: "less manual work" },
    features: [
      { label: "Private, On-Prem", icon: "/figma/icon-automated.svg" },
      { label: "DeepSearch", icon: "/figma/icon-predictive.svg" },
      { label: "Arabic & English", icon: "/figma/icon-insights.svg" },
      { label: "Agent Orchestration", icon: "/figma/icon-transfer-blue.svg" },
      { label: "PDF Export", icon: "/figma/icon-reports.svg" },
    ],
    steps: [
      { title: "Enhanced Decision-Making", body: "Quick access to critical data for informed decisions across the organization." },
      { title: "Operational Efficiency", body: "Find information in any format or language and streamline workflows." },
      { title: "Private by Design", body: "No public LLMs: data stays under your own governance and role-based access." },
      { title: "Excel Ingestion", body: "Direct Excel ingestion with bilingual Arabic–English insights." },
    ],
    roi: {
      title: "ROI of enterprise knowledge intelligence",
      figureLabel: "Estimated manual work reduction",
      figure: "60–70%",
      figureNote: "Less manual work through semantic search, RAG and process automation on your own data.",
      baseline:
        "Teams searching and reading documents by hand across departments, in Arabic and English. Indicative, confirmed per deployment.",
      drivers: [
        { value: "80%", label: "Faster insights with Arabic semantic search" },
        { value: "3×", label: "Increase in Arabic client satisfaction" },
        { value: "Private", label: "No public LLMs, data under the client's governance" },
        { value: "Excel", label: "Direct ingestion with bilingual insights" },
      ],
    },
    screens: [
      { src: "/deck/maestro-deepsearch.webp", width: 1149, height: 582, title: "DeepSearch", body: "Ask in your own language and search across all content." },
      { src: "/deck/maestro-projects.webp", width: 1337, height: 453, title: "Projects and Roles", body: "Manage projects and control access by role." },
      { src: "/deck/maestro-find-files.webp", width: 1400, height: 712, title: "Find in Files", body: "See the source files behind every answer." },
      { src: "/deck/maestro-export.webp", width: 1145, height: 527, title: "PDF Export", body: "Export DeepSearch results as a PDF." },
    ],
    comparison: {
      competitors: ["Wise Maestro™", "Claude", "Microsoft Copilot", "ChatGPT", "Perplexity"],
      rows: [
        { feature: "Secure on-prem deployment", values: ["Yes", "Partial", "Partial", "Partial", "Partial"] },
        { feature: "Multilingual retrieval", values: ["Yes", "Yes", "Yes", "Yes", "Yes"] },
        { feature: "Local model support", values: ["Yes", "Partial", "Partial", "Partial", "Partial"] },
        { feature: "Rich media support", values: ["Yes", "Yes", "Yes", "Yes", "Yes"] },
        { feature: "Dedicated admin interface", values: ["Yes", "Partial", "Yes", "Partial", "Partial"] },
        { feature: "Dynamic agent orchestration", values: ["Yes", "Yes", "Partial", "Partial", "Partial"] },
        { feature: "DeepSearch and PDF export", values: ["Yes", "Yes", "Partial", "Yes", "Yes"] },
      ],
      note: "“Partial” means the capability is limited or offered only in part.",
    },
    cases: [
      {
        client: "Tamer Group",
        logo: "/deck/clients/tamer.webp",
        title: "A private GPT for a logistics division",
        problem: "Valuable internal data sat isolated in departments, and the group would not use public LLMs for fear of data leaks.",
        solution: "Through MCIT's AdopTech program, Wise Maestro™ was deployed, integrated with internal systems and segregated per Tamer's data governance.",
        impact: "Teams use internal systems and data far more efficiently without public LLMs, and Wise Work received an MCIT award at LEAP 2026.",
        highlight: { value: "MCIT", label: "award at LEAP 2026" },
        quote:
          "Highly satisfied with the demonstrated performance. The results are excellent, meeting or exceeding all set KPIs, particularly the Agentic AI orchestration capabilities.",
      },
      {
        client: "Beyond Consulting Ltd.",
        logo: "/deck/clients/beyond-consulting.webp",
        title: "Arabic semantic search",
        problem: "Delays from manual Arabic querying and no unified Arabic–English data processing.",
        solution: "Arabic semantic search with direct Excel ingestion and bilingual insights.",
        impact: "80% faster insights, 3× higher Arabic client satisfaction and seamless Excel integration.",
        highlight: { value: "80%", label: "faster insights" },
      },
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((product) => product.slug === slug);

export const SERVICE_PILLARS = [
  { title: "IT Consulting", body: "Infrastructure management and strategic planning.", icon: "/figma/icon-reports.svg" },
  { title: "Cloud Services", body: "Migration planning, optimization and multi-cloud solutions.", icon: "/figma/icon-transfer-blue.svg" },
  { title: "AI and ML Solutions", body: "LLMs, predictive analytics and computer vision.", icon: "/figma/icon-predictive.svg" },
  { title: "Process Automation", body: "Analytics and intelligent workflow solutions.", icon: "/figma/icon-automated.svg" },
];

export const SERVICE_EXTRAS = [
  "Generative AI and Custom LLMs",
  "Agentic AI",
  "Prescriptive Analytics",
  "Computer Vision and Document AI",
  "Cloud Cost Optimization",
  "Data Engineering and Analytics",
  "IoT and Robotics",
  "Frontend Development",
  "Backend Development",
  "Patent Tech Consulting",
];

export const TECH_GROUPS = ["Backend", "Frontend", "AI and ML", "Data", "Cloud", "3D and XR"];

export const EMAIL_CASE = {
  client: "US-NY insurance giant",
  partner: "via Trianz",
  title: "AI email classification, rescued and delivered",
  body: "The client needed 5,000 emails a day classified by AI. A first version from another team covered only 80 categories at under 70% accuracy and close to 20 seconds per email. Trianz brought us in, and we delivered all 160 categories.",
  columns: ["Client requirement", "Earlier attempt", "Delivered by Wise Work"],
  rows: [
    { metric: "Categories", values: ["160", "80", "160"] },
    { metric: "Accuracy", values: ["Above 80%", "Below 70%", "Above 95%"] },
    { metric: "Time per email", values: ["Under 10 sec", "About 20 sec", "3.5 sec"] },
  ],
  stack: "AWS Lambda, RAG, Claude Sonnet, DynamoDB and SQS, with PII security guards and end-to-end observability.",
};

export const MENTORA_CASE = {
  client: "Mentora",
  logo: "/deck/clients/mentora.webp",
  title: "AI-powered leadership and mentorship platform",
  points: [
    { title: "The product", body: "One of the earliest AI-driven leadership coaching apps, turning leadership principles into interactive LLM-powered lessons." },
    { title: "How it works", body: "Users learn through voice and chat. Scenario simulations are graded live by AI, and prompts adapt to each user." },
    { title: "Why it stands out", body: "Multimodal AI coaching on a context-aware model that adapts to every input." },
  ],
};

export const PATENT_GYM = {
  intro:
    "Helping enterprises, researchers, universities and innovators systematically create, evaluate and commercialize innovation and IP.",
  offerings: [
    { eyebrow: "Find hidden patents", title: "Patent Harvesting", body: "Identify hidden patents in existing and ongoing solutions from a technical standpoint.", icon: "/figma/icon-predictive.svg" },
    { eyebrow: "Create new patents", title: "Patent Seeding", body: "Generate new USPs and features in existing solutions and convert them into patents.", icon: "/figma/icon-insights.svg" },
    { eyebrow: "Copyrights & trademarks", title: "Other IPs", body: "Copyrights, trademarks, service marks and beyond.", icon: "/figma/icon-reports.svg" },
  ],
  testimonial: {
    quote:
      "Working with Dr. Madhan Srinivasan was a game-changer. His technical depth turned complex ideas into a strong, compelling draft that sailed through review seamlessly.",
    author: "Vice President, Accenture",
  },
  engines: [
    { title: "Patent Harvesting Engine™", body: "Finds hidden patents in existing products and solutions." },
    { title: "Patent Seeding Engine™", body: "Expands inventions into adjacent patent opportunities." },
    { title: "Patent Evaluation Engine™", body: "Scores novelty, inventive step and commercial relevance." },
    { title: "Patent Drafting Engine™", body: "Prepares patent drafts, reviewed by people." },
    { title: "Portfolio Intelligence Engine™", body: "Prioritizes and clusters the IP portfolio." },
    { title: "Commercialization Intelligence Engine™", body: "Guides how to monetize intellectual property." },
  ],
  layers: [
    { title: "Six Business Intelligence Engines", body: "Harvesting, Seeding, Evaluation, Drafting, Portfolio and Commercialization" },
    { title: "MBrain™: Patent Intelligence Core", body: "23+ years of patent consulting expertise and the Patent Gym™ methodology, codified as software" },
    { title: "Decision Intelligence Layer", body: "ML prediction, classification, scoring and trend analysis" },
    { title: "Multi-Model Intelligence Fabric", body: "LLM intelligence pods with a validation mesh" },
    { title: "Enterprise Patent Knowledge Graph", body: "Shared knowledge foundation for every component" },
  ],
  principles: [
    { title: "Human-Centric", body: "AI assists the inventor and never replaces them." },
    { title: "Multi-Model", body: "Different models for different patent tasks, cross-verified." },
    { title: "Human-Governed", body: "Patent Seeding always passes multi-level human validation." },
    { title: "Explainable", body: "Every score and recommendation carries its reasoning." },
    { title: "Compliance First", body: "Security and IP ownership are built in from day one." },
  ],
};

export const VISION = {
  title: "Empowering Humanity Using Innovation and Technology",
  missions: [
    { label: "Mission one", title: "Innovation-First", body: "We invent before we implement, with 140+ patents behind our products." },
    { label: "Mission two", title: "Customer-Centric", body: "Every platform is shaped by real enterprise problems and measured on outcomes." },
    { label: "Mission three", title: "Going the Extra Mile", body: "We take on the projects others could not finish, and see them through." },
  ],
};

export const FOUNDER = {
  name: "Dr. Madhan Kumar Srinivasan",
  role: "Founder and CEO",
  photo: "/figma/founder-madhan.png",
  stats: [
    { value: "140+", label: "Patents filed" },
    { value: "100+", label: "Grants worldwide" },
    { value: "23+", label: "Years of experience" },
    { value: "30+", label: "Research publications" },
  ],
  credentials: [
    "IIM Calcutta (EPBA)",
    "Ph.D. in Cloud AI",
    "Accenture Prolific Inventor, 1 of 49 recognized globally",
    "Creator of Cloud AI at Accenture",
    "Infosys Cloud Tech Guru award",
    "3× TEDx Speaker",
    "6× Founder and Teenpreneur at 19",
    "Invited speaker, Green Accelerator, WEF Annual Meeting 2024, Davos",
  ],
};

export const ACADEMIC = {
  stats: [
    { value: "14", label: "Signed academic MOUs" },
    { value: "30+", label: "Ecosystem partners" },
    { value: "100,000+", label: "Students in the network" },
    { value: "10+", label: "Boards of Studies with Dr. Madhan as member" },
  ],
  partners: [
    "VIT University · Vellore",
    "VIT University · AP",
    "VIT University · Pune",
    "SRM University · Kattankulathur",
    "SRM University · Vadapalani",
    "RV University · Bangalore",
    "Dayananda Sagar College of Engineering",
    "DSATM · Bangalore",
    "Kristu Jayanti University",
    "Panimalar Engineering College",
    "Kumaraguru College of Technology",
    "SNS College of Engineering",
    "Sree Saraswathi Thyagaraja College",
  ],
  professorships: ["VIT University, Vellore", "SRM University, Chennai", "ACE Engineering College, Hyderabad"],
};

export const FAQS = [
  {
    q: "Can your products run on-premise or in a private cloud?",
    a: "Yes. Wise Maestro™, iStruct™ and Wise Ultima™ can be deployed on-premise or in your private cloud, so sensitive data stays under your own governance.",
  },
  {
    q: "Do you support Arabic?",
    a: "Yes. iStruct™ reads Arabic, English and mixed-language documents, including handwriting, and Wise Maestro™ offers Arabic and English semantic search.",
  },
  {
    q: "Which industries do you work with?",
    a: "Banking, healthcare, logistics, education, manufacturing, retail and oil & gas, from enterprise IT teams to education and health tech companies.",
  },
  {
    q: "Where do you operate?",
    a: "We work with clients across India, Saudi Arabia and the USA, and have signed 20+ MOUs across the USA, Europe, UK, Middle East and India.",
  },
  {
    q: "How does a typical engagement start?",
    a: "Usually with a short discovery call and a proof of concept on your own data, like the 20 POCs run for clients in Saudi Arabia through MCIT's AdopTech program.",
  },
  {
    q: "Does Wise Ultima™ work with ServiceNow?",
    a: "Yes. Wise Actions integrates deeply with ServiceNow for automated ITIM ticketing and auto-healing.",
  },
  {
    q: "What is Patent Gym™?",
    a: "Our patent tech consulting practice: we harvest hidden patents from your existing solutions, seed new ones and protect other IP such as copyrights and trademarks.",
  },
  {
    q: "Do you build custom AI solutions?",
    a: "Yes. Beyond our platforms we deliver Gen AI and agentic AI, ML, document AI, cloud and full-stack engineering as end-to-end services.",
  },
];

export const NAV_LINKS = [
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/services" },
  { label: "Patent Gym™", href: "/patent-gym" },
  { label: "Impact", href: "/#impact" },
  { label: "About", href: "/about" },
];
