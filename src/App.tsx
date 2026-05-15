/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Dumbbell, Calendar, BookOpen, ChevronRight, Share2, X } from 'lucide-react';
import { cn } from './lib/utils';
import { motion } from 'motion/react';

const posts = [
// ... (omitted for brevity, but I will include the full updated file)
// Actually, using multi-line edit is better

  {
    id: 1,
    title: 'Mastering the Deadlift',
    summary: 'Essential tips for proper form and avoiding injury in your heavy lifts.',
    content: 'The deadlift is one of the most effective compound exercises for building overall strength. However, it requires precise form to avoid injury. Focus on hip hinge, keeping a neutral spine, and engaging your core. Start with lighter weights to perfect your technique before going heavy. Remember, it is a pull, not a push.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be5b7cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'High-Protein Meal Prep',
    summary: 'Quick and healthy meal prep ideas to keep your nutrition on track.',
    content: 'Meal prepping is a game-changer for consistency. Focus on high-protein sources like chicken, tofu, lentils, and Greek yogurt. Combine with complex carbohydrates (quinoa, brown rice) and plenty of fibrous vegetables. Prepare these in batches on Sunday to save time throughout the week.',
    image: 'https://images.unsplash.com/photo-1547962569-01206144e590?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Cardio for Fat Loss',
    summary: 'The best cardio methods to burn fat while preserving muscle mass.',
    content: 'Cardio is indispensable for cardiovascular health and can assist in fat loss. The key is to avoid overdoing it, which can interfere with muscle recovery. Incorporate a mix of moderate-intensity steady-state (MISS) and high-intensity interval training (HIIT). Always prioritize protein intake to maintain muscle mass while in a calorie deficit.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Functional Mobility',
    summary: 'Increase your range of motion to improve lifting performance.',
    content: 'Mobility work is often overlooked but essential for longevity in training. Focus on joint health, stretching tight muscles like hip flexors and thoracic spine. Improved mobility allows for better lifting mechanics and reduced risk of compensation injuries.',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Rest & Recovery',
    summary: 'Why sleep is the most important part of your workout routine.',
    content: 'Muscle growth occurs during rest, not in the gym. Aim for 7-9 hours of quality sleep per night. Consider active recovery days with light walking or stretching to facilitate blood flow to sore muscles.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<'feed' | 'apply' | 'postDetail'>('feed');
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const viewPost = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setActiveSection('postDetail');
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate some failures occasionally
          if (Math.random() < 0.3) {
            reject(new Error('Failed to submit application. Please try again.'));
          } else {
            resolve(true);
          }
        }, 1500);
      });
      setStatusMessage({ text: 'Application submitted successfully!', type: 'success' });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatusMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedPost?.title || 'FitPulse Gym',
          text: selectedPost?.summary || 'Check out this workout tip from FitPulse',
          url: window.location.href,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] font-sans text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0F0F0F]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-[#E2FF00] size-8" />
            <span className="text-2xl font-black tracking-tighter">FITPULSE</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveSection('feed')} className={cn("px-4 py-2 font-bold uppercase text-sm tracking-widest", activeSection === 'feed' ? "text-[#E2FF00]" : "text-gray-500 hover:text-white transition")}>
              Workout Tips
            </button>
            <button onClick={() => setActiveSection('apply')} className="bg-[#E2FF00] text-black px-6 py-2 rounded-full font-black uppercase text-sm hover:bg-white transition">
              Apply Now
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeSection === 'feed' ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1A1A1A] p-6 border border-white/5 shadow-sm hover:border-[#E2FF00]/50 transition"
              >
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-6 bg-[#333]" referrerPolicy="no-referrer" loading="lazy" />
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{post.summary}</p>
                <button onClick={() => viewPost(post)} className="flex items-center px-4 py-2 bg-[#1A1A1A] rounded-full border border-white/10 text-[#E2FF00] font-black uppercase text-xs tracking-widest hover:bg-[#E2FF00] hover:text-black transition">
                  Read More <ChevronRight className="size-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        ) : activeSection === 'postDetail' && selectedPost ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto bg-[#1A1A1A] p-10 border border-white/5"
          >
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setActiveSection('feed')} className="text-gray-500 hover:text-[#E2FF00] px-4 py-2 rounded-full border border-gray-700 font-bold text-sm uppercase tracking-widest">
                &larr; Back to Feed
              </button>
              <button onClick={handleShare} className="flex items-center text-[#E2FF00] hover:text-white px-4 py-2 rounded-full border border-[#E2FF00] font-bold text-sm uppercase tracking-widest">
                <Share2 className="size-4 mr-2" /> Share
              </button>
            </div>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-96 object-cover mb-8" />
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">{selectedPost.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{selectedPost.content}</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto bg-[#1A1A1A] p-10 border border-white/5 relative"
          >
            <button onClick={() => setActiveSection('feed')} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="size-6" />
            </button>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Apply Now</h2>
            <p className="text-gray-400 mb-8 font-bold">Fill the form below, and our experts will contact you soon.</p>
            <form onSubmit={handleApply} className="space-y-6">
              <input type="text" placeholder="Your Name" required className="w-full bg-[#333] p-4 text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#E2FF00]" />
              <input type="email" placeholder="Your Email" required className="w-full bg-[#333] p-4 text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#E2FF00]" />
              <textarea placeholder="Your Goals & Fitness Level" required className="w-full bg-[#333] p-4 text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#E2FF00] h-32"></textarea>
              {statusMessage && (
                <div className={cn("p-4 rounded-full text-center font-bold", statusMessage.type === 'success' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                  {statusMessage.text}
                </div>
              )}
              <button disabled={isSubmitting} className="w-full bg-[#E2FF00] text-black py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}
