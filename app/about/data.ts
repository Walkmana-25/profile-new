import type { Profile } from "./types";

export const profileData: Profile = {
  name: "Yuta Takahashi",
  avatar: "/public/avatar.jpg",
  affiliations: [
    {
      organization: "東洋大学",
      department: "情報連携学部 情報連携学科",
      period: "2028年3月卒業予定",
      highlighted: true,
    },
    {
      organization: "未踏IT人材育成発掘事業",
      role: "2025年度 クリエータ",
      highlighted: true,
    },
  ],
  bio: "",
  skills: [
    {
      category: "プログラミング言語",
      skills: [
        {
          name: "Rust",
          technologies: [
            "Web API",
            "gRPC",
            "Sea ORM",
            "Deno",
            "JavaScript Runtime",
          ],
        },
        {
          name: "TypeScript",
          technologies: ["React", "Web"],
        },
      ],
    },
    {
      category: "インフラ・サーバー",
      skills: [
        {
          name: "サーバー構築（物理）",
          technologies: [
            "仮想基盤",
            "Kubernetes",
            "クラウド自作",
            "ネットワーク機器",
          ],
        },
        {
          name: "Docker",
          technologies: ["DevContainer", "Docker Compose"],
        },
      ],
    },
    {
      category: "データベース",
      skills: [
        {
          name: "RDBMS",
          technologies: ["PostgreSQL", "MySQL", "MariaDB"],
        },
        {
          name: "NoSQL",
          technologies: ["Redis", "MongoDB"],
        },
      ],
    },
    {
      category: "クラウド",
      skills: [
        {
          name: "Oracle Cloud",
          technologies: ["Kubernetes", "Compute Instance", "Reverse Proxy"],
        },
        {
          name: "Azure",
          technologies: ["Entra ID", "OAuth", "SSO"],
        },
        {
          name: "Google Cloud Platform",
          technologies: ["GCE", "OAuth", "SSO", "Game Server"],
        },
      ],
    },
    {
      category: "開発ツール",
      skills: [
        {
          name: "CI/CD",
          technologies: ["GitHub Actions", "K8s", "Terraform", "Ansible"],
        },
        {
          name: "ソースコード管理",
          technologies: ["Git", "GitHub"],
        },
      ],
    },
  ],
  interests: [
    "自宅サーバー構築",
    "Web開発",
    "System Design",
    "Kubernetes",
    "オープンソース",
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github",
    },
    {
      platform: "X (Twitter)",
      url: "https://x.com/yourusername",
      icon: "twitter",
    },
    {
      platform: "Zenn",
      url: "https://zenn.dev/yourusername",
      icon: "zenn",
    },
    {
      platform: "SpeakerDeck",
      url: "https://speakerdeck.com/yourusername",
      icon: "speakerdeck",
    },
  ],
};
