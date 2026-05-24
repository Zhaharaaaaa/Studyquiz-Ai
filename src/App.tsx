/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  Brain, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  User, 
  Trophy, 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  HelpCircle, 
  Check, 
  Volume2, 
  VolumeX, 
  FileText, 
  TrendingUp, 
  LogOut, 
  GraduationCap, 
  Heart, 
  ListTodo,
  Upload,
  File,
  Trash2
} from 'lucide-react';
import { STATIC_QUESTIONS } from './data/staticQuestions';
import { summarizeText } from './utils/summarizer';
import { QuizQuestion, SummaryResult, UserProfile } from './types';
import { sound } from './utils/audio';

// Dynamic Confetti Canvas Component for the Victory page
function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ['#FFC107', '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#8BC34A'];

    // Create particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-10 rounded-3xl" />;
}

// Pre-defined material templates that can be easily loaded for testing
const MATERIAL_EXAMPLES = [
  {
    title: "⚡ Cara Kerja Internet",
    text: "Internet adalah jaringan komputer global yang saling terhubung menggunakan protokol standar TCP/IP. Protokol ini dikembangkan oleh Vinton Cerf dan Bob Kahn sebagai standar komunikasi. Layanan WWW (World Wide Web) diciptakan oleh Tim Berners-Lee di laboratorium CERN untuk mempermudah akses informasi lintas dokumen hypertext. Server DNS (Domain Name System) berfungsi sebagai buku telepon internet yang menerjemahkan nama domain yang mudah dibaca seperti google.com menjadi alamat IP numerik."
  },
  {
    title: "🧠 Dasar Kecerdasan Buatan (AI)",
    text: "Kecerdasan Buatan atau Artificial Intelligence (AI) merupakan teknologi simulasi kecerdasan manusia oleh mesin komputer. Salah satu cabang terpentingnya adalah Machine Learning yaitu sistem yang belajar mandiri dari data historis tanpa diprogram secara eksplisit. Jaringan Saraf Tiruan dibangun meniru neuron biologis otak untuk memproses informasi berlapis. Model Generatif seperti ChatGPT dilatih dengan miliaran parameter tekstual untuk memprediksi kata berikutnya dalam percakapan."
  },
  {
    title: "💻 Paradigma Pemrograman",
    text: "Pemrograman Berorientasi Objek atau OOP adalah paradigma pemrograman berdasarkan konsep objek untuk mengatur struktur kode. Objek menyimpan data dalam atribut dan fungsi dalam metode kelas. Pilar utamanya adalah Enkapsulasi untuk menyembunyikan detail sensitif objek, dan Pewarisan untuk mewariskan fungsi kelas induk ke anak. Polimorfisme merupakan kemampuan satu nama metode untuk berperilaku berbeda sesuai objek turunannya."
  }
];

export const AVATAR_LIST = [
  { id: 'owl-cute', name: 'Guru Quizo 🦉', color: 'bg-indigo-100 border-indigo-400 text-indigo-700' },
  { id: 'fox', name: 'StudyFox 🦊', color: 'bg-blue-100 border-blue-400 text-blue-600' },
  { id: 'panda', name: 'Panda Cerdas 🐼', color: 'bg-gray-100 border-gray-400 text-gray-800' },
  { id: 'cat', name: 'Kucing Jenius 🐱', color: 'bg-orange-100 border-orange-400 text-orange-600' },
  { id: 'koala', name: 'Koala Pelajar 🐨', color: 'bg-slate-100 border-slate-400 text-slate-700' },
  { id: 'rabbit', name: 'Kelinci Cepat 🐰', color: 'bg-pink-100 border-pink-400 text-pink-600' },
];

export function renderAvatarSVG(id: string, className = "w-full h-full") {
  switch (id) {
    case 'fox':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <polygon points="22,35 12,12 38,26" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
          <polygon points="78,35 88,12 62,26" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
          <polygon points="24,32 17,17 34,26" fill="#e6f7ff"/>
          <polygon points="76,32 83,17 66,26" fill="#e6f7ff"/>
          {/* Fox Head Base */}
          <path d="M18,48 C18,28 82,28 82,48 C82,68 50,82 50,82 C50,82 18,68 18,48 Z" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
          {/* White Cheeks */}
          <path d="M22,54 C26,72 50,78 50,78 C50,78 74,72 78,54 C66,62 50,60 50,60 C50,60 34,62 22,54 Z" fill="#ffffff" stroke="#096dd9" strokeWidth="2.5"/>
          {/* Cute nose */}
          <ellipse cx="50" cy="64" rx="6" ry="4" fill="#3c3c3c"/>
          {/* Playful big eyes */}
          <circle cx="36" cy="45" r="11" fill="white" stroke="#096dd9" strokeWidth="3"/>
          <circle cx="64" cy="45" r="11" fill="white" stroke="#096dd9" strokeWidth="3"/>
          <circle cx="36" cy="45" r="4" fill="#3c3c3c"/>
          <circle cx="64" cy="45" r="4" fill="#3c3c3c"/>
        </svg>
      );
    case 'panda':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="16" fill="#262626" stroke="#1f1f1f" strokeWidth="2"/>
          <circle cx="76" cy="24" r="16" fill="#262626" stroke="#1f1f1f" strokeWidth="2"/>
          <circle cx="50" cy="54" r="38" fill="white" stroke="#bfbfbf" strokeWidth="4"/>
          <ellipse cx="35" cy="48" rx="11" ry="14" fill="#262626" transform="rotate(-15 35 48)"/>
          <ellipse cx="65" cy="48" rx="11" ry="14" fill="#262626" transform="rotate(15 65 48)"/>
          <circle cx="35" cy="48" r="4" fill="white"/>
          <circle cx="65" cy="48" r="4" fill="white"/>
          <circle cx="36" cy="47" r="1.5" fill="#3c3c3c"/>
          <circle cx="66" cy="47" r="1.5" fill="#3c3c3c"/>
          <ellipse cx="50" cy="63" rx="6" ry="3.5" fill="#262626"/>
          <ellipse cx="22" cy="62" rx="5" ry="3.5" fill="#ffadd2" opacity="0.75"/>
          <ellipse cx="78" cy="62" rx="5" ry="3.5" fill="#ffadd2" opacity="0.75"/>
        </svg>
      );
    case 'cat':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,30 10,6 36,22" fill="#ff7a45" stroke="#d4380d" strokeWidth="4" strokeLinejoin="round"/>
          <polygon points="80,30 90,6 64,22" fill="#ff7a45" stroke="#d4380d" strokeWidth="4" strokeLinejoin="round"/>
          <polygon points="24,24 16,11 31,19" fill="#ffadd2"/>
          <polygon points="76,24 84,11 69,19" fill="#ffadd2"/>
          <circle cx="50" cy="50" r="36" fill="#ffa940" stroke="#d4380d" strokeWidth="4"/>
          <circle cx="35" cy="44" r="10" fill="white" stroke="#d4380d" strokeWidth="2"/>
          <circle cx="65" cy="44" r="10" fill="white" stroke="#d4380d" strokeWidth="2"/>
          <circle cx="35" cy="44" r="4.5" fill="#1f1f1f"/>
          <circle cx="65" cy="44" r="4.5" fill="#1f1f1f"/>
          <polygon points="50,54 44,59 56,59" fill="#f5222d"/>
          <line x1="24" y1="58" x2="8" y2="56" stroke="#d4380d" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="24" y1="64" x2="6" y2="65" stroke="#d4380d" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="76" y1="58" x2="92" y2="56" stroke="#d4380d" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="76" y1="64" x2="94" y2="65" stroke="#d4380d" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case 'koala':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="38" r="18" fill="#bfbfbf" stroke="#8c8c8c" strokeWidth="4"/>
          <circle cx="78" cy="38" r="18" fill="#bfbfbf" stroke="#8c8c8c" strokeWidth="4"/>
          <circle cx="22" cy="38" r="11" fill="#ffbecb"/>
          <circle cx="78" cy="38" r="11" fill="#ffbecb"/>
          <circle cx="50" cy="54" r="34" fill="#d9d9d9" stroke="#8c8c8c" strokeWidth="4"/>
          <circle cx="36" cy="48" r="5" fill="#262626"/>
          <circle cx="64" cy="48" r="5" fill="#262626"/>
          <circle cx="37" cy="46" r="1.5" fill="white"/>
          <circle cx="65" cy="46" r="1.5" fill="white"/>
          <rect x="44" y="52" width="12" height="18" rx="6" fill="#595959" stroke="#262626" strokeWidth="1.5"/>
          <ellipse cx="24" cy="62" rx="4.5" ry="3" fill="#ffadd2" opacity="0.7"/>
          <ellipse cx="76" cy="62" rx="4.5" ry="3" fill="#ffadd2" opacity="0.7"/>
        </svg>
      );
    case 'rabbit':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="4" width="14" height="38" rx="7" fill="#fff0f6" stroke="#eb2f96" strokeWidth="4" strokeLinejoin="round"/>
          <rect x="61" y="4" width="14" height="38" rx="7" fill="#fff0f6" stroke="#eb2f96" strokeWidth="4" strokeLinejoin="round"/>
          <rect x="29" y="10" width="6" height="24" rx="3" fill="#ffadd2"/>
          <rect x="65" y="10" width="6" height="24" rx="3" fill="#ffadd2"/>
          <circle cx="50" cy="56" r="34" fill="white" stroke="#eb2f96" strokeWidth="4"/>
          <circle cx="37" cy="50" r="5" fill="#eb2f96"/>
          <circle cx="63" cy="50" r="5" fill="#eb2f96"/>
          <circle cx="38" cy="48" r="1.5" fill="white"/>
          <circle cx="63" cy="48" r="1.5" fill="white"/>
          <polygon points="50,59 45,63 55,63" fill="#ff85c0"/>
          <ellipse cx="26" cy="63" rx="5" ry="3.5" fill="#ffadd2" opacity="0.75"/>
          <ellipse cx="74" cy="63" rx="5" ry="3.5" fill="#ffadd2" opacity="0.75"/>
        </svg>
      );
    case 'owl-cute':
    default:
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="38" ry="40" fill="#722ed1" stroke="#531dab" strokeWidth="4"/>
          <circle cx="35" cy="40" r="14" fill="white" stroke="#531dab" strokeWidth="2"/>
          <circle cx="65" cy="40" r="14" fill="white" stroke="#531dab" strokeWidth="2"/>
          <circle cx="35" cy="40" r="6" fill="#3c3c3c"/>
          <circle cx="65" cy="40" r="6" fill="#3c3c3c"/>
          <circle cx="37" cy="38" r="2" fill="white"/>
          <circle cx="67" cy="38" r="2" fill="white"/>
          <polygon points="50,46 44,56 56,56" fill="#ff7a45"/>
          <polygon points="50,10 76,18 50,26 24,18" fill="#3c3c3c" stroke="#1f1f1f" strokeWidth="2"/>
          <path d="M74 18 L78 30 L76 32 L72 18 Z" fill="#ffec3d"/>
        </svg>
      );
  }
}

export default function App() {
  // Navigation View State
  const [view, setView] = useState<'login' | 'dashboard' | 'quiz' | 'score'>('login');

  // Avatar Modal State
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Audio Control
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Control background music depending on view and sound toggle
  useEffect(() => {
    if (view === 'quiz' && soundEnabled) {
      sound.startBGM();
    } else {
      sound.stopBGM();
    }
    return () => {
      sound.stopBGM();
    };
  }, [view, soundEnabled]);

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>({
    username: 'Rizky',
    xp: 220,
    streak: 3,
    completedQuizzes: 4,
    avatarSeed: 'owl-cute'
  });

  // Login inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Summarizer Input & Output
  const [materialText, setMaterialText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState('');
  const [summary, setSummary] = useState<SummaryResult | null>(null);

  // File Upload State definitions
  const [isDragging, setIsDragging] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Run real AI Summary via Express Server endpoint with local helper fallback
  const runSummarizeLogic = async (textToUse: string) => {
    if (!textToUse.trim()) {
      alert("Silakan tempelkan materi atau pilih template contoh di bawah!");
      return;
    }

    setIsSummarizing(true);
    setSummaryStatus("Uraikan konsep... Guru Quizo AI sedang membaca materi Anda 🦉🧠");

    // Dynamic friendly updates
    const updates = [
      { text: "Mengekstrak intisari poin pikiran utama... ⚡", delay: 1000 },
      { text: "Merumuskan model penalaran kognitif... ⭐", delay: 2200 },
      { text: "Menyusun peta pertanyaan kuis interaktif... 🎯", delay: 3500 }
    ];

    const timeouts = updates.map(u => setTimeout(() => setSummaryStatus(u.text), u.delay));

    try {
      const resp = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToUse }),
      });

      timeouts.forEach(clearTimeout);

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Gagal memperoleh respon dari server AI.");
      }

      const result = await resp.json();
      setSummary(result);
      setIsSummarizing(false);
      setSummaryStatus("");
      setProfile(prev => ({ ...prev, xp: prev.xp + 20 })); // Earn 20 XP for modern AI summarization!
      if (soundEnabled) sound.playCorrect();
    } catch (err: any) {
      console.warn("AI Server Error, menggunakan pelokalisasi lokal offline:", err);
      timeouts.forEach(clearTimeout);
      
      // Sweet graceful fallback using client-side heuristics so it never blocks the user
      const localResult = summarizeText(textToUse);
      setSummary(localResult);
      setIsSummarizing(false);
      setSummaryStatus("");
      setProfile(prev => ({ ...prev, xp: prev.xp + 15 }));
      if (soundEnabled) sound.playCorrect();
    }
  };

  // Reader & Parser for uploaded formats (TXT, PDF, Word, PowerPoint)
  const processUploadedFile = (file: File) => {
    handleBtnClick();
    setUploadedFileName(file.name);
    setFileLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const fullBase64 = e.target?.result as string;
        // Split to get only the base64 payload
        const base64Data = fullBase64.split(",")[1];

        setIsSummarizing(true);
        setSummaryStatus("Mentransfer berkas ke Guru Quizo AI... 🦊⚡");

        const resp = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            mimeType: file.type,
            base64Data: base64Data
          }),
        });

        if (!resp.ok) {
          const errorData = await resp.json();
          throw new Error(errorData.error || "Server AI gagal memilah berkas Anda.");
        }

        const result = await resp.json();
        setSummary(result);
        
        // Reconstruct a preview in the text editor
        const previewText = `===== DOKUMEN: ${file.name} =====\n[Poin Utama Rangkuman]\n` + 
          result.bullets.map((b: string) => `• ${b}`).join("\n");
        setMaterialText(previewText);

        setIsSummarizing(false);
        setFileLoading(false);
        setSummaryStatus("");
        setProfile(prev => ({ ...prev, xp: prev.xp + 25 })); // Double bonus for real Document Parsing!
        if (soundEnabled) sound.playCorrect();
      } catch (err: any) {
        console.warn("Mulai parsing simulasi/fallback lokal karena kendala berkas:", err);
        setIsSummarizing(false);
        setFileLoading(false);
        setSummaryStatus("");

        // Elegant Local Fallback for offline usage
        const ext = file.name.split('.').pop()?.toLowerCase();
        let fallbackText = "";
        
        if (ext === 'txt') {
          // If txt, we can read it directly!
          const txtReader = new FileReader();
          txtReader.onload = (txtEvent) => {
            const rawText = txtEvent.target?.result as string;
            setMaterialText(rawText);
            runSummarizeLogic(rawText);
          };
          txtReader.readAsText(file);
        } else {
          // Fallback text templates based on name keywords
          const lowerName = file.name.toLowerCase();
          if (lowerName.includes("kimia") || lowerName.includes("reaksi") || lowerName.includes("atom")) {
            fallbackText = "Kimia organik adalah percabangan ilmu kimia mengenai struktur, sifat, komposisi, reaksi, dan sintesis senyawa karbon. Atom karbon memiliki karakteristik khas berupa kemampuan membentuk rantai ikatan kovalen yang stabil dengan sesama karbon maupun atom lain.";
          } else if (lowerName.includes("sejarah") || lowerName.includes("perang") || lowerName.includes("indonesia")) {
            fallbackText = "Sejarah kemerdekaan Indonesia diawali dengan pembacaan teks Proklamasi oleh Ir. Soekarno pada tanggal 17 Agustus 1945 di Jalan Pegangsaan Timur No. 56, Jakarta.";
          } else {
            const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            fallbackText = `Dokumen penting membahas materi "${cleanTitle}" yang mencakup landasan teoretis fundamental dan kerangka praktis aplikatif. Pelajari poin penting ini secara berulang untuk meraih skor maksimal.`;
          }
          setMaterialText(fallbackText);
          runSummarizeLogic(fallbackText);
        }
      }
    };

    reader.onerror = () => {
      alert("Gagal membaca berkas!");
      setFileLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // Quiz Playing State
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(STATIC_QUESTIONS);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCustomQuiz, setIsCustomQuiz] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'mudah' | 'sedang' | 'sulit'>('mudah');
  
  // Game progression tracking
  const [hearts, setHearts] = useState(3);
  const [scoreCoins, setScoreCoins] = useState(0);
  const [perfectRun, setPerfectRun] = useState(true);

  // Play clicksound wrapper
  const handleBtnClick = () => {
    if (soundEnabled) sound.playClick();
  };

  // Run Login Bypass & Validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBtnClick();

    const finalName = usernameInput.trim() || 'Siswa Keren 🧠';
    
    setProfile(prev => ({
      ...prev,
      username: finalName,
      streak: prev.streak === 0 ? 1 : prev.streak
    }));
    
    // Smooth navigation delay for animation feel
    setTimeout(() => {
      setView('dashboard');
    }, 150);
  };

  // Run Summary Engine Simulator with animated delays for high-fidelity gamification
  const handleSummarize = () => {
    handleBtnClick();
    runSummarizeLogic(materialText);
  };

  // Fast insert template helper
  const handleLoadExample = (exampleText: string) => {
    handleBtnClick();
    setMaterialText(exampleText);
    // Smooth scroll down to interactive segment slightly
  };

  // Launch Quiz Mode
  const startQuiz = (customMode: boolean, difficulty: 'mudah' | 'sedang' | 'sulit' = 'mudah') => {
    handleBtnClick();
    setIsCustomQuiz(customMode);
    
    let questionsToUse = STATIC_QUESTIONS;
    if (customMode) {
      if (summary && summary.suggestedQuestions.length > 0) {
        questionsToUse = summary.suggestedQuestions;
      }
    } else {
      setSelectedDifficulty(difficulty);
      // Filter STATIC_QUESTIONS by the selected difficulty level
      const filtered = STATIC_QUESTIONS.filter(q => q.difficulty === difficulty);
      // Shuffle those specific 5 questions
      const shuffledFiltered = [...filtered].sort(() => Math.random() - 0.5);
      
      // Safety fallback: if nothing found, fallback to slice of standard pool
      questionsToUse = shuffledFiltered.length > 0 ? shuffledFiltered : STATIC_QUESTIONS.slice(0, 5);
    }

    setActiveQuestions(questionsToUse);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setHearts(3);
    setScoreCoins(0);
    setPerfectRun(true);
    setView('quiz');
  };

  // Answer choice selector
  const handleOptionSelect = (idx: number) => {
    if (hasAnswered) return; // Locked once calculated
    handleBtnClick();
    setSelectedAnswer(idx);
  };

  // Answer confirmation (Check Button)
  const handleCheckAnswer = () => {
    if (selectedAnswer === null || hasAnswered) return;
    
    const isCorrect = selectedAnswer === activeQuestions[currentQuizIndex].correctIndex;
    setHasAnswered(true);

    if (isCorrect) {
      if (soundEnabled) sound.playCorrect();
      setScoreCoins(prev => prev + 25); // 25 Coins / XP per correct answer
    } else {
      if (soundEnabled) sound.playIncorrect();
      setHearts(prev => Math.max(0, prev - 1));
      setPerfectRun(false);
    }
  };

  // Transition to next quiz screen
  const handleNextQuestion = () => {
    handleBtnClick();
    const nextIdx = currentQuizIndex + 1;
    
    if (hearts <= 0 || nextIdx >= activeQuestions.length) {
      // Finished Quiz! Save stats
      setProfile(prev => ({
        ...prev,
        completedQuizzes: prev.completedQuizzes + 1,
        xp: prev.xp + scoreCoins + (hearts * 10), // Hearts bonus
        streak: prev.streak + 1
      }));
      
      if (soundEnabled) sound.playLevelComplete();
      setView('score');
    } else {
      // Core progress reset
      setCurrentQuizIndex(nextIdx);
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  };

  // Quick logout to initial login view
  const handleLogout = () => {
    handleBtnClick();
    setUsernameInput('');
    setPasswordInput('');
    setSummary(null);
    setMaterialText('');
    setView('login');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#3c3c3c] flex flex-col font-sans selection:bg-[#cbe3ff]">
      
      {/* GLOBAL BANNER FOR AUDIO TOGGLE BAR (SUDUT KANAN BAWAH) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          id="audio-toggle-btn"
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            sound.playClick();
          }}
          className={`p-3 rounded-full border-2 shadow-sm flex items-center justify-center transition-all duration-150 ${
            soundEnabled 
              ? 'bg-[#1890ff] text-white border-[#1c84e2] duo-shadow-blue hover:brightness-105 active:translate-y-[2px]' 
              : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
          }`}
          title={soundEnabled ? "Matikan Suara" : "Aktifkan Suara"}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* VIEW LAYER 1: HALAMAN LOGIN */}
      {view === 'login' && (
        <div id="view-login" className="flex-1 flex flex-col justify-center items-center px-4 py-12">
          {/* Logo with massive playful bounce */}
          <div className="text-center mb-8 select-none">
            {/* Friendly Mascot SVG styled dynamically */}
            <div className="inline-block relative animate-bounce-subtle duration-1000 mb-4 transition-transform hover:scale-105 cursor-pointer">
              <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Fox Ears */}
                <polygon points="22,35 12,12 38,26" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
                <polygon points="78,35 88,12 62,26" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
                <polygon points="24,32 17,17 34,26" fill="#e6f7ff"/>
                <polygon points="76,32 83,17 66,26" fill="#e6f7ff"/>
                
                {/* Fox Head Base */}
                <path d="M18,48 C18,28 82,28 82,48 C82,68 50,82 50,82 C50,82 18,68 18,48 Z" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
                
                {/* White Cheeks */}
                <path d="M22,54 C26,72 50,78 50,78 C50,78 74,72 78,54 C66,62 50,60 50,60 C50,60 34,62 22,54 Z" fill="#ffffff" stroke="#096dd9" strokeWidth="2"/>
                
                {/* Cute nose */}
                <ellipse cx="50" cy="64" rx="6" ry="4" fill="#3c3c3c"/>
                
                {/* Playful big eyes */}
                <circle cx="36" cy="45" r="11" fill="white" stroke="#096dd9" strokeWidth="3"/>
                <circle cx="64" cy="45" r="11" fill="white" stroke="#096dd9" strokeWidth="3"/>
                <circle cx="36" cy="45" r="4" fill="#3c3c3c"/>
                <circle cx="64" cy="45" r="4" fill="#3c3c3c"/>
                <circle cx="38" cy="43" r="1.5" fill="white"/>
                <circle cx="66" cy="43" r="1.5" fill="white"/>
                
                {/* Academic cap */}
                <polygon points="50,14 80,24 50,34 20,24" fill="#3c3c3c" stroke="#1f1f1f" strokeWidth="3"/>
                <rect x="47" y="24" width="6" height="10" fill="#3c3c3c"/>
                <path d="M78 24 L82 38 L80 40 L76 24 Z" fill="#ffec3d"/>
              </svg>
              <div className="absolute -top-3 -right-6 bg-[#ffec3d] text-xs font-bold text-yellow-800 px-2.5 py-1 rounded-full border-2 border-yellow-600 uppercase tracking-widest shadow-sm">
                Baru!
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1890ff] tracking-tight drop-shadow-sm font-sans flex items-center justify-center gap-2">
              StudyQuiz
            </h1>
            <p className="text-gray-500 font-semibold text-lg max-w-sm mt-2">
              Belajar asyik secara instan dengan rangkuman cerdas & kuis gamifikasi!
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border-2 border-[#e8e8e8] border-b-6 rounded-3xl p-8 max-w-md w-full shadow-lg transition-transform hover:scale-[1.01]">
            <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-5">
              Mulai Petualangan Belajarmu! 🚀
            </h2>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-600 font-extrabold text-sm mb-2">Nama Pengguna (Username)</label>
                <div className="relative">
                  <input
                    id="login-username"
                    type="text"
                    required
                    maxLength={16}
                    placeholder="Contoh: Rizky Gans"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-[#f5f5f5] hover:bg-[#eaeaea] focus:bg-white text-gray-800 border-2 border-transparent focus:border-[#1890ff] rounded-2xl px-5 py-4 font-bold text-lg outline-none transition-all placeholder-gray-400 focus:shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                </div>
              </div>

              {/* Interactive Avatar Picker for Login */}
              <div>
                <label className="block text-gray-600 font-extrabold text-sm mb-2 text-center sm:text-left">
                  Pilih Karakter Belajar Kamu 🦊🦉🐨
                </label>
                <div className="grid grid-cols-6 gap-2 bg-gray-50 border border-gray-100 p-2.5 rounded-2xl">
                  {AVATAR_LIST.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        handleBtnClick();
                        setProfile(prev => ({ ...prev, avatarSeed: av.id }));
                      }}
                      className={`relative p-1 rounded-2xl border-2 transition-all aspect-square flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 ${
                        profile.avatarSeed === av.id
                          ? 'border-[#1890ff] bg-blue-50/60 ring-2 ring-blue-300 shadow-xs scale-105 z-10'
                          : 'border-transparent bg-white hover:border-gray-200'
                      }`}
                      title={av.name}
                    >
                      {renderAvatarSVG(av.id, "w-10 h-10")}
                      {profile.avatarSeed === av.id && (
                        <div className="absolute bottom-0 right-0 bg-[#1890ff] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black border border-white">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-extrabold text-sm mb-2">Kunci Sandi (Password)</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-[#f5f5f5] hover:bg-[#eaeaea] focus:bg-white text-gray-800 border-2 border-transparent focus:border-[#1890ff] rounded-2xl px-5 py-4 font-bold text-lg outline-none transition-all placeholder-gray-400 focus:shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-600 font-bold p-3 rounded-xl border border-red-200 text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              {/* Duolingo style 3D heavy button */}
              <button
                id="login-submit-btn"
                type="submit"
                className="w-full bg-[#1890ff] hover:brightness-105 active:brightness-95 text-white font-extrabold text-xl py-4 rounded-2xl transition-all border-b-6 border-[#096dd9] active:border-b-0 active:translate-y-[6px] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Masuk Sekarang
                <ArrowRight size={22} className="stroke-[3]" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm font-semibold">Tinggal klik masuk untuk bypass langsung tanpa sandi! 😉</span>
            </div>
          </div>

          {/* Professional Login Footer */}
          <footer className="mt-12 w-full max-w-lg border-t border-gray-200/60 pt-6 text-center text-xs text-gray-400 select-none">
            <div className="flex justify-center flex-wrap gap-4 mb-3 text-gray-500 font-semibold">
              <span className="hover:text-[#1890ff] cursor-pointer transition-colors flex items-center gap-1">
                <GraduationCap size={14} /> Tentang Platform
              </span>
              <span>•</span>
              <span className="hover:text-[#1890ff] cursor-pointer transition-colors flex items-center gap-1">
                <HelpCircle size={14} /> Pusat Bantuan
              </span>
              <span>•</span>
              <span className="hover:text-[#1890ff] cursor-pointer transition-colors flex items-center gap-1">
                <Lock size={14} /> Privasi Keamanan
              </span>
            </div>
            <p className="font-medium text-gray-400/80 leading-relaxed max-w-sm mx-auto">
              © 2026 StudyQuiz. Memberdayakan Proses Belajar Mandiri yang Efektif dan Terukur.
            </p>
          </footer>
        </div>
      )}

      {/* VIEW LAYER 2: TAMPILAN AWAL (DASHBOARD) */}
      {view === 'dashboard' && (
        <div id="view-dashboard" className="flex-1 flex flex-col">
          {/* NAV BAR */}
          <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-40 px-4 md:px-8 py-3.5 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Brand Logo */}
              <div 
                className="flex items-center gap-2 cursor-pointer select-none group" 
                onClick={() => {
                  handleBtnClick();
                  setSummary(null);
                  setMaterialText('');
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 select-none">
                  <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Fox Ears */}
                    <polygon points="22,35 12,12 38,26" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
                    <polygon points="78,35 88,12 62,26" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
                    <polygon points="24,32 17,17 34,26" fill="#e6f7ff"/>
                    <polygon points="76,32 83,17 66,26" fill="#e6f7ff"/>
                    
                    {/* Fox Head Base */}
                    <path d="M18,48 C18,28 82,28 82,48 C82,68 50,82 50,82 C50,82 18,68 18,48 Z" fill="#1890ff" stroke="#096dd9" strokeWidth="5" strokeLinejoin="round"/>
                    
                    {/* White Cheeks */}
                    <path d="M22,54 C26,72 50,78 50,78 C50,78 74,72 78,54 C66,62 50,60 50,60 C50,60 34,62 22,54 Z" fill="#ffffff" stroke="#096dd9" strokeWidth="2"/>
                    
                    {/* Cute nose */}
                    <ellipse cx="50" cy="64" rx="6" ry="4" fill="#3c3c3c"/>
                    
                    {/* Playful big eyes */}
                    <circle cx="36" cy="45" r="11" fill="white" stroke="#096dd9" strokeWidth="3"/>
                    <circle cx="64" cy="45" r="11" fill="white" stroke="#096dd9" strokeWidth="3"/>
                    <circle cx="36" cy="45" r="4" fill="#3c3c3c"/>
                    <circle cx="64" cy="45" r="4" fill="#3c3c3c"/>
                    <circle cx="38" cy="43" r="1.5" fill="white"/>
                    <circle cx="66" cy="43" r="1.5" fill="white"/>
                    
                    {/* Academic cap */}
                    <polygon points="50,14 80,24 50,34 20,24" fill="#3c3c3c" stroke="#1f1f1f" strokeWidth="3"/>
                    <rect x="47" y="24" width="6" height="10" fill="#3c3c3c"/>
                    <path d="M78 24 L82 38 L80 40 L76 24 Z" fill="#ffec3d"/>
                  </svg>
                </div>
                <span className="text-2xl font-black text-[#1890ff] tracking-tight">StudyQuiz</span>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3">
                {/* Streak */}
                <div className="flex items-center gap-1.5 bg-orange-50 border-2 border-orange-200 text-orange-600 px-3 py-1.5 rounded-2xl font-bold text-sm shadow-xs animate-pulse">
                  <Flame size={18} fill="currentColor" stroke="none" />
                  <span>{profile.streak} Hari</span>
                </div>

                {/* Score XP */}
                <div className="flex items-center gap-1.5 bg-yellow-50 border-2 border-yellow-200 text-yellow-600 px-3 py-1.5 rounded-2xl font-bold text-sm shadow-xs">
                  <Trophy size={18} fill="currentColor" className="text-yellow-500" />
                  <span>{profile.xp} XP</span>
                </div>

                {/* Profile Detail & Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs text-gray-400 font-extrabold">BELAJAR SEBAGAI</p>
                    <p className="text-sm text-gray-700 font-black truncate max-w-[120px]">{profile.username}</p>
                  </div>
                  <div 
                    onClick={() => { handleBtnClick(); setIsAvatarModalOpen(true); }}
                    className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all overflow-hidden flex items-center justify-center p-0.5"
                    title="Ganti Avatar Lu"
                  >
                    {renderAvatarSVG(profile.avatarSeed, "w-8 h-8")}
                  </div>

                  <button 
                    id="nav-logout-btn"
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors cursor-pointer"
                    title="Keluar Akun"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>

            </div>
          </nav>

          {/* MAIN CONTAINER */}
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT PROFILE & HISTORY STATS (BENTO CARD style) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white border-2 border-gray-200 border-b-6 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 px-4 py-1 rounded-bl-2xl font-black text-xs uppercase tracking-wider">
                  Siswa Aktif
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div 
                      onClick={() => { handleBtnClick(); setIsAvatarModalOpen(true); }}
                      className="w-18 h-18 rounded-2xl bg-indigo-50 border-4 border-indigo-100 shadow-md flex items-center justify-center cursor-pointer overflow-hidden hover:scale-105 active:scale-95 transition-all p-1"
                      title="Klik untuk mengganti Avatar"
                    >
                      {renderAvatarSVG(profile.avatarSeed, "w-14 h-14")}
                    </div>
                    <button
                      onClick={() => { handleBtnClick(); setIsAvatarModalOpen(true); }}
                      className="absolute -bottom-1.5 -right-1.5 bg-[#ffec3d] hover:bg-[#ffec3d]/90 text-yellow-900 w-6.5 h-6.5 rounded-full flex items-center justify-center shadow-md border-2 border-white text-[10px] font-black transition-transform hover:scale-110 active:scale-90"
                      title="Ubah Avatar"
                    >
                      ✏️
                    </button>
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-800 tracking-tight leading-none mb-1">{profile.username}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="text-xs font-bold text-[#1890ff]">Belajar & Menang XP</span>
                      <button 
                        onClick={() => { handleBtnClick(); setIsAvatarModalOpen(true); }}
                        className="text-[10px] text-gray-400 hover:text-[#1890ff] font-extrabold underline text-left"
                      >
                        (Ganti Karakter)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[11px] text-gray-400 font-black uppercase">XP TERKUMPUL</p>
                    <p className="text-lg font-black text-gray-800 flex items-center gap-1">
                      <Award size={18} className="text-yellow-500" /> {profile.xp}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[11px] text-gray-400 font-black uppercase">Kuis Selesai</p>
                    <p className="text-lg font-black text-gray-800 flex items-center gap-1">
                      <ListTodo size={18} className="text-green-500" /> {profile.completedQuizzes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mascot Bubble Tip */}
              <div className="bg-[#e6f7ff] border-2 border-[#1890ff] rounded-3xl p-5 relative">
                {/* SVG Mini Owl */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex-shrink-0 bg-white rounded-2xl border-2 border-blue-400 flex items-center justify-center shadow-xs">
                    <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
                      <ellipse cx="50" cy="55" rx="36" ry="38" fill="#1890ff"/>
                      <circle cx="36" cy="42" r="14" fill="white"/>
                      <circle cx="64" cy="42" r="14" fill="white"/>
                      <circle cx="36" cy="42" r="5" fill="#3c3c3c"/>
                      <circle cx="64" cy="42" r="5" fill="#3c3c3c"/>
                      <polygon points="50,48 44,56 56,56" fill="#ff7a45"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-blue-900 text-sm">Masukan Guru Quizo:</p>
                    <p className="text-blue-800 text-xs font-semibold mt-1 leading-relaxed">
                      "Tempelkan sebuah materi artikel atau paragraf panjang di bagian pengolah, klik **Ringkas Sekarang**, lalu nikmati kuis kustom instan yang dirancang dari teks buatanmu!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Traditional IT general quiz starting portal */}
              <div className="bg-white border-2 border-gray-200 border-b-6 rounded-3xl p-5 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-3 border-b-3 border-green-300 font-bold text-xl">
                  💻
                </div>
                <h4 className="font-black text-gray-800">Uji Pengetahuan IT Umum</h4>
                <p className="text-xs text-gray-400 font-semibold mt-1 mb-4">Pilih tingkat kesulitan untuk menguji pemahaman teknologi standar berisi 5 soal.</p>
                
                <div className="space-y-2.5">
                  <button
                    id="start-easy-quiz"
                    onClick={() => startQuiz(false, 'mudah')}
                    className="w-full bg-[#52c41a] hover:brightness-105 active:translate-y-[2px] active:border-b-0 text-white font-black py-2.5 rounded-2xl border-b-4 border-[#389e0d] transition-all text-xs flex items-center justify-between px-4 cursor-pointer"
                  >
                    <span>🟢 Tingkat Mudah</span>
                    <span className="bg-black/15 px-2 py-0.5 rounded-lg text-[10px] uppercase font-black">Mulai</span>
                  </button>

                  <button
                    id="start-medium-quiz"
                    onClick={() => startQuiz(false, 'sedang')}
                    className="w-full bg-[#fa8c16] hover:brightness-105 active:translate-y-[2px] active:border-b-0 text-white font-black py-2.5 rounded-2xl border-b-4 border-[#d46b08] transition-all text-xs flex items-center justify-between px-4 cursor-pointer"
                  >
                    <span>🟡 Tingkat Sedang</span>
                    <span className="bg-black/15 px-2 py-0.5 rounded-lg text-[10px] uppercase font-black">Mulai</span>
                  </button>

                  <button
                    id="start-hard-quiz"
                    onClick={() => startQuiz(false, 'sulit')}
                    className="w-full bg-[#f5222d] hover:brightness-105 active:translate-y-[2px] active:border-b-0 text-white font-black py-2.5 rounded-2xl border-b-4 border-[#cf1322] transition-all text-xs flex items-center justify-between px-4 cursor-pointer"
                  >
                    <span>🔴 Tingkat Sulit</span>
                    <span className="bg-black/15 px-2 py-0.5 rounded-lg text-[10px] uppercase font-black">Mulai</span>
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT MAIN WORKSPACE Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Learning Hub Header */}
              <div className="bg-white border-2 border-gray-200 border-b-6 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-2.5 text-[#1890ff] mb-2">
                  <BookOpen className="stroke-[3]" size={24} />
                  <span className="text-xs font-black uppercase tracking-widest">Kubah Ringkas & Puskat Belajar</span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">Ketik & Ringkas Materi Panjang</h2>
                <p className="text-gray-500 font-semibold mt-1">Sederhanakan informasi kompleks dan siapkan kuis adaptif dalam satu klik.</p>

                {/* Templates selectors */}
                <div className="mt-5">
                  <p className="text-xs text-gray-400 font-black uppercase mb-2">💡 COBA MATERI CONTOH :</p>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAL_EXAMPLES.map((item, index) => (
                      <button
                        key={index}
                        id={`example-template-${index}`}
                        onClick={() => handleLoadExample(item.text)}
                        className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-[#1890ff] px-3.5 py-2 rounded-2xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1 shadow-2xs hover:scale-[1.02]"
                      >
                        <Sparkles size={12} className="text-blue-500" />
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FILE UPLOAD SECTION MODAL/DROPZONE */}
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400 font-black uppercase flex items-center gap-1.5">
                      <FileText size={12} /> ATAU UNGGAH BERKAS MATERI :
                    </p>
                    
                    {/* Format badge labels */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200">PDF</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-200">WORD</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200">PPT</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">TXT</span>
                    </div>
                  </div>

                  {/* Interactive Drag Drop Box */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        processUploadedFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-150 relative ${
                      isDragging 
                        ? 'border-[#1890ff] bg-blue-50/50 scale-[1.01]' 
                        : fileLoading 
                          ? 'border-blue-300 bg-gray-50/70'
                          : uploadedFileName 
                            ? 'border-green-300 bg-green-50/10'
                            : 'border-gray-300 bg-gray-50/30 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {/* Hidden input element */}
                    <input
                      id="studyquiz-file-uploader"
                      type="file"
                      accept=".txt,.pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processUploadedFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {fileLoading ? (
                      <div className="flex flex-col items-center justify-center py-2 space-y-2">
                        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-extrabold text-sm text-blue-800">Guru Quizo sedang membaca berkasmu... 🦉✨</p>
                        <p className="text-xs text-gray-400 font-semibold">{uploadedFileName}</p>
                      </div>
                    ) : uploadedFileName ? (
                      <div className="flex items-center justify-between gap-3 text-left bg-white border border-gray-200 p-3.5 rounded-xl shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 border-b-2 border-green-300 font-bold">
                            <File size={20} />
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-800 text-sm line-clamp-1">{uploadedFileName}</p>
                            <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                              <Check size={12} className="stroke-[3]" /> Berhasil dimasukkan ke editor ringkasan!
                            </p>
                          </div>
                        </div>

                        {/* Clear/Delete file button */}
                        <button
                          type="button"
                          id="clear-file-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // halt file upload activation
                            handleBtnClick();
                            setUploadedFileName('');
                            setMaterialText('');
                          }}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-lg transition-colors border border-red-200/50 z-20 cursor-pointer"
                          title="Hapus berkas"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-2.5">
                        <div className="w-12 h-12 bg-blue-50 text-[#1890ff] rounded-full flex items-center justify-center mx-auto mb-2.5 border-b-2 border-blue-200">
                          <Upload size={20} className="animate-bounce" />
                        </div>
                        <p className="text-sm font-extrabold text-gray-700">Tarik & Lepas berkas atau <span className="text-[#1890ff] hover:underline">Pilih berkas</span></p>
                        <p className="text-xs text-gray-400 font-medium mt-1">Mendukung file teks dan salinan pelajaran (.pdf, .doc, .docx, .ppt, .pptx, .txt)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Text Area */}
                <div className="mt-5 relative">
                  <textarea
                    id="material-text-input"
                    className="w-full text-gray-800 bg-gray-50 border-2 border-gray-200 focus:border-[#1890ff] focus:bg-white rounded-2xl p-5 font-semibold text-sm outline-none transition-all placeholder-gray-400 min-h-[160px] pb-11"
                    placeholder="Tempelkan paragraf, materi artikel, atau topik pembelajaran yang ingin Anda rangkum di sini..."
                    value={materialText}
                    onChange={(e) => setMaterialText(e.target.value)}
                  />
                  
                  {/* Word count counter bubble */}
                  <div className="absolute right-4 bottom-4 bg-gray-200/80 backdrop-blur-xs text-[11px] text-gray-500 font-bold px-2.5 py-1 rounded-lg">
                    {materialText.trim().split(/\s+/).filter(Boolean).length} Kata
                  </div>
                </div>

                {/* Submit action button with active states */}
                <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                  <button
                    id="summarize-btn"
                    onClick={handleSummarize}
                    disabled={isSummarizing || !materialText.trim()}
                    className={`px-8 py-3.5 rounded-2xl font-black text-lg text-white transition-all border-b-6 shadow-md cursor-pointer flex items-center gap-2 ${
                      !materialText.trim() 
                        ? 'bg-gray-300 border-gray-400 cursor-not-allowed shadow-none border-b-0 translate-y-2' 
                        : isSummarizing
                          ? 'bg-blue-400 border-blue-500 cursor-wait'
                          : 'bg-[#1890ff] border-[#096dd9] hover:brightness-105 active:translate-y-[4px] active:border-b-0'
                    }`}
                  >
                    {isSummarizing ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Memproses Rangkuman...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="fill-white" />
                        Ringkas Sekarang!
                      </>
                    )}
                  </button>

                  <button
                    id="clear-btn"
                    onClick={() => {
                      handleBtnClick();
                      setMaterialText('');
                      setSummary(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 font-extrabold text-sm py-2 px-4 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    Kosongkan Teks
                  </button>
                </div>

                {/* Animated progress states for summarizer helper */}
                {isSummarizing && (
                  <div className="mt-5 p-4 bg-blue-50 border-2 border-blue-200/50 rounded-2xl flex items-center gap-3 animate-pulse">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                    <span className="text-sm font-extrabold text-blue-800">{summaryStatus}</span>
                  </div>
                )}
              </div>

              {/* SUMMARY OUTPUT AND QUIZ ACCESS (Visible only when Summary gets populated) */}
              {summary && (
                <div id="summary-section" className="bg-white border-2 border-[#1890ff] shadow-lg border-b-6 rounded-3xl p-6 md:p-8 animate-fade-in relative overflow-hidden">
                  
                  {/* Decorative element design */}
                  <div className="absolute top-0 right-0 bg-[#1890ff] text-white px-5 py-1.5 rounded-bl-3xl font-extrabold text-xs tracking-wider uppercase flex items-center gap-1 shadow-sm">
                    <Sparkles size={12} className="fill-white" /> AI SIMULASI SUCCESS
                  </div>

                  {/* Header info */}
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight leading-tight flex items-center gap-2">
                    {summary.title}
                  </h3>

                  {/* Badges details */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border border-blue-100">
                      <Clock size={13} /> {summary.readTime} Baca
                    </div>
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border border-green-100">
                      <TrendingUp size={13} /> Kompleksitas: {summary.complexity}
                    </div>
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5">
                      <FileText size={13} /> {summary.wordCount} Kata Asli
                    </div>
                  </div>

                  {/* Summary Bullets */}
                  <div className="mt-6 space-y-3.5 bg-gray-50 border-2 border-gray-200/40 p-5 rounded-2xl">
                    <p className="text-xs text-gray-400 font-black tracking-widest uppercase">HASIL RANGKUMAN INTI MATERI :</p>
                    {summary.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 bg-[#e6f7ff] text-[#1890ff] font-extrabold text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                          {idx + 1}
                        </div>
                        <p className="text-sm font-bold text-gray-700 leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* QUIZ PORTAL TRIGGERS */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-5 bg-gradient-to-r from-blue-50 to-[#e6f7ff] p-6 rounded-3xl border border-blue-100/50">
                    <div className="text-center md:text-left">
                      <span className="bg-[#ffec3d] text-yellow-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Mainkan Game
                      </span>
                      <h4 className="text-xl font-black text-blue-900 mt-1">Siap Uji Pemahaman Anda? MCQ</h4>
                      <p className="text-xs text-blue-700/80 font-bold mt-0.5">
                        {summary.suggestedQuestions.length > 0 
                          ? `Mainkan kuis kustom adaptif berisi ${summary.suggestedQuestions.length} pertanyaan dari materi ini.`
                          : "Gunakan kuis custom atau set default cerdas untuk mengasah otak."}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        id="start-custom-quiz-btn"
                        onClick={() => startQuiz(true)}
                        className="px-6 py-4 bg-[#ff7a45] hover:brightness-105 active:translate-y-[4px] active:border-b-0 text-white font-extrabold text-md rounded-2xl border-b-6 border-[#d4380d] transition-all flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse"
                      >
                        Mulai Quiz! 🚀
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* Professional Dashboard Footer */}
          <footer className="w-full bg-white border-t border-gray-200/85 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 select-none">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1890ff] rounded-md flex items-center justify-center border-b-2 border-[#096dd9] text-white font-black text-xs">
                  S
                </div>
                <p className="font-bold text-gray-500">
                  StudyQuiz © 2026. <span className="font-medium text-gray-400">Semua Hak Cipta Dilindungi.</span>
                </p>
              </div>

              <div className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2 font-semibold text-gray-500/90">
                <span className="hover:text-[#1890ff] cursor-pointer transition-colors flex items-center gap-1">
                  <GraduationCap size={13} /> Metode Belajar
                </span>
                <span className="text-gray-200">|</span>
                <span className="hover:text-[#1890ff] cursor-pointer transition-colors flex items-center gap-1">
                  <HelpCircle size={13} /> FAQ Petunjuk
                </span>
                <span className="text-gray-200">|</span>
                <span className="hover:text-[#1890ff] cursor-pointer transition-colors flex items-center gap-1">
                  <Lock size={13} /> Ketentuan Layanan
                </span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* VIEW LAYER 3: HALAMAN QUIZ */}
      {view === 'quiz' && (
        <div id="view-quiz" className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          
          <div className="bg-white border-2 border-gray-200 border-b-6 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-xl">
            
            {/* PROGRESS HEADER GAME & HEARTS */}
            <div className="flex items-center justify-between gap-4 mb-6">
              
              {/* Back out button */}
              <button
                id="quit-quiz-btn"
                onClick={() => {
                  handleBtnClick();
                  if (confirm("Apakah Anda yakin ingin keluar dari kuis? Skor saat ini akan hilang!")) {
                    setView('dashboard');
                  }
                }}
                className="text-xs font-black text-gray-400 hover:text-red-500 py-1.5 px-3 rounded-lg hover:bg-gray-50 border border-gray-200/50 transition-all cursor-pointer"
              >
                Keluar 🚪
              </button>

              {/* Progress bar container (QuizIs-style progress) */}
              <div className="flex-1 h-3.5 bg-gray-100 rounded-full overflow-hidden relative border border-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 to-[#1890ff] rounded-full transition-all duration-300 relative"
                  style={{ width: `${((currentQuizIndex) / activeQuestions.length) * 100}%` }}
                >
                  {/* Floating mascot visual at end of progress bar */}
                  <div className="absolute right-0 top-0 w-3.5 h-3.5 bg-yellow-400 rounded-full border border-white animate-ping"></div>
                </div>
              </div>

              {/* Score indicator XP & Questions progress */}
              <div className="text-xs font-black text-[#1890ff] flex-shrink-0">
                Soal {currentQuizIndex + 1} / {activeQuestions.length}
              </div>

              {/* Hearts / Lives indicator */}
              <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2.5 py-1 rounded-xl border border-red-100 font-extrabold text-sm flex-shrink-0 animate-bounce">
                <Heart size={15} fill="currentColor" />
                <span>{hearts}</span>
              </div>

            </div>

            {/* QUIZ PORTAL BODY */}
            <div className="space-y-6">
              
              {/* Question card */}
              <div className="bg-gradient-to-br from-blue-50 to-[#e6f7ff]/40 border-2 border-blue-100 p-6 rounded-3xl relative">
                <span className="absolute -top-3 left-4 bg-[#1890ff] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {isCustomQuiz ? "Kuis Kustom" : `Ujian IT - ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}`}
                </span>
                
                <h3 className="text-lg md:text-xl font-black text-gray-800 leading-snug mt-2">
                  {activeQuestions[currentQuizIndex]?.question}
                </h3>
              </div>

              {/* Multiple Choice Options List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeQuestions[currentQuizIndex]?.options.map((option, idx) => {
                  
                  // Styling dynamics based on answer choices
                  let optionStyle = "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 active:translate-y-[2px]";
                  
                  if (selectedAnswer === idx) {
                    optionStyle = "bg-blue-50 border-[#1890ff] text-[#1890ff] ring-2 ring-[#e6f7ff]";
                  }

                  if (hasAnswered) {
                    const isCorrectOption = idx === activeQuestions[currentQuizIndex].correctIndex;
                    const isChosenIncorrect = selectedAnswer === idx && !isCorrectOption;

                    if (isCorrectOption) {
                      optionStyle = "bg-green-50 border-[#4caf50] text-green-700 font-extrabold ring-2 ring-green-100";
                    } else if (isChosenIncorrect) {
                      optionStyle = "bg-red-50 border-[#f44336] text-red-700 line-through ring-2 ring-red-100";
                    } else {
                      optionStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-5 border-2 border-b-6 rounded-2xl font-bold text-sm md:text-base leading-snug transition-all outline-none flex items-center gap-3.5 select-none ${optionStyle} ${
                        hasAnswered ? 'cursor-default border-b-2' : ''
                      }`}
                    >
                      {/* Circle Letter label */}
                      <div className={`w-8 h-8 rounded-xl font-black flex items-center justify-center flex-shrink-0 pointer-events-none text-xs border ${
                        selectedAnswer === idx 
                          ? 'bg-[#1890ff] text-white border-[#096dd9]' 
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* ACTION TOGGLER SECTION */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                
                {/* Score Status info */}
                <div className="text-xs font-extrabold text-gray-400 flex items-center gap-1.5">
                  <Brain size={15} /> Estimasi XP yang diperoleh: +{scoreCoins} XP
                </div>

                {/* Confirm and Forward buttons */}
                {!hasAnswered ? (
                  <button
                    id="check-answer-btn"
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3.5 rounded-2xl font-black text-base text-white transition-all border-b-6 shadow-md cursor-pointer ${
                      selectedAnswer === null
                        ? 'bg-gray-200 border-gray-300 text-gray-400 shadow-none border-b-2 cursor-not-allowed'
                        : 'bg-[#1890ff] border-[#096dd9] hover:brightness-105 active:translate-y-[4px] bg-sky-500'
                    }`}
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <button
                    id="next-question-btn"
                    onClick={handleNextQuestion}
                    className="px-8 py-3.5 rounded-2xl font-black text-base text-white bg-[#4caf50] border-[#388e3c] border-b-6 hover:brightness-105 active:translate-y-[4px] active:border-b-0 transition-all flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse"
                  >
                    {currentQuizIndex + 1 >= activeQuestions.length || hearts <= 0 ? (
                      <>Lihat Hasil Skor <Award size={18} /></>
                    ) : (
                      <>Pertanyaan Berikutnya <ChevronRight size={18} /></>
                    )}
                  </button>
                )}

              </div>

            </div>

            {/* INSTANT ANSWER FEEDBACK HEADER BANNER (Sliding bottom) */}
            {hasAnswered && (
              <div className={`mt-6 p-5 rounded-2xl border-2 flex flex-col md:flex-row gap-4 items-center justify-between ${
                selectedAnswer === activeQuestions[currentQuizIndex].correctIndex
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex gap-3 items-start text-left">
                  <div className="mt-0.5">
                    {selectedAnswer === activeQuestions[currentQuizIndex].correctIndex ? (
                      <CheckCircle2 size={24} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-md">
                      {selectedAnswer === activeQuestions[currentQuizIndex].correctIndex 
                        ? 'Luar Biasa, Kamu Benar! 🎉' 
                        : 'Waduh, Jawabannya Belum Tepat! ⚡'}
                    </h4>
                    <p className="text-xs font-semibold mt-1 leading-relaxed max-w-lg">
                      {activeQuestions[currentQuizIndex].explanation || 
                       "Setiap kesalahan adalah langkah awal pemahaman yang lebih kuat. Pelajari kembali materi Anda!"}
                    </p>
                  </div>
                </div>

                <div className="font-extrabold text-[#4caf50] text-sm tracking-wider uppercase animate-bounce-subtle">
                  {selectedAnswer === activeQuestions[currentQuizIndex].correctIndex ? "+25 XP!" : "Cobalah Lagi!"}
                </div>
              </div>
            )}

          </div>

          {/* QUICK FLOATING ADMONITION METER */}
          <div className="mt-6 text-gray-400 font-extrabold text-sm text-center max-w-sm leading-relaxed pointer-events-none">
            💡 Tips: Untuk me-reset kuis kapan saja, silakan pakai menu keluar di pojok kiri atas.
          </div>
        </div>
      )}

      {/* VIEW LAYER 4: SCORE VICTORY RETREAT */}
      {view === 'score' && (
        <div id="view-score" className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
          
          <div className="bg-white border-2 border-gray-200 border-b-6 rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl relative z-20 text-center">
            
            {/* Run Confetti animation inside scorecard */}
            <ConfettiCanvas />

            {/* Shield medal badge */}
            <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-full border-4 border-white shadow-lg mx-auto flex items-center justify-center mb-6 relative animate-bounce-subtle">
              <Trophy size={48} className="text-white drop-shadow-sm" fill="currentColor" />
              <div className="absolute -bottom-2 bg-green-500 text-white text-[10px] uppercase font-black px-3 py-0.5 rounded-full border-2 border-white tracking-widest leading-none">
                Selesai
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Kuis Selesai! 🎉</h2>
            <p className="text-gray-500 font-bold mt-1 max-w-xs mx-auto">
              {perfectRun && hearts === 3
                ? "Luar biasa! Skor Sempurna Tanpa Terkalahkan!"
                : "Hebat! Teruslah mengasah pengetahuan Anda."}
            </p>

            {/* STATS BENTO DISPLAY */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              
              {/* Stat 1: XP Earned */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-black text-yellow-600 block uppercase tracking-wider">TOTAL SCORE XP</span>
                <span className="text-2xl font-black text-yellow-600 mt-1 block">+{scoreCoins} XP</span>
              </div>

              {/* Stat 2: Lives Saved */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-black text-red-500 block uppercase tracking-wider">SISA NYAWA ❤️</span>
                <span className="text-2xl font-black text-red-500 mt-1 block">{hearts} / 3</span>
              </div>

              {/* Stat 3: Accuracy Rate */}
              <div className="col-span-2 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-black text-[#1890ff] block uppercase tracking-wider flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} /> AKURASI JAWABAN BENAR
                </span>
                <span className="text-2xl font-black text-[#1890ff] mt-1 block">
                  {Math.round((scoreCoins / (activeQuestions.length * 25)) * 100) || 0}%
                </span>
              </div>

            </div>

            {/* Encouragement text from Quizo */}
            <div className="mt-6 flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left text-xs font-bold leading-relaxed text-gray-500">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-center flex-shrink-0 select-none p-0.5">
                {renderAvatarSVG(profile.avatarSeed, "w-8 h-8")}
              </div>
              <div>
                "Bagus sekali, **{profile.username}**! Setiap kuis yang diselesaikan melatih sambungan saraf otakmu. Tingkatkan terus belajarmu!"
              </div>
            </div>

            {/* CTA TRIGGERS ACTION */}
            <div className="mt-8 space-y-3">
              <button
                id="replay-quiz-btn"
                onClick={() => startQuiz(isCustomQuiz, selectedDifficulty)}
                className="w-full bg-[#1890ff] hover:brightness-105 active:translate-y-[4px] active:border-b-c text-white font-black py-4.5 rounded-2xl border-b-6 border-[#096dd9] transition-all flex items-center justify-center gap-2 cursor-pointer text-md shadow-md"
              >
                <RotateCcw size={18} className="stroke-[3]" />
                Ulangi Kuis Lagi
              </button>

              <button
                id="score-dismiss-btn"
                onClick={() => {
                  handleBtnClick();
                  setView('dashboard');
                }}
                className="w-full bg-white hover:bg-gray-100 active:translate-y-[2px] active:border-b-0 text-gray-700 font-extrabold py-3.5 rounded-2xl border-2 border-gray-200 border-b-4 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm"
              >
                Kembali ke Dashboard
              </button>
            </div>

          </div>

          <p className="mt-6 text-gray-400 font-bold text-xs select-none">StudyQuiz Hero badge unlocked! 🌟</p>
        </div>
      )}

      {/* VIEW LAYER 5: INTERACTIVE AVATAR SELECTOR MODAL */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border-2 border-gray-200 border-b-8 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative animate-scale-up-bounce">
            
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">🎭</span>
              <h2 className="text-2xl font-black text-gray-800">Pilih Avatar Karaktermu!</h2>
              <p className="text-gray-400 font-bold text-xs mt-1">Ubah atau sesuaikan karakter belajar yang mewakili dirimu secara instan.</p>
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 my-6">
              {AVATAR_LIST.map((av) => {
                const isSelected = profile.avatarSeed === av.id;
                return (
                  <button
                    key={av.id}
                    onClick={() => {
                      handleBtnClick();
                      setProfile(prev => ({ ...prev, avatarSeed: av.id }));
                    }}
                    className={`p-4 rounded-2xl border-2 border-b-6 transition-all flex flex-col items-center justify-center relative cursor-pointer group select-none ${
                      isSelected
                        ? 'border-[#1890ff] bg-blue-50/50 text-[#1890ff] shadow-sm transform scale-[1.03] md:translate-y-[-2px]'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50 active:translate-y-[2px]'
                    }`}
                  >
                    {/* SVG Container */}
                    <div className="w-14 h-14 md:w-16 md:h-16 mb-2 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                      {renderAvatarSVG(av.id)}
                    </div>
                    
                    {/* Label */}
                    <span className="font-extrabold text-xs tracking-tight">{av.name}</span>
                    
                    {/* Active Ribbon Circle */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 bg-[#4caf50] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black border border-white">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions Footer */}
            <div className="flex gap-3 mt-6 border-t border-gray-100 pt-5">
              <button
                onClick={() => {
                  handleBtnClick();
                  setIsAvatarModalOpen(false);
                }}
                className="flex-1 bg-[#1890ff] hover:brightness-105 active:translate-y-[4px] text-white font-extrabold text-sm py-3 px-6 rounded-2xl border-b-4 border-[#096dd9] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                Gunakan Avatar Ini 👍
              </button>
              
              <button
                onClick={() => {
                  handleBtnClick();
                  setIsAvatarModalOpen(false);
                }}
                className="bg-gray-100 hover:bg-gray-200 active:translate-y-[2px] text-gray-500 font-bold text-sm py-3 px-5 rounded-2xl border-2 border-gray-200 border-b-4 transition-all cursor-pointer"
              >
                Batal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
