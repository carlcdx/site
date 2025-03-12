import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Server, Database, Network, Shield, Laptop, Cpu } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technicalDetails: string;
  image: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "mail-server",
    title: "Serveur Mail Auto-Hébergé",
    shortDescription: "Infrastructure mail complète et sécurisée",
    fullDescription: "Service de messagerie auto-hébergé accessible via mail.carlc.fr. Cette solution garantit une confidentialité totale des échanges et une indépendance vis-à-vis des services tiers.",
    technicalDetails: "Implémenté avec Postfix et Dovecot, configuration DKIM/SPF/DMARC, protection anti-spam avec SpamAssassin, et interface webmail RainLoop.",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1000",
    icon: <Server className="w-6 h-6" />
  },
  {
    id: "media-stack",
    title: "Stack Médias",
    shortDescription: "Système complet de gestion de médias",
    fullDescription: "Ensemble de services interconnectés pour la gestion et le streaming de médias. Accessible via films.carlc.fr, cette infrastructure permet une expérience de visionnage optimale.",
    technicalDetails: "Architecture basée sur Jellyfin pour le streaming, intégration avec Radarr, Sonarr et Jellyserr pour l'indexation et la gestion automatisée du contenu.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
    icon: <Database className="w-6 h-6" />
  },
  {
    id: "teleport",
    title: "Bastion Teleport",
    shortDescription: "Accès sécurisé à l'infrastructure",
    fullDescription: "Point d'accès unifié et sécurisé pour l'ensemble de l'infrastructure via teleport.carlc.fr. Cette solution permet une gestion centralisée des accès et une traçabilité complète.",
    technicalDetails: "Basé sur Teleport, avec authentification multi-facteurs, audit logging, et accès SSH/HTTPS sécurisé.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000",
    icon: <Shield className="w-6 h-6" />
  }
];

const NetworkAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {i % 2 === 0 ? <Server className="w-8 h-8 text-gray-200" /> : <Cpu className="w-8 h-8 text-gray-200" />}
        </motion.div>
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gray-200"
          style={{
            width: '100px',
            opacity: 0.2
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

const ScrambledText = ({ text }: { text: string }) => {
  const [scrambled, setScrambled] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const interval = setInterval(() => {
      setScrambled(prev => 
        prev.split('').map((char, i) => {
          if (i < 1) return char; // Garde le 'C' intact
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return <span>{scrambled}</span>;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-white text-gray-800 overflow-hidden relative">
      <NetworkAnimation />
      
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center bg-white z-50"
          >
            <h1 className="text-4xl font-light">Bienvenue sur carlc.fr</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 left-6 z-40"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <motion.div
        initial={false}
        animate={{ width: isMenuOpen ? "50%" : "0%" }}
        className="fixed left-0 top-0 h-screen bg-gray-50 z-30 overflow-hidden shadow-lg"
      >
        <div className="pt-24 px-8">
          <motion.div
            className="mb-8 cursor-pointer"
            onClick={() => {
              setShowProjects(false);
              setSelectedProject(null);
              setIsMenuOpen(false);
            }}
          >
            <div className="flex items-center space-x-4">
              <Laptop className="w-6 h-6" />
              <span className="text-xl font-light">Accueil</span>
            </div>
          </motion.div>
          <motion.div
            className="mb-8 cursor-pointer"
            onClick={() => {
              setShowProjects(true);
              setSelectedProject(null);
              setIsMenuOpen(false);
            }}
          >
            <div className="flex items-center space-x-4">
              <Network className="w-6 h-6" />
              <span className="text-xl font-light">Projets</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <main className="h-full w-full flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="mb-8 text-gray-600 hover:text-gray-800"
              >
                ← Retour aux projets
              </button>
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  {selectedProject.icon}
                  <h2 className="text-3xl font-light">{selectedProject.title}</h2>
                </div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-xl text-gray-600 mb-4">{selectedProject.fullDescription}</p>
                <div className="bg-gray-50 rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-semibold mb-4">Détails Techniques</h3>
                  <p className="text-gray-700">{selectedProject.technicalDetails}</p>
                </div>
              </div>
            </motion.div>
          ) : showProjects ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {project.icon}
                    <h3 className="text-xl font-light">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center relative z-10"
            >
              <h1 className="text-5xl font-light mb-4">
                Carl C<ScrambledText text="OEURDOUX" />
              </h1>
              <p className="text-xl text-gray-600">
                Apprenti Manager en Système D'information et Cybersécurité
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;