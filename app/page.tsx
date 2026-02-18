"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const LOGOS = {
  BY: "/logos/BY.png",
  UBS: "/logos/UBS.png",
  LGYR: "/logos/LGYR.png",
  UHG: "/logos/UHG.jpeg",
  C: "/logos/C.jpeg",
  A: "/logos/A.jpeg",
  UNT: "/logos/UNT.png",
} as const;

/* ----------------------------- NAV ----------------------------- */

const NAV = [
  { id: "about", label: "About", icon: IconUser },
  { id: "experience", label: "Experience", icon: IconBriefcase },
  { id: "projects", label: "Projects", icon: IconCode2 },
  { id: "education", label: "Education", icon: IconGraduation },
  { id: "skills", label: "Skills", icon: IconCode },
  { id: "contact", label: "Contact", icon: IconMail },
];

/* ----------------------------- SKILLS DATA ----------------------------- */

const SKILLS: Record<string, string[]> = {
  "Programming & Backend": [
    "Python",
    "Go",
    "Java",
    "Scala",
    "FastAPI",
    "Flask",
    "Django",
    "Spring Boot",
    "REST APIs",
    "gRPC",
    "GraphQL",
    "WebSockets",
    "SQL",
    "NoSQL",
    "SQLAlchemy",
  ],
  "Frontend & UI": [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "jQuery",
    "AJAX",
    "React.js",
    "Node.js",
    "Tailwind",
    "Streamlit",
    "Dialogflow",
    "Haystack",
    "Human-loop",
    "Conversational UI",
    "Prompt Driven Interfaces",
  ],
  "Generative AI & LLMs": [
    "Azure OpenAI",
    "Amazon Bedrock",
    "OpenAI APIs",
    "Hugging Face Transformers",
    "PyTorch",
    "LangChain",
    "LangGraph",
    "LlamaIndex",
    "CrewAI Agentic AI",
    "A2A Workflows",
    "LoRA",
    "QLoRA",
    "Prompt Engineering",
  ],
  "RAG & Vector Databases": [
    "Azure Cognitive Search",
    "Amazon OpenSearch",
    "FAISS",
    "Pinecone",
    "Weaviate",
    "Neo4j",
  ],
  "Machine Learning & Deep Learning": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "XGBoost",
    "CNNs",
    "RNNs",
    "LSTMs",
    "GANs",
    "Transformers",
    "ARIMA",
    "Prophet",
  ],
  "NLP & Computer Vision": ["spaCy", "NLTK", "BERT", "GPT", "OpenCV", "YOLO", "ImageNet"],
  "MLOps & Model Lifecycle": [
    "SageMaker Pipelines",
    "Kubeflow",
    "MLflow",
    "LakeFS",
    "GitLFS",
    "pachyderm",
    "NeptuneAI",
    "ClearML",
    "Comet ML",
  ],
  "Cloud Platforms": [
    "Azure (Azure OpenAI, Azure Functions, AKS, ACR, Azure Data Factory, Azure Databricks, Azure Blob Storage, Azure API Management, Azure Key Vault, Entra ID)",
    "AWS (SageMaker, Bedrock, Lambda, EC2, ECS, EKS, ECR, S3, OpenSearch, Glue, Athena, EMR, Textract, CloudWatch, CloudTrail, IAM, KMS)",
    "GCP (Vertex AI, GKE, BigQuery, Cloud Storage, Dataflow)",
  ],
  "Data Engineering & Streaming": ["Apache Spark", "PySpark", "Kafka", "AWS Kinesis"],
  "Containers, DevOps & IaC": [
    "Docker",
    "Kubernetes",
    "Helm",
    "Terraform",
    "Ansible",
    "Git",
    "GitHub Actions",
    "Jenkins",
    "AWS CodeBuild",
  ],
  "Monitoring & Observability": [
    "Prometheus",
    "Grafana",
    "Azure Monitor",
    "Application Insights",
    "ELK stack",
    "openTelemetry",
    "datadog",
    "Dynatrace",
  ],
  Security: [
    "OAuth2",
    "OpenID Connect",
    "AWS IAM",
    "Azure Entra ID",
    "API Gateway Security",
    "Azure Key Vault",
    "AWS KMS",
    "Encryption",
    "Private Endpoints",
    "Zero Trust",
  ],
  "Visualization & BI": ["Matplotlib", "Seaborn", "Tableau", "Power BI", "Looker", "QlikView"],
  "IDEs & Developer Productivity": [
    "VS Code",
    "Cursor AI",
    "IntelliJ IDEA",
    "PyCharm",
    "Jupyter Notebook",
    "JupyterLab",
    "GitHub Copilot",
    "Postman",
    "Swagger/OpenAPI",
    "Docker Desktop",
    "Bash",
    "PowerShell",
  ],
  "Agile & Collaboration": ["Jira", "Confluence", "Agile", "Scrum"],
};

/* ----------------------------- PROJECTS DATA ----------------------------- */

const PROJECTS = [
  {
    title: "IMDB Conversational Voice Agent",
    emoji: "🎬",
    github: "https://github.com/nivith1029/conversational-voice-agent",
    tags: ["LangGraph", "OpenAI GPT-4o", "ChromaDB", "SQLite", "Streamlit", "Whisper", "TTS", "Python"],
    description:
      "A production-grade GenAI-powered conversational agent for exploring IMDB's Top 1000 movies. The system features intelligent query routing that automatically classifies queries as structured (SQL), semantic (vector search), or hybrid, then executes the best strategy and synthesizes a grounded response.",
    highlights: [
      "Intelligent query router classifying natural language queries into SQL, semantic, or hybrid paths",
      "Semantic search over movie plots using ChromaDB + OpenAI embeddings — finds thematic matches, not just keywords",
      "Voice interface with OpenAI Whisper (STT) and TTS-1 (text-to-speech) for a fully conversational experience",
      "LangGraph agent workflow handling routing, execution, response synthesis, and smart movie recommendations",
      "Handles complex multi-filter aggregations, date ranges, director stats, and ambiguous clarification flows",
    ],
    stack: {
      LLM: "OpenAI GPT-4o",
      Embeddings: "text-embedding-3-small",
      "Agent Framework": "LangGraph",
      "Vector Store": "ChromaDB",
      Database: "SQLite",
      UI: "Streamlit",
      Voice: "Whisper + TTS-1",
    },
  },
  {
    title: "RAG PDF Assistant",
    emoji: "📚",
    github: "https://github.com/nivith1029/chatbot",
    tags: ["FastAPI", "FAISS", "Ollama", "PyPDF", "Python", "GitHub Actions", "Pytest", "Ruff"],
    description:
      "A local Retrieval-Augmented Generation (RAG) system that lets users upload PDF documents and ask natural-language questions using a locally running LLM via Ollama — no paid APIs required. Built with a production-style FastAPI backend, FAISS vector store, and a clean CI pipeline.",
    highlights: [
      "Fully local inference stack — Ollama + qwen2.5:1.5b + nomic-embed-text, zero cloud API costs",
      "PDF ingestion pipeline that chunks, embeds, and indexes documents with FAISS for semantic retrieval",
      "Filename-based document filtering so users can scope queries to a specific uploaded file",
      "Answers returned with source citations including filename and page number for auditability",
      "GitHub Actions CI with Ruff linting and Pytest test suite for production-grade quality gates",
    ],
    stack: {
      Backend: "FastAPI",
      "Vector Store": "FAISS",
      LLM: "Ollama (qwen2.5:1.5b)",
      Embeddings: "nomic-embed-text",
      Parsing: "PyPDF",
      Testing: "Pytest + Ruff",
      CI: "GitHub Actions",
    },
  },
];

type ThemeMode = "dark" | "light";

export default function Home() {
  const [activeId, setActiveId] = useState<string>("about");

  /* --------- Dark/Light Toggle (keeps preference) --------- */
  const [mode, setMode] = useState<ThemeMode>("dark");
  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && (window.localStorage.getItem("theme-mode") as ThemeMode | null)) || null;
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    setMode(saved ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  /* --------- Glowing Cursor Effect --------- */
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, show: true });
    const onLeave = () => setCursor((c) => ({ ...c, show: false }));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // reveal-on-scroll animation
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("reveal-in");
        }
      },
      { threshold: 0.12 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // active section highlight
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0.08, 0.15, 0.25] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isDark = mode === "dark";

  return (
    <main
      className={[
        "min-h-screen",
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900",
      ].join(" ")}
    >
      {/* cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-[60]"
        aria-hidden="true"
        style={{
          opacity: cursor.show ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      >
        <div
          className={[
            "absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            isDark ? "bg-cyan-400/15" : "bg-cyan-500/12",
          ].join(" ")}
          style={{ left: cursor.x, top: cursor.y }}
        />
        <div
          className={[
            "absolute h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl",
            isDark ? "bg-emerald-400/12" : "bg-emerald-500/10",
          ].join(" ")}
          style={{ left: cursor.x + 24, top: cursor.y + 18 }}
        />
      </div>

      <BgGlow mode={mode} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* TOP BAR */}
        <div className="sticky top-3 z-50">
          <div
            className={[
              "mx-auto mb-6 flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur",
              isDark ? "border-zinc-800/70 bg-zinc-950/60" : "border-zinc-200 bg-white/70",
            ].join(" ")}
          >
            <TerminalTyping
              isDark={isDark}
              text={`>_ cd ~/nivith-avula`}
            />

            <div className="ml-auto flex flex-wrap items-center gap-2">
              {NAV.map((n) => {
                const isActive = n.id === activeId;
                const Ico = n.icon;
                return (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={onNavClick(n.id)}
                    className={[
                      "group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                      "border border-transparent",
                      isDark
                        ? "hover:border-zinc-700/70 hover:bg-zinc-900/40"
                        : "hover:border-zinc-200 hover:bg-zinc-100/70",
                      isActive ? (isDark ? "border-zinc-700/70 bg-zinc-900/40" : "border-zinc-200 bg-zinc-100/70") : "",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={[
                        "grid h-7 w-7 place-items-center rounded-lg transition",
                        isActive
                          ? "bg-gradient-to-br from-emerald-400/25 via-cyan-400/20 to-fuchsia-400/20"
                          : isDark
                          ? "bg-zinc-900/60 group-hover:bg-zinc-900/80"
                          : "bg-zinc-100 group-hover:bg-zinc-200",
                      ].join(" ")}
                    >
                      <Ico className={isActive ? "text-cyan-500" : isDark ? "text-zinc-300" : "text-zinc-700"} />
                    </span>
                    <span className={isActive ? (isDark ? "text-white" : "text-zinc-900") : isDark ? "text-zinc-300 group-hover:text-white" : "text-zinc-700 group-hover:text-zinc-900"}>
                      {n.label}
                    </span>
                  </a>
                );
              })}

              {/* Theme toggle (right side) */}
              <button
                type="button"
                onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
                className={[
                  "ml-1 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
                  isDark
                    ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/50"
                    : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
                ].join(" ")}
                aria-label="Toggle dark/light"
                title="Toggle theme"
              >
                {isDark ? <IconSun className="text-amber-300" /> : <IconMoon className="text-indigo-500" />}
                <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* TERMINAL WINDOW */}
        <div
          className={[
            "rounded-3xl border shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.35)]",
            isDark ? "border-zinc-800 bg-zinc-900/40" : "border-zinc-200 bg-white/70",
          ].join(" ")}
        >
          <div className={["flex items-center gap-2 border-b px-5 py-4", isDark ? "border-zinc-800" : "border-zinc-200"].join(" ")}>
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className={["ml-3 text-xs", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
              terminal@nivith:~
            </span>

            <div className={["ml-auto text-xs", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-10">
            {/* HERO */}
            <TerminalCmd cmd="whoami" isDark={isDark} />
            <div className="mt-4 grid gap-6 md:grid-cols-[180px_1fr] md:items-start" data-reveal>
              <div className="mx-auto md:mx-0">
                {/* Tilt photo */}
                <TiltCard isDark={isDark}>
                  <div
                    className={[
                      "relative h-40 w-40 overflow-hidden rounded-2xl border shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
                      isDark ? "border-zinc-800 bg-zinc-950/50" : "border-zinc-200 bg-white/60",
                    ].join(" ")}
                  >
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                    <div className="absolute -inset-1 animate-gradient bg-[conic-gradient(from_0deg,rgba(16,185,129,0.35),rgba(34,211,238,0.35),rgba(217,70,239,0.30),rgba(16,185,129,0.35))] blur-md opacity-50" />
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src="/profile.png"
                        alt="Nivith Avula"
                        fill
                        className="object-cover rounded-xl object-[center_20%]"
                        priority
                      />
                    </div>
                  </div>
                </TiltCard>

                <div className="mt-3 flex items-center justify-center gap-2 md:justify-start">
                  <span
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                      isDark ? "border-zinc-800 bg-zinc-950/40 text-zinc-300" : "border-zinc-200 bg-white/70 text-zinc-700",
                    ].join(" ")}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    Available for interviews
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xl font-semibold tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                    Nivith Avula
                  </span>{" "}
                  <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>|</span>{" "}
                  <span className={isDark ? "text-zinc-100" : "text-zinc-900"}>Generative AI Engineer</span>
                </div>

                <p className={["mt-3 max-w-3xl leading-7", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                  I'm a Generative AI Engineer with 5+ years of experience building and shipping production systems. Most of my work sits at the intersection
                  of LLM apps and backend engineering: search and retrieval over real business data, agent workflows for multi-step requests, and APIs that stay
                  stable under real usage. I've worked across supply chain, banking, healthcare, energy, and manufacturing, and I'm comfortable taking a feature
                  from data prep to deployment.
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <ActionLink href="/resume.pdf" label="View Resume" isDark={isDark} />
                  <ActionLink href="mailto:Nivith1029@gmail.com" label="Email" isDark={isDark} />
                  <ActionLink href="https://www.linkedin.com/in/nivith-avula-0b44a0140" label="LinkedIn" newTab isDark={isDark} />
                  <ActionLink href="https://github.com/nivith1029" label="GitHub" newTab isDark={isDark} />
                </div>
              </div>
            </div>

            <Divider isDark={isDark} />

            {/* ABOUT */}
            <Section id="about" title="About" cmd="cat ./about.md" isDark={isDark}>
              <div className="space-y-4" data-reveal>
                <p className={["leading-7", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                  I build GenAI features that people can rely on day-to-day. That usually means turning messy documents and operational data into something
                  searchable, then wiring it into a clean workflow that returns accurate, grounded answers. When the use case needs more than one step, I add
                  agent-style orchestration to handle routing, checks, and follow-ups.
                </p>
                <p className={["leading-7", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                  I care a lot about the "boring but important" parts: retrieval quality, stable prompts, output validation, access control, and good
                  logging/monitoring. I also keep deployments simple with CI/CD and containerized releases, so shipping changes doesn't turn into a fire drill.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <InfoCard title="What I build" isDark={isDark}>
                    RAG over docs • Agent workflows • Document intelligence • Model/API serving • Cloud-native platforms
                  </InfoCard>
                  <InfoCard title="How I work" isDark={isDark}>
                    Security-first • clean APIs • CI/CD + IaC • monitoring • iterate with evaluation + UAT
                  </InfoCard>
                </div>
              </div>
            </Section>

            {/* EXPERIENCE */}
            <Section id="experience" title="Experience" cmd="ls -la ./experience | sort -r" isDark={isDark}>
              <div className="space-y-5" data-reveal>
                <Role
                  isDark={isDark}
                  logoSrc={LOGOS.BY}
                  company="Blue Yonder"
                  title="Generative AI Engineer"
                  meta="Coppell, TX | Jul 2025 – Present"
                  tags={["Azure OpenAI", "LangChain", "LangGraph", "RAG", "Azure Cognitive Search", "AKS", "FastAPI", "Go"]}
                  summary="Built and deployed GenAI solutions for supply-chain planning and forecasting using Azure OpenAI, LangChain, LangGraph, and FastAPI. Implemented RAG over SOPs, planning documents, and operational data using Azure Cognitive Search and embedding models, and used agent workflows for multi-step scenarios that needed routing and validation. Developed backend services in Python and Go, built ingestion pipelines with Azure Data Factory and Databricks, and improved quality through prompt tuning, response checks, and regression testing. Owned production readiness with security controls, CI/CD, and monitoring using AKS, Docker, GitHub Actions, Prometheus, and Grafana."
                />

                <Role
                  isDark={isDark}
                  logoSrc={LOGOS.UBS}
                  company="UBS"
                  title="AI Engineer"
                  meta="New York, NY | Jul 2024 – Jun 2025"
                  tags={["Amazon Bedrock", "SageMaker", "OpenSearch", "FAISS", "Textract", "Neo4j", "FastAPI", "Terraform", "Docker"]}
                  summary="Worked on production AI and GenAI systems in a regulated banking environment. Built retrieval-based solutions over policies and historical case data using OpenSearch and embedding models, and designed agent workflows for compliance reasoning and validation. Developed document intelligence pipelines with Textract, built scalable inference services using FastAPI and Docker, and supported deployments on AWS using SageMaker, EKS, and Terraform. Focused heavily on governance, auditability, monitoring, and reliability to meet regulatory requirements."
                />

                <Role
                  isDark={isDark}
                  logoSrc={LOGOS.LGYR}
                  company="Landis+Gyr"
                  title="Fullstack AI Engineer"
                  meta="Atlanta, GA | Jan 2024 – May 2024"
                  tags={["Amazon Bedrock", "LangChain", "CrewAI", "OpenSearch", "FAISS", "SageMaker", "IoT Core", "Kinesis", "Glue", "EMR/Spark", "FastAPI"]}
                  summary="Delivered AI and GenAI features for smart-energy analytics, combining LLM-based insights with predictive modeling and large-scale IoT data pipelines. Built agent workflows using LangChain and CrewAI, implemented retrieval-based search over grid and maintenance data using OpenSearch and FAISS, and developed LLM-enabled applications using Amazon Bedrock and Hugging Face models. Built forecasting and anomaly detection models with SageMaker and TensorFlow, and supported high-volume ingestion using IoT Core, Kinesis, Glue, and Spark on EMR. Deployed services through cloud-native patterns with FastAPI, containerization, and automated delivery."
                />

                <Role
                  isDark={isDark}
                  logoSrc={LOGOS.UHG}
                  company="UHG"
                  title="Python Full Stack Engineer"
                  meta="Dallas, TX | Sep 2023 – Dec 2023"
                  tags={["Python", "Flask", "Django", "GKE", "Vertex AI", "Kubeflow", "MLflow", "BigQuery", "Dataflow"]}
                  summary="Built healthcare applications and backend services using Python with Flask and Django, focused on reliable APIs for clinical workflows and analytics. Developed and deployed ML and deep learning models for NLP, computer vision, and time-series use cases, and set up reproducible training and deployment using Kubeflow on GKE. Used Vertex AI for experimentation and deployment, and built data pipelines with BigQuery and Dataflow to support reporting and segmentation. Focused on clean service design, stable integrations, and production support in an Agile environment."
                />

                <Role
                  isDark={isDark}
                  logoSrc={LOGOS.C}
                  company="Celanese"
                  title="Python Developer"
                  meta="Irving, TX | May 2023 – Aug 2023"
                  tags={["Python", "Flask", "Django", "FastAPI", "Azure Functions", "AKS", "API Management", "Kafka", "Terraform", "Ansible"]}
                  summary="Built backend and platform services supporting enterprise manufacturing workflows. Developed Python microservices using Flask, Django, and FastAPI, and deployed them using Azure Functions and AKS. Implemented API gateways with authentication, routing, and rate limiting, and built event-driven pipelines using Kafka and Azure messaging services. Worked extensively on CI/CD, infrastructure automation with Terraform and Ansible, and improving performance and reliability of production systems."
                />

                <Role
                  isDark={isDark}
                  logoSrc={LOGOS.A}
                  company="Algocode"
                  title="Python Developer"
                  meta="Pune, India | Aug 2020 – Jul 2022"
                  tags={["Python", "Django", "HTML/CSS/JS", "jQuery", "Jenkins", "Linux", "AWS", "Spark"]}
                  summary="Worked on full-stack and backend systems for data-driven enterprise applications. Built Django-based web applications, internal tools, and admin workflows, and supported data processing using Python and Spark. Contributed to CI pipelines using Jenkins and Git, handled Linux-based deployments, and worked with AWS services for application hosting and data workflows. Gained strong experience in building maintainable systems and working in Agile delivery environments."
                />
              </div>
            </Section>

            {/* PROJECTS */}
            <Section id="projects" title="Projects" cmd="ls -la ./projects" isDark={isDark}>
              <div className="space-y-5" data-reveal>
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.title} project={project} isDark={isDark} />
                ))}
              </div>
            </Section>

            {/* EDUCATION */}
            <Section id="education" title="Education" cmd="cat ./education" isDark={isDark}>
              <div className="space-y-4" data-reveal>
                <div className={["rounded-2xl border p-5", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
                  <div className="flex items-start gap-3">
                    <div className={["relative mt-0.5 h-11 w-11 overflow-hidden rounded-xl border", isDark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white/60"].join(" ")}>
                      <Image src={LOGOS.UNT} alt="University of North Texas logo" fill className="object-contain p-1" />
                    </div>

                    <div className="min-w-0">
                      <div className={["text-sm", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>University of North Texas</div>
                      <div className="mt-1 text-lg font-semibold">Master's — Information Systems & Technology</div>
                      <div className={["mt-1 text-sm", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>Aug 2022 – May 2024</div>
                    </div>
                  </div>

                  <div className={["mt-4 border-t pt-4", isDark ? "border-zinc-800" : "border-zinc-200"].join(" ")}>
                    <div className={["text-sm font-semibold", isDark ? "text-zinc-200" : "text-zinc-800"].join(" ")}>Certifications</div>
                    <div className={["mt-2 text-sm", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                      AWS Certified Solutions Architect • HashiCorp Terraform Associate • Microsoft Azure Fundamentals (AZ-900)
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* SKILLS */}
            <Section id="skills" title="Skills" cmd="cat ./skills.txt" isDark={isDark}>
              <SkillsPanel isDark={isDark} />
            </Section>

            {/* CONTACT */}
            <Section id="contact" title="Get In Touch" cmd='echo "hello"' isDark={isDark}>
              <ContactPanel isDark={isDark} />
            </Section>

            <div className={["mt-10 text-xs", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>exit session</div>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          filter: blur(2px);
          transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
        }
        .reveal-in {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        .animate-gradient {
          animation: gradientSpin 6s linear infinite;
        }
        @keyframes gradientSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* typing cursor */
        .caret {
          display: inline-block;
          width: 10px;
          margin-left: 2px;
          transform: translateY(1px);
          opacity: 0.8;
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </main>
  );
}

/* ----------------------------- Terminal Typing ----------------------------- */
function TerminalTyping({ text, isDark }: { text: string; isDark: boolean }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const t = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(t);
    }, 22);
    return () => window.clearInterval(t);
  }, [text]);

  return (
    <span className={["text-sm", isDark ? "text-emerald-300/90" : "text-emerald-700"].join(" ")}>
      <span className={isDark ? "text-emerald-300/90" : "text-emerald-700"}>{out}</span>
      <span className={["caret", isDark ? "text-cyan-300" : "text-cyan-700"].join(" ")}>|</span>
    </span>
  );
}

/* ----------------------------- Tilt Wrapper ----------------------------- */
function TiltCard({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rotY = (px - 0.5) * 12;
    const rotX = -(py - 0.5) * 12;

    setStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`,
    });
  };

  const onLeave = () => {
    setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        "inline-block rounded-2xl transition-transform duration-200",
        isDark ? "shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "shadow-[0_0_0_1px_rgba(0,0,0,0.06)]",
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

/* ----------------------------- Project Card ----------------------------- */

function ProjectCard({
  project,
  isDark,
}: {
  project: (typeof PROJECTS)[number];
  isDark: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border p-5 transition-all duration-300",
        isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70",
      ].join(" ")}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(16,185,129,0.18),transparent_55%)]" />
      </div>

      <div className="relative">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="project icon">
              {project.emoji}
            </span>
            <div>
              <div className="text-lg font-semibold">{project.title}</div>
              <div className={["text-xs mt-0.5", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>Personal Project</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition",
                isDark
                  ? "border-zinc-700 bg-zinc-900/50 text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900/70"
                  : "border-zinc-200 bg-zinc-100/70 text-zinc-800 hover:bg-zinc-200/70",
              ].join(" ")}
            >
              <IconGitHub className={isDark ? "text-zinc-300" : "text-zinc-700"} />
              View on GitHub
            </a>

            <span
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                isDark ? "border-zinc-800 bg-zinc-950/50 text-zinc-400" : "border-zinc-200 bg-white/70 text-zinc-600",
              ].join(" ")}
            >
              <span className="h-2 w-2 rounded-full bg-fuchsia-400/80" />
              Open Source
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className={[
                "rounded-full border px-3 py-1 text-xs transition",
                isDark
                  ? "border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/80"
                  : "border-zinc-200 bg-zinc-100/70 text-zinc-800 hover:bg-zinc-200/70",
              ].join(" ")}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className={["mt-4 text-sm leading-7", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
          {project.description}
        </p>

        {/* Expand/collapse highlights */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={[
            "mt-3 inline-flex items-center gap-2 text-xs transition",
            isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-800",
          ].join(" ")}
        >
          <span>{expanded ? "▲ Hide details" : "▼ Show details"}</span>
        </button>

        {expanded && (
          <div className="mt-4 space-y-4">
            {/* Highlights */}
            <div className={["rounded-2xl border p-4", isDark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white/70"].join(" ")}>
              <div className={["mb-3 text-xs font-semibold uppercase tracking-wide", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
                Key highlights
              </div>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className={["flex items-start gap-2 text-sm", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div className={["rounded-2xl border p-4", isDark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white/70"].join(" ")}>
              <div className={["mb-3 text-xs font-semibold uppercase tracking-wide", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
                Tech stack
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(project.stack).map(([k, v]) => (
                  <div key={k} className="flex items-start gap-2">
                    <span className={["shrink-0 text-xs font-medium", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>
                      {k}:
                    </span>
                    <span className={["text-xs", isDark ? "text-zinc-200" : "text-zinc-800"].join(" ")}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- Skills Panel ----------------------------- */

function SkillsPanel({ isDark }: { isDark: boolean }) {
  const categories = useMemo(() => Object.keys(SKILLS), []);
  const [activeCat, setActiveCat] = useState<string>(categories[0] ?? "Programming & Backend");
  const [query, setQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = showAll ? categories : [activeCat];

    const result: { category: string; items: string[] }[] = [];
    for (const c of base) {
      const items = SKILLS[c] ?? [];
      const keep = q ? items.filter((x) => x.toLowerCase().includes(q)) : items;
      if (keep.length) result.push({ category: c, items: keep });
    }
    return result;
  }, [activeCat, categories, query, showAll]);

  const allCount = useMemo(() => {
    let n = 0;
    for (const k of categories) n += (SKILLS[k] ?? []).length;
    return n;
  }, [categories]);

  return (
    <div className="space-y-4" data-reveal>
      <div className={["rounded-2xl border p-4", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className={["text-sm", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
            <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>Total:</span>{" "}
            <span className="font-semibold">{allCount}</span>{" "}
            <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>tools</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <span className={["pointer-events-none absolute left-3 top-1/2 -translate-y-1/2", isDark ? "text-zinc-500" : "text-zinc-500"].join(" ")}>
                <IconSearch />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills..."
                className={[
                  "w-full rounded-xl border px-9 py-2 text-sm outline-none transition sm:w-[260px]",
                  isDark
                    ? "border-zinc-800 bg-zinc-950/50 text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-700"
                    : "border-zinc-200 bg-white/70 text-zinc-800 placeholder:text-zinc-500 focus:border-zinc-300",
                ].join(" ")}
              />
            </div>

            <button
              onClick={() => setShowAll((v) => !v)}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
                showAll
                  ? isDark
                    ? "border-zinc-700 bg-zinc-900/50 text-white"
                    : "border-zinc-200 bg-zinc-100/70 text-zinc-900"
                  : isDark
                  ? "border-zinc-800 bg-zinc-950/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40"
                  : "border-zinc-200 bg-white/70 text-zinc-700 hover:bg-zinc-100/70",
              ].join(" ")}
              type="button"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-80" />
              {showAll ? "Showing all categories" : "Show all categories"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === activeCat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setActiveCat(c);
                  setShowAll(false);
                }}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  active
                    ? isDark
                      ? "border-zinc-700 bg-zinc-900/60 text-white"
                      : "border-zinc-200 bg-zinc-100/70 text-zinc-900"
                    : isDark
                    ? "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40"
                    : "border-zinc-200 bg-white/70 text-zinc-700 hover:bg-zinc-100/70",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.length ? (
          filtered.map((block) => (
            <SkillCard
              key={block.category}
              title={block.category}
              accent={accentFor(block.category)}
              items={block.items}
              isDark={isDark}
            />
          ))
        ) : (
          <div className={["rounded-2xl border p-5 text-sm md:col-span-2", isDark ? "border-zinc-800 bg-zinc-950/30 text-zinc-300" : "border-zinc-200 bg-white/70 text-zinc-700"].join(" ")}>
            No matches. Try a different keyword.
          </div>
        )}
      </div>
    </div>
  );
}

function accentFor(category: string) {
  const map: Record<string, string> = {
    "Programming & Backend": "from-fuchsia-400/25 via-pink-400/20 to-cyan-400/20",
    "Frontend & UI": "from-cyan-400/25 via-sky-400/20 to-emerald-400/20",
    "Generative AI & LLMs": "from-emerald-400/25 via-cyan-400/20 to-fuchsia-400/20",
    "RAG & Vector Databases": "from-sky-400/25 via-indigo-400/15 to-fuchsia-400/20",
    "Machine Learning & Deep Learning": "from-amber-400/20 via-emerald-400/20 to-cyan-400/20",
    "NLP & Computer Vision": "from-emerald-400/20 via-lime-400/15 to-cyan-400/20",
    "MLOps & Model Lifecycle": "from-cyan-400/25 via-sky-400/20 to-emerald-400/20",
    "Cloud Platforms": "from-amber-400/20 via-emerald-400/20 to-cyan-400/20",
    "Data Engineering & Streaming": "from-cyan-400/25 via-sky-400/20 to-emerald-400/20",
    "Containers, DevOps & IaC": "from-emerald-400/25 via-cyan-400/20 to-fuchsia-400/20",
    "Monitoring & Observability": "from-sky-400/25 via-indigo-400/15 to-fuchsia-400/20",
    Security: "from-emerald-400/20 via-lime-400/15 to-cyan-400/20",
    "Visualization & BI": "from-fuchsia-400/25 via-pink-400/20 to-cyan-400/20",
    "IDEs & Developer Productivity": "from-cyan-400/25 via-sky-400/20 to-emerald-400/20",
    "Agile & Collaboration": "from-emerald-400/20 via-lime-400/15 to-cyan-400/20",
  };
  return map[category] ?? "from-emerald-400/25 via-cyan-400/20 to-fuchsia-400/20";
}

/* ----------------------------- Contact Panel ----------------------------- */

function ContactPanel({ isDark }: { isDark: boolean }) {
  const EMAIL_TO = "Nivith1029@gmail.com";
  const PHONE_DISPLAY = "+1 (469) 605-3132";
  const PHONE_DIAL = "+14696053132";
  const LINKEDIN = "https://www.linkedin.com/in/nivith-avula-0b44a0140";
  const GITHUB = "https://github.com/nivith1029";
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgoyybzl";

  const [reveal, setReveal] = useState(false);
  const [toast, setToast] = useState<string>("");

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromPhone, setFromPhone] = useState("");
  const [reason, setReason] = useState("Interview");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const maskedEmail = useMemo(() => maskEmail(EMAIL_TO), [EMAIL_TO]);
  const maskedPhone = useMemo(() => maskPhone(PHONE_DISPLAY), [PHONE_DISPLAY]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied");
      window.setTimeout(() => setToast(""), 1200);
    } catch {
      setToast("Copy failed");
      window.setTimeout(() => setToast(""), 1200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !fromEmail.trim() || !message.trim()) {
      setStatus("err");
      setToast("Please fill: name, your email, message");
      window.setTimeout(() => setToast(""), 1600);
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus("err");
      setToast("Contact form not configured (missing endpoint)");
      window.setTimeout(() => setToast(""), 1800);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const payload = {
        name,
        email: fromEmail,
        phone: fromPhone,
        reason,
        message,
        to: EMAIL_TO,
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("ok");
      setToast("Sent successfully");
      window.setTimeout(() => setToast(""), 1600);

      setName("");
      setFromEmail("");
      setFromPhone("");
      setReason("Interview");
      setMessage("");
    } catch {
      setStatus("err");
      setToast("Failed to send. Try again.");
      window.setTimeout(() => setToast(""), 1600);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4" data-reveal>
      <div className={["rounded-2xl border p-5", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className={["text-sm", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>Fast ways to reach me</div>
            <div className="mt-1 text-lg font-semibold">Let's talk</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${EMAIL_TO}`}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                isDark
                  ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/60"
                  : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
              ].join(" ")}
              aria-label="Email"
              title="Email"
            >
              <IconMail className={isDark ? "text-cyan-300" : "text-cyan-600"} /> Email
            </a>

            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                isDark
                  ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/60"
                  : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
              ].join(" ")}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <IconLink className={isDark ? "text-emerald-300" : "text-emerald-600"} /> LinkedIn
            </a>

            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                isDark
                  ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/60"
                  : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
              ].join(" ")}
              aria-label="GitHub"
              title="GitHub"
            >
              <IconGitHub className={isDark ? "text-fuchsia-300" : "text-fuchsia-600"} /> GitHub
            </a>

            <a
              href={`tel:${PHONE_DIAL}`}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                isDark
                  ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/60"
                  : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
              ].join(" ")}
              aria-label="Call"
              title="Call"
            >
              <IconPhone className={isDark ? "text-amber-300" : "text-amber-600"} /> Call
            </a>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <HiddenField
            isDark={isDark}
            label="Email"
            value={EMAIL_TO}
            masked={maskedEmail}
            reveal={reveal}
            onReveal={() => setReveal(true)}
            onCopy={() => copy(EMAIL_TO)}
          />
          <HiddenField
            isDark={isDark}
            label="Phone"
            value={PHONE_DISPLAY}
            masked={maskedPhone}
            reveal={reveal}
            onReveal={() => setReveal(true)}
            onCopy={() => copy(PHONE_DISPLAY)}
          />
        </div>

        {toast ? (
          <div className={["mt-3 text-xs", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
            <span className={["inline-flex items-center gap-2 rounded-full border px-3 py-1", isDark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white/70"].join(" ")}>
              <span
                className={[
                  "h-2 w-2 rounded-full",
                  status === "ok" ? "bg-emerald-400/80" : status === "err" ? "bg-red-400/80" : "bg-cyan-400/80",
                ].join(" ")}
              />
              {toast}
            </span>
          </div>
        ) : null}
      </div>

      <div className={["relative overflow-hidden rounded-2xl border p-5", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
        <div className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(16,185,129,0.18),transparent_55%)]" />
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className={["text-sm", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>Send a quick note</div>
                <div className="mt-1 text-lg font-semibold">Reach out from here</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={[
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                  isSubmitting
                    ? isDark
                      ? "border-zinc-800 bg-zinc-950/40 text-zinc-400 cursor-not-allowed"
                      : "border-zinc-200 bg-white/70 text-zinc-500 cursor-not-allowed"
                    : isDark
                    ? "border-zinc-700 bg-zinc-900/50 text-white hover:border-zinc-600 hover:bg-zinc-900/70"
                    : "border-zinc-200 bg-zinc-100/70 text-zinc-900 hover:bg-zinc-200/70",
                ].join(" ")}
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-90" />
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <LabeledInput isDark={isDark} label="Your name *" value={name} onChange={setName} placeholder="John / Recruiter / Hiring Manager" />
              <LabeledInput isDark={isDark} label="Your email *" value={fromEmail} onChange={setFromEmail} placeholder="name@company.com" />
              <LabeledInput isDark={isDark} label="Your phone" value={fromPhone} onChange={setFromPhone} placeholder="+1 555 555 5555" />
              <LabeledSelect
                isDark={isDark}
                label="Reason"
                value={reason}
                onChange={setReason}
                options={["Interview", "Contract role", "Full-time role", "Collaboration", "Other"]}
              />
            </div>

            <div className="mt-3">
              <div className={["text-xs uppercase tracking-wide", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>Message *</div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a few details about the role or why you're reaching out..."
                className={[
                  "mt-2 min-h-[120px] w-full rounded-2xl border px-4 py-3 text-sm outline-none transition",
                  isDark
                    ? "border-zinc-800 bg-zinc-950/50 text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-700"
                    : "border-zinc-200 bg-white/70 text-zinc-800 placeholder:text-zinc-500 focus:border-zinc-300",
                ].join(" ")}
              />
            </div>

            <div className={["mt-3 text-xs", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>
              This form submits in-page (no redirect). Click on Submit once and you're done.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function HiddenField({
  label,
  value,
  masked,
  reveal,
  onReveal,
  onCopy,
  isDark,
}: {
  label: string;
  value: string;
  masked: string;
  reveal: boolean;
  onReveal: () => void;
  onCopy: () => void;
  isDark: boolean;
}) {
  return (
    <div className={["rounded-2xl border p-4", isDark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white/70"].join(" ")}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className={["text-xs uppercase tracking-wide", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>{label}</div>
          <div className={["mt-1 text-sm", isDark ? "text-zinc-200" : "text-zinc-800"].join(" ")}>{reveal ? value : masked}</div>
        </div>
        <div className="flex items-center gap-2">
          {!reveal ? (
            <button
              type="button"
              onClick={onReveal}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
                isDark
                  ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/50"
                  : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
              ].join(" ")}
            >
              <IconEye className={isDark ? "text-zinc-300" : "text-zinc-700"} />
              Reveal
            </button>
          ) : null}
          <button
            type="button"
            onClick={onCopy}
            className={[
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
              isDark
                ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/50"
                : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
            ].join(" ")}
          >
            <IconCopy className={isDark ? "text-zinc-300" : "text-zinc-700"} />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!domain) return "Hidden";
  const keep = user.slice(0, Math.min(3, user.length));
  return `${keep}${"*".repeat(Math.max(3, user.length - keep.length))}@${domain}`;
}

function maskPhone(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 6) return "Hidden";
  const tail = digits.slice(-4);
  return phone.replace(tail, "****");
}

/* ----------------------------- UI bits ----------------------------- */

function TerminalCmd({ cmd, isDark }: { cmd: string; isDark: boolean }) {
  return (
    <div className={isDark ? "text-zinc-400" : "text-zinc-600"}>
      <span className={isDark ? "text-zinc-500" : "text-zinc-500"}>$</span> {cmd}
    </div>
  );
}

function Divider({ isDark }: { isDark: boolean }) {
  return <div className={["my-10 border-t", isDark ? "border-zinc-800/80" : "border-zinc-200"].join(" ")} />;
}

function Section({
  id,
  title,
  cmd,
  children,
  isDark,
}: {
  id: string;
  title: string;
  cmd: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <TerminalCmd cmd={cmd} isDark={isDark} />
      <div className="mt-3 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <span className={["hidden text-xs sm:inline", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>
          <span className="text-emerald-400/90">●</span> updated recently
        </span>
      </div>
      <div className="mt-4">{children}</div>
      <Divider isDark={isDark} />
    </section>
  );
}

/* ----------------------------- Role ----------------------------- */

function Role({
  logoSrc,
  company,
  title,
  meta,
  tags,
  summary,
  isDark,
}: {
  logoSrc?: string;
  company: string;
  title: string;
  meta: string;
  tags: string[];
  summary: string;
  isDark: boolean;
}) {
  return (
    <div className={["relative overflow-hidden rounded-2xl border p-5", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
      <div className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_55%),radial-gradient(circle_at_60%_90%,rgba(16,185,129,0.18),transparent_55%)]" />
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {logoSrc ? (
              <div className={["relative mt-0.5 h-11 w-11 overflow-hidden rounded-xl border", isDark ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-white/60"].join(" ")}>
                <Image src={logoSrc} alt={`${company} logo`} fill className="object-contain p-1" />
              </div>
            ) : null}

            <div>
              <div className="text-lg font-semibold">{company}</div>
              <div className={["text-sm", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>{title}</div>
              <div className={["text-xs", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>{meta}</div>
            </div>
          </div>

          <div className={["text-xs", isDark ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
            <span className={["inline-flex items-center gap-2 rounded-full border px-3 py-1", isDark ? "border-zinc-800 bg-zinc-950/50" : "border-zinc-200 bg-white/70"].join(" ")}>
              <span className="h-2 w-2 rounded-full bg-cyan-400/80" />
              Production work
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className={[
                "rounded-full border px-3 py-1 text-xs transition",
                isDark
                  ? "border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/80"
                  : "border-zinc-200 bg-zinc-100/70 text-zinc-800 hover:bg-zinc-200/70",
              ].join(" ")}
            >
              {t}
            </span>
          ))}
        </div>

        <p className={["mt-4 text-sm leading-7", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>{summary}</p>
      </div>
    </div>
  );
}

function SkillCard({
  title,
  items,
  accent,
  isDark,
}: {
  title: string;
  items: string[];
  accent: string;
  isDark: boolean;
}) {
  return (
    <div className={["relative overflow-hidden rounded-2xl border p-5", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
      <div className={`pointer-events-none absolute -inset-1 opacity-60 blur-2xl bg-gradient-to-br ${accent}`} />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">{title}</div>
          <span className={["text-xs", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>{items.length} items</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((it) => (
            <span
              key={it}
              className={[
                "rounded-lg border px-2.5 py-1 text-xs transition",
                isDark
                  ? "border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/80"
                  : "border-zinc-200 bg-zinc-100/70 text-zinc-800 hover:bg-zinc-200/70",
              ].join(" ")}
              title={it}
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <div className={["relative overflow-hidden rounded-2xl border p-5", isDark ? "border-zinc-800 bg-zinc-950/30" : "border-zinc-200 bg-white/70"].join(" ")}>
      <div className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.16),transparent_60%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_60%)]" />
      </div>
      <div className="relative">
        <div className={["text-sm font-semibold", isDark ? "text-zinc-100" : "text-zinc-900"].join(" ")}>{title}</div>
        <div className={["mt-2 text-sm leading-7", isDark ? "text-zinc-300" : "text-zinc-700"].join(" ")}>{children}</div>
      </div>
    </div>
  );
}

function ActionLink({
  href,
  label,
  newTab,
  isDark,
}: {
  href: string;
  label: string;
  newTab?: boolean;
  isDark: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className={[
        "group inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
        isDark
          ? "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/60"
          : "border-zinc-200 bg-white/70 text-zinc-800 hover:bg-zinc-100/70",
      ].join(" ")}
    >
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-80 group-hover:opacity-100" />
      {label}
    </a>
  );
}

function BgGlow({ mode }: { mode: ThemeMode }) {
  const isDark = mode === "dark";
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className={["absolute inset-0", isDark ? "bg-zinc-950" : "bg-zinc-50"].join(" ")} />
      <div className={["absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl animate-pulse", isDark ? "bg-emerald-500/10" : "bg-emerald-500/07"].join(" ")} />
      <div className={["absolute top-24 -left-40 h-[520px] w-[520px] rounded-full blur-3xl animate-pulse", isDark ? "bg-cyan-500/10" : "bg-cyan-500/07"].join(" ")} />
      <div className={["absolute bottom-0 -right-40 h-[520px] w-[520px] rounded-full blur-3xl animate-pulse", isDark ? "bg-fuchsia-500/10" : "bg-fuchsia-500/06"].join(" ")} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.05),transparent_40%)]" />
    </div>
  );
}

/* ----------------------------- Small Inputs ----------------------------- */

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  isDark,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  isDark: boolean;
}) {
  return (
    <div>
      <div className={["text-xs uppercase tracking-wide", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition",
          isDark
            ? "border-zinc-800 bg-zinc-950/50 text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-700"
            : "border-zinc-200 bg-white/70 text-zinc-800 placeholder:text-zinc-500 focus:border-zinc-300",
        ].join(" ")}
      />
    </div>
  );
}

function LabeledSelect({
  label,
  value,
  onChange,
  options,
  isDark,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  isDark: boolean;
}) {
  return (
    <div>
      <div className={["text-xs uppercase tracking-wide", isDark ? "text-zinc-500" : "text-zinc-600"].join(" ")}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition",
          isDark ? "border-zinc-800 bg-zinc-950/50 text-zinc-200 focus:border-zinc-700" : "border-zinc-200 bg-white/70 text-zinc-800 focus:border-zinc-300",
        ].join(" ")}
      >
        {options.map((o) => (
          <option key={o} value={o} className={isDark ? "bg-zinc-950" : "bg-white"}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ----------------------------- Icons ----------------------------- */

function IconSun({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.93 4.93l1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.66 17.66l1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.93 19.07l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconMoon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconUser({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 13a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconBriefcase({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M9 6a3 3 0 0 1 6 0v1H9V6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9Z" stroke="currentColor" strokeWidth="2" />
      <path d="M3 13h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconGraduation({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 10v6c0 2 3 4 6 4s6-2 6-4v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCode({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M8 9 5 12l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7 10 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCode2({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M7 8l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCopy({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M9 9h10v12H9V9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M7 3h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2-9.4 0-17-7.6-17-17 0-1 1-2 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconLink({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconEye({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconGitHub({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}
