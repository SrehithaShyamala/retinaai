import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  History,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const features = [
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get your diabetic retinopathy screening result in seconds — no waiting rooms, no appointments needed.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: MapPin,
    title: "Color Heatmap",
    description:
      "See exactly which areas of your eye are affected with an AI-generated color heatmap overlay on your image.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: History,
    title: "Your Health History",
    description:
      "Track your eye health over time. Every scan is saved so you can see progress and share results with your doctor.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
];

const steps = [
  {
    num: "1",
    title: "Log in securely",
    desc: "Use Internet Identity — your private, passwordless login. No email required.",
  },
  {
    num: "2",
    title: "Upload your photo",
    desc: "Take or upload a fundus photo of your eye from your camera or device.",
  },
  {
    num: "3",
    title: "Get your result",
    desc: "Our AI classifies your retinal health instantly with a clear, plain-language explanation.",
  },
];

export default function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center gap-3 sticky top-0 z-20">
        <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
          <Eye className="w-5 h-5 text-primary" />
        </div>
        <span className="font-display text-lg font-bold tracking-tight">
          RetinaAI
        </span>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline">Secure &amp; Private</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-card border-b border-border">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/retina-hero.dim_1200x700.jpg')",
            opacity: 0.15,
          }}
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/70 to-card"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Eye className="w-4 h-4" />
              AI-Powered Eye Screening
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6 text-foreground">
              Check Your <span className="text-primary">Eye Health</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Upload your fundus photo and get an instant AI-powered diabetic
              retinopathy screening result — in plain language.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                data-ocid="login.primary_button"
                size="lg"
                className="text-lg px-10 py-6 h-auto font-semibold gap-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-smooth w-full sm:w-auto"
                onClick={login}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                    Connecting…
                  </>
                ) : (
                  <>
                    Start Your Free Screening
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.div>

            <p className="mt-4 text-sm text-muted-foreground">
              Secure login with{" "}
              <span className="text-foreground font-medium">
                Internet Identity
              </span>{" "}
              — no password needed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Everything you need to know about your eye health
          </h2>
          <p className="text-muted-foreground text-lg">
            No medical jargon. Just clear, actionable information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.5 }}
              data-ocid={`login.feature.${i + 1}`}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-smooth"
            >
              <div
                className={`w-11 h-11 rounded-lg ${feature.bg} border flex items-center justify-center`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-muted/30 border-t border-border py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              How it works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to your screening result
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {steps.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                data-ocid={`login.step.${i + 1}`}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-2xl font-bold shadow-lg shadow-primary/30">
                  {item.num}
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex justify-center mt-14"
          >
            <Button
              data-ocid="login.cta_secondary_button"
              size="lg"
              className="text-base px-10 py-5 h-auto font-semibold gap-2 transition-smooth"
              onClick={login}
              disabled={isLoading}
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dataset & AI section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8"
        >
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              AI Training Data
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Trained on 40,000+ labelled retinal images
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our DR classifier was trained on multiple benchmark datasets,
              including the{" "}
              <span className="text-foreground font-medium">APTOS 2019</span>{" "}
              Kaggle competition (3,660 labelled images) and its supplementary
              external datasets — giving the model broad exposure to real-world
              variation in image quality, equipment, and patient demographics.
            </p>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3 self-start md:self-center">
            {[
              { name: "APTOS 2019", desc: "3,660 images · Kaggle" },
              { name: "EyePACS", desc: "88,000+ images · Kaggle" },
              { name: "IDRiD", desc: "516 images · IEEE" },
              { name: "Messidor-2", desc: "1,748 images · ADCIS" },
            ].map((ds) => (
              <div
                key={ds.name}
                className="bg-background border border-border rounded-xl px-4 py-3 space-y-0.5"
              >
                <p className="text-sm font-semibold text-foreground">
                  {ds.name}
                </p>
                <p className="text-xs text-muted-foreground">{ds.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Disclaimer + Footer */}
      <footer className="bg-card border-t border-border py-8 px-6 text-center space-y-3">
        <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          RetinaAI provides screening support only and does not replace
          professional medical advice. Always consult your eye doctor or
          diabetes specialist with your results.
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
