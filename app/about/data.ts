import type { Profile } from "./types";

export const profileData: Profile = {
  name: "Your Name",
  avatar: "/public/avatar.jpg",
  affiliations: [
    {
      organization: "Your University",
      department: "Department Name",
      role: "Student / Researcher",
      highlighted: true,
    },
    {
      organization: "Your Organization",
      role: "Your Role",
      period: "2024 - Present",
    },
  ],
  bio: "Write a brief bio about yourself. This could include your background, interests, goals, or anything you'd like visitors to know about you. For example, you might mention your passion for technology, your academic journey, or your career aspirations.",
  skills: [
    {
      category: "Programming Languages",
      skills: ["TypeScript", "Python", "Go", "Rust"],
    },
    {
      category: "Frameworks",
      skills: ["React", "Next.js", "Chakra UI", "Express"],
    },
    {
      category: "Tools & Infrastructure",
      skills: ["Git", "Docker", "AWS", "Vim", "Linux"],
    },
  ],
  interests: [
    "Open Source",
    "Web Development",
    "System Design",
    "Machine Learning",
    "Photography",
    "Reading",
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
