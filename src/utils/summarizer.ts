/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SummaryResult, QuizQuestion } from '../types';

// Natural or heuristic text summarizer + quiz generator
export function summarizeText(text: string): SummaryResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      title: "Materi Kosong",
      wordCount: 0,
      complexity: "Mudah",
      readTime: "0 menit",
      bullets: [
        "Masukkan tulisan materi Anda di kotak input untuk memulai ringkasan!",
        "Gunakan tombol contoh teks jika Anda bingung ingin bereksperimen dengan apa.",
        "Materi yang Anda tempelkan akan diubah menjadi rangkuman poin-poin penting."
      ],
      suggestedQuestions: []
    };
  }

  // Count words
  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Read time assumes 150 words per minute average active reading
  const minutes = Math.max(1, Math.ceil(wordCount / 150));
  const readTime = `± ${minutes} menit`;

  // Complexity rate
  let complexity: 'Mudah' | 'Sedang' | 'Tinggi' = 'Mudah';
  if (wordCount > 180) {
    complexity = 'Tinggi';
  } else if (wordCount > 60) {
    complexity = 'Sedang';
  }

  // Extract sentences
  const sentences = trimmed
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 8);

  const bullets: string[] = [];
  const suggestedQuestions: QuizQuestion[] = [];

  // Playful title ideas
  let title = "Rangkuman Pintar ⚡";
  if (words.length > 3) {
    // Take the first 3-4 nouns or words for a smart-looking title
    const firstFew = words.slice(0, 3).map(w => w.replace(/[^a-zA-Z0-9]/g, "")).join(" ");
    title = `Topik: "${firstFew.charAt(0).toUpperCase() + firstFew.slice(1)}..."`;
  }

  // Generate Bullet points
  if (sentences.length === 0) {
    bullets.push(
      `📌 Dokumen ringkas berisi ${wordCount} kata.`,
      "⭐ Kunci utama: Memahami definisi dasar topik yang dituliskan.",
      "🚀 Tip: Pelajari berulang-ulang materi ini sebelum memulai kuis agar meraih poin sempurna!"
    );
  } else {
    // Select up to 4 sentences
    const count = Math.min(4, sentences.length);
    for (let i = 0; i < count; i++) {
      // Clean sentence up a bit
      let clean = sentences[i];
      if (!clean.endsWith('.') && !clean.endsWith('!') && !clean.endsWith('?')) {
        clean += '.';
      }
      bullets.push(clean);
    }

    if (bullets.length < 3) {
      bullets.push("🌟 Intisari: Pahami konsep dasar ini secara komprehensif.");
    }
  }

  // Generate 2-3 Dynamic Quiz Questions based on the input text!
  // We parsed elements that look like factual sentences containing "is/are" or "adalah/merupakan/ialah"
  const factSentences = sentences.filter(s => 
    s.toLowerCase().includes('adalah') || 
    s.toLowerCase().includes('merupakan') || 
    s.toLowerCase().includes('ialah') || 
    s.toLowerCase().includes('yaitu') ||
    s.toLowerCase().includes('oleh') ||
    s.toLowerCase().includes('sebagai')
  );

  let qId = 100; // Custom ID starting point for custom quiz

  if (factSentences.length > 0) {
    factSentences.slice(0, 3).forEach((sentence, idx) => {
      // Find what comes before 'adalah' / 'merupakan' / 'ialah' / 'yaitu'
      const splitTerms = [' adalah ', ' merupakan ', ' ialah ', ' yaitu ', ' as '];
      let termUsed = '';
      let parts: string[] = [];

      for (const t of splitTerms) {
        if (sentence.toLowerCase().includes(t)) {
          termUsed = t;
          parts = sentence.split(new RegExp(t, 'i'));
          break;
        }
      }

      if (parts.length >= 2 && parts[0].trim().length > 3 && parts[1].trim().length > 10) {
        const subject = parts[0].trim();
        const definition = parts[1].trim();

        // Let's create a beautiful fill in the blank or interactive question!
        // Option 1: "Apakah yang dimaksud dengan [Subject]?"
        // Correct answer: The definition (or a shortened version of it)
        // Let's shorten option texts if they are too long, or make the subject the question.
        
        // Question A: "Berdasarkan materi, apakah definisi yang tepat dari: ________?" 
        // Subject as answer
        const questionText = `Berdasarkan rangkuman materi, istilah manakah yang paling tepat untuk mendeskripsikan: "${definition.substring(0, 100)}${definition.length > 100 ? '...' : ''}"?`;
        
        // Let's gather other random key terms or default options
        const distractors = ["Optimasi Algoritma", "Sistem Komputasi", "Manajemen Basisdata", "Metodologi Agile", "Paradigma Pemrograman", "Analisis Sistem"];
        const filteredDistractors = distractors.filter(d => d.toLowerCase() !== subject.toLowerCase());
        
        const options = [
          subject,
          filteredDistractors[0] || "Konsep Terkait A",
          filteredDistractors[1] || "Konsep Terkait B",
          filteredDistractors[2] || "Konsep Terkait C"
        ];

        // Shuffle options
        const correctIndex = 0;
        const shuffled = shuffleArray([...options]);
        const finalCorrectIndex = shuffled.indexOf(subject);

        suggestedQuestions.push({
          id: qId++,
          question: questionText,
          options: shuffled,
          correctIndex: finalCorrectIndex,
          explanation: `Dalam teks disebutkan bahwa "${subject}${termUsed}${definition}"`
        });
      }
    });
  }

  // If we couldn't produce enough dynamic questions, let's generate generic ones tailored to words found in text
  if (suggestedQuestions.length < 2) {
    // Check if science/technology keywords present
    const carriesIT = trimmed.toLowerCase().match(/(web|internet|coding|komputer|program|data|sistem|aplikasi|software|hardware|network|api|server|database)/);
    
    if (carriesIT) {
      suggestedQuestions.push({
        id: qId++,
        question: "Apakah tujuan utama dari mempelajari teknologi informasi berbasis data yang Anda baca?",
        options: [
          "Mengefisiensikan pemrosesan informasi secara terintegrasi",
          "Membatasi akses komunikasi antar jaringan global",
          "Menghapus seluruh sistem penyimpanan data fisik",
          "Hanya sekedar tren masa kini tanpa fungsi bisnis"
        ],
        correctIndex: 0,
        explanation: "Materi ini membahas pentingnya efisiensi digital, integrasi jaringan, dan pengelolaan data modern."
      });
    } else {
      // Standard reading comprehensive question
      suggestedQuestions.push({
        id: qId++,
        question: "Manakah pelajaran moral atau inti utama yang paling menonjol dari pembahasan teks materi tersebut?",
        options: [
          "Meningkatkan wawasan kognitif dan daya ingat mendalam",
          "Meninggalkan teknologi demi cara-cara tradisional",
          "Mengurangi waktu istirahat secara berlebihan",
          "Mengabaikan detil-detil penjelasan yang panjang"
        ],
        correctIndex: 0,
        explanation: "Belajar merangkum membantu kita menangkap detail krusial, melatih fokus, dan menghemat waktu belajar."
      });
    }
  }

  // Give a nice final fallback question
  suggestedQuestions.push({
    id: qId++,
    question: "Bagaimanakah strategi terbaik setelah Anda membaca rangkuman cerdas ini?",
    options: [
      "Mengabaikan materi dan langsung tidur",
      "Mencoba kuis StudyQuiz secara berkala untuk memperkuat daya ingat",
      "Menyalin ulang seluruh isi teks tanpa membacanya kembali",
      "Mencari materi lain yang tidak ada hubungannya"
    ],
    correctIndex: 1,
    explanation: "Menguji ingatan sesaat lewat kuis (active recall) terbukti meningkatkan retensi otak hingga 150%!"
  });

  return {
    title,
    wordCount,
    complexity,
    readTime,
    bullets,
    suggestedQuestions
  };
}

// Utility to shuffle options
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
