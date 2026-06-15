import "../css/component/Features.css";
import { Lock, UserX, Timer, FolderLock, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Privacy Protection",
    tag: "Zero exposure",
    tagIcon: "shield",
    desc: (
      <>
        Your personal information stays private. Unlike traditional messaging
        apps, your phone number is never exposed while sharing files or messages.
      </>
    ),
  },
  {
    icon: UserX,
    title: "Anonymous Sharing",
    tag: "Identity hidden",
    desc: "Send messages and files anonymously without revealing your identity, protecting you from spam, harassment, or unwanted contact.",
  },
  {
    icon: Timer,
    title: "Auto Data Deletion",
    tag: "Self-destructs in 10 min",
    desc: (
      <>
        All shared messages and files are automatically deleted within{" "}
        <strong>10 minutes</strong>, ensuring zero digital footprint.
      </>
    ),
  },
  {
    icon: FolderLock,
    title: "Secure File Sharing",
    tag: "Encrypted transfer",
    desc: "Share documents, images, and files of any type securely with encrypted transfer and controlled access.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable Transfer",
    tag: "Optimised infrastructure",
    desc: "Optimized infrastructure ensures quick uploads and instant delivery without compromising security.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    tag: "No install needed",
    desc: "Seamlessly share across devices and platforms without installing additional apps or plugins.",
  },
];

function Features() {
  return (
    <section id="features">
      <h2 className="features-title">
        Secure &amp; <span>Privacy-First</span> Features
      </h2>
      <div className="features-line" />

      <div className="features-grid">
        {features.map(({ icon: Icon, title, tag, desc }) => (
          <div className="feature-card" key={title}>
            <div className="feature-icon">
              <Icon size={22} strokeWidth={1.6} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            {tag && (
              <div className="feature-tag">
                <Zap size={11} strokeWidth={2} />
                {tag}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;