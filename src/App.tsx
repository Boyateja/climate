import React, { useState } from 'react';
import { Home, BookOpen, Library, Github, Twitter, Mail } from 'lucide-react';
import ClimateAIDashboard from './components/ClimateAIDashboard';
import ThemeToggle from './components/ThemeToggle';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary">ClimateAI Predictor</h1>
              <div className="flex space-x-2">
                <NavItem
                  icon={Home}
                  label="Dashboard"
                  active={activeSection === 'dashboard'}
                  onClick={() => setActiveSection('dashboard')}
                />
                <NavItem
                  icon={BookOpen}
                  label="About"
                  active={activeSection === 'about'}
                  onClick={() => setActiveSection('about')}
                />
                <NavItem
                  icon={Library}
                  label="Resources"
                  active={activeSection === 'resources'}
                  onClick={() => setActiveSection('resources')}
                />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'dashboard' && <ClimateAIDashboard />}
        {activeSection === 'about' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">About ClimateAI Predictor</h2>
            <p className="text-muted-foreground">
              ClimateAI Predictor leverages advanced artificial intelligence to provide accurate climate change predictions
              and insights. Our platform combines historical data, satellite imagery, and machine learning models to help
              understand and prepare for climate-related challenges.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                alt="Nature landscape"
                className="rounded-lg object-cover w-full h-64"
              />
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                alt="Climate impact"
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
          </div>
        )}
        {activeSection === 'resources' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Climate Resources</h2>
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">Research Papers</h3>
                <p className="text-muted-foreground">Access the latest climate research and AI prediction methodologies.</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">Data Sources</h3>
                <p className="text-muted-foreground">Explore our comprehensive collection of climate data sources.</p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-muted-foreground">Learn how to integrate our climate predictions into your applications.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground mb-4 md:mb-0">
              © 2025 ClimateAI Predictor. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="mailto:contact@climateai.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/climateai" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/climateai" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;