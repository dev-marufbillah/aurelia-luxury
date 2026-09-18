import { ArrowLeft } from 'lucide-react';

interface InfoPageProps {
  title: string;
  label: string;
  paragraphs: string[];
  onBack: () => void;
}

export default function InfoPage({ title, label, paragraphs, onBack }: InfoPageProps) {
  return (
    <div className="min-h-screen bg-white text-aurelia-black animate-fade-in">
      <div className="bg-aurelia-black py-4 text-center">
        <button onClick={onBack} className="text-aurelia-ivory font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] hover:text-aurelia-gold transition-colors inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Homepage
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-20 py-18 lg:py-24">
        <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] text-aurelia-gold block mb-4">
          {label}
        </span>
        <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight mb-8 uppercase">
          {title}
        </h1>
        <div className="space-y-6 border-t border-b border-gray-100 py-10">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="font-montserrat text-sm md:text-base text-aurelia-black/65 leading-8 font-light tracking-wide">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
