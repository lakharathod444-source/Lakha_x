
import React, { useState, useEffect } from 'react';
import { Sparkles, Upload, RotateCcw, Download, ImageIcon, Activity, Layers, Cpu } from 'lucide-react';
import UploadZone from './components/UploadZone';
import ProcessingStage from './components/ProcessingStage';
import ImageComparisonSlider from './components/ImageComparisonSlider';

enum AppState {
  IDLE,
  PROCESSING,
  RESULT
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      startProcessing(result);
    };
    reader.readAsDataURL(file);
  };

  const startProcessing = (imgData: string) => {
    setAppState(AppState.PROCESSING);
    
    // Simulate AI processing duration
    setTimeout(() => {
      setEnhancedImage(imgData); // In demo mode, we use the same image but apply CSS filters in the result view
      setAppState(AppState.RESULT);
    }, 4500);
  };

  const resetApp = () => {
    setAppState(AppState.IDLE);
    setOriginalImage(null);
    setEnhancedImage(null);
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'lakha-x-enhanced.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-purple-500/20">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Lakha-X-<span className="gradient-text">Pixel</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
          <button className="px-5 py-2 glass rounded-full text-white hover:bg-white/10 transition-all border-white/20">
            Login
          </button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-8 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Restore Memories with <br />
            <span className="gradient-text">Generative Intelligence</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Upscale, repair, and enhance your old photographs using state-of-the-art AI. 
            Experience professional-grade restoration in seconds.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {appState === AppState.IDLE && (
            <UploadZone onUpload={handleImageUpload} />
          )}

          {appState === AppState.PROCESSING && (
            <ProcessingStage />
          )}

          {appState === AppState.RESULT && originalImage && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="glass rounded-3xl p-4 md:p-6 overflow-hidden shadow-2xl border-white/10">
                <ImageComparisonSlider before={originalImage} after={enhancedImage || originalImage} />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button 
                  onClick={downloadImage}
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
                >
                  <Download size={20} />
                  Download Enhanced Image
                </button>
                <button 
                  onClick={resetApp}
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all border-white/20 transform hover:scale-105 active:scale-95"
                >
                  <RotateCcw size={20} />
                  Enhance Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Preview */}
        {appState === AppState.IDLE && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ImageIcon className="text-blue-400" />}
              title="4K Upscaling"
              description="Transform low-resolution snapshots into crisp, high-definition masterpieces."
            />
            <FeatureCard 
              icon={<Activity className="text-purple-400" />}
              title="Noise Reduction"
              description="Eliminate grain and digital artifacts while preserving essential details."
            />
            <FeatureCard 
              icon={<Layers className="text-pink-400" />}
              title="Face Enhancement"
              description="Deep-learning models specialized in restoring facial clarity and realism."
            />
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Lakha-X-Pixel. Powered by Gemini AI Intelligence.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="glass p-8 rounded-3xl border-white/5 hover:border-white/10 transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default App;
