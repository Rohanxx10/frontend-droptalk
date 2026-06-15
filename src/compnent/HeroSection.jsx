import "../css/component/HeroSection.css";
import copyImg from "../assets/copy.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Shield, Zap, Cloud } from "lucide-react";

function HeroSection() {
  const nav = useNavigate();

  const badges = [
  { icon: Lock,  label: "Secure",  className: "badge-secure"  },
  { icon: Zap,   label: "Instant", className: "badge-instant" },
  { icon: Cloud, label: "Cloud",   className: "badge-cloud"   },
];
  const targetRef = useRef(null);

  return (
    <section id="hero-section">
      
      <div className="hero-left">
        <div className="hero-badges">
          <span>
            <Shield size={14}  /> Secure
          </span>
          <span>
            <Zap size={14} /> Instant
          </span>
          <span>
            <Cloud size={14} /> Cloud
          </span>
        </div>

        <h1>
          Secure & Instant <br />
          File and Message Transfer
        </h1>

        <p className="hero-desc">
          DropTalk lets you send files and messages securely in real-time. Fast
          uploads, encrypted sharing, and seamless communication — all in one
          place.
        </p>

        <div className="hero-actions">
          <a className="hero-primary" href="#chatBox">
            Get Started
          </a>

          <div className="hero-stats">
            <div>
              <h3>10K+</h3>
              <p>Files Sent</p>
            </div>
            <div>
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
            <div>
              <h3>256-bit</h3>
              <p>Encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="hero-right">
        <img src={copyImg} alt="File Sharing Illustration" />
      </div>
    </section>
  );
}

export default HeroSection;
