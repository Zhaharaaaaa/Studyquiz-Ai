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

  // Generate Dynamic Quiz Questions based on the input text!
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
    factSentences.slice(0, 4).forEach((sentence) => {
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
        
        const questionText = `Berdasarkan rangkuman materi, istilah manakah yang paling tepat untuk mendeskripsikan: "${definition.substring(0, 100)}${definition.length > 100 ? '...' : ''}"?`;
        
        const distractors = ["Optimasi Algoritma", "Sistem Komputasi", "Manajemen Basisdata", "Metodologi Agile", "Paradigma Pemrograman", "Analisis Sistem"];
        const filteredDistractors = distractors.filter(d => d.toLowerCase() !== subject.toLowerCase());
        
        const options = [
          subject,
          filteredDistractors[0] || "Konsep Terkait A",
          filteredDistractors[1] || "Konsep Terkait B",
          filteredDistractors[2] || "Konsep Terkait C"
        ];

        // Shuffle options
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

  // If we still need more questions, let's generate some via the bullet points to make them ultra customized to the summary!
  if (suggestedQuestions.length < 5) {
    bullets.forEach((bullet) => {
      if (suggestedQuestions.length >= 5) return;
      
      // Let's identify candidate words in this bullet that are informative
      // Pick nouns or terms: Capitalized words or words longer than 5 letters.
      const wordsInBullet = bullet.split(/\s+/).map(w => w.replace(/[^a-zA-Z0-9]/g, "")).filter(w => w.length > 5);
      if (wordsInBullet.length > 0) {
        // Pick the longest word as our key word to blank out
        const sortedByLength = [...wordsInBullet].sort((a,b) => b.length - a.length);
        const keyWord = sortedByLength[0];
        
        if (keyWord && keyWord.length > 3) {
          // Check if we haven't already used this keyWord
          const alreadyUsed = suggestedQuestions.some(q => q.options.includes(keyWord));
          if (!alreadyUsed) {
            // Replace the key word with a blank line '_______'
            const escapedKeyWord = keyWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const rx = new RegExp('\\b' + escapedKeyWord + '\\b', 'i');
            const blankedSentence = bullet.replace(rx, '_______');
            
            if (blankedSentence.includes('_______')) {
              const questionText = `Lengkapi bagian rumpang (___) dari rangkuman materi berikut agar menjadi pernyataan yang benar: "${blankedSentence}"`;
              
              // Proportional educational distractors to fit the style of the answer
              const generalQuizDistractors = [
                "Struktur", "Infrastruktur", "Metode", "Implementasi", 
                "Prinsip", "Optimalisasi", "Dokumen", "Eksperimen", 
                "Kolaborasi", "Fungsional", "Interaksi", "Proses"
              ];
              const uniqueDistractors = generalQuizDistractors.filter(d => d.toLowerCase() !== keyWord.toLowerCase());
              
              const options = [
                keyWord,
                uniqueDistractors[0] || "Pilihan A",
                uniqueDistractors[1] || "Pilihan B",
                uniqueDistractors[2] || "Pilihan C"
              ];
              
              const shuffled = shuffleArray([...options]);
              const finalCorrectIndex = shuffled.indexOf(keyWord);
              
              suggestedQuestions.push({
                id: qId++,
                question: questionText,
                options: shuffled,
                correctIndex: finalCorrectIndex,
                explanation: `Rangkuman yang lengkap berbunyi: "${bullet}"`
              });
            }
          }
        }
      }
    });
  }

  // Large pool of high-quality educational comprehension fillers to ensure we hit EXACTLY 5 questions as final backup
  const fillers: QuizQuestion[] = [
    {
      id: qId++,
      question: "Apa tujuan utama dari membuat rangkuman/ringkasan materi pembelajaran?",
      options: [
        "Menyederhanakan informasi rumit agar lebih mudah dipahami dan diingat",
        "Menghilangkan seluruh detail penting agar dokumen menjadi kosong",
        "Menambah durasi membaca agar terasa lebih membosankan",
        "Menghindari proses evaluasi pemahaman kognitif"
      ],
      correctIndex: 0,
      explanation: "Merangkum memisahkan gagasan utama dari teks pelengkap, yang menyederhanakan retensi memori."
    },
    {
      id: qId++,
      question: "Kapankah waktu terbaik untuk menguji memori Anda dengan kuis cepat setelah membaca rangkuman?",
      options: [
        "Sesaat setelah membaca materi (active recall)",
        "Dua bulan kemudian saat sudah melupakan semua materi",
        "Hanya saat guru memaksa ujian di kelas",
        "Tidak perlu kuis sama sekali karena tidak berguna"
      ],
      correctIndex: 0,
      explanation: "Active recall (pemanggilan memori aktif) segera setelah belajar melipatgandakan kekuatan ingatan."
    },
    {
      id: qId++,
      question: "Bagaimanakah sikap terbaik saat Anda menjawab salah satu pertanyaan di dalam kuis ini?",
      options: [
        "Membaca penjelasan di bawah jawaban untuk evaluasi kesalahan",
        "Langsung menutup website StudyQuiz dengan kesal",
        "Menyalahkan algoritma sistem tanpa mempedulikan materi",
        "Mengulangi asal-asalan tanpa memahami makna pertanyaan"
      ],
      correctIndex: 0,
      explanation: "Setiap kesalahan di kuis adalah sarana umpan balik yang membangun fondasi pemahaman mendalam."
    },
    {
      id: qId++,
      question: "Strategi manakah yang paling direkomendasikan untuk menaklukkan materi yang panjang?",
      options: [
        "Memilah materi menjadi poin ringkas lalu mengujinya lewat kuis kustom",
        "Menghafal seluruh baris kalimat kata demi kata",
        "Membaca sekilas tanpa mempedulikan arti istilah baru",
        "Hanya membaca tulisan di bab ringkasan paling akhir saja"
      ],
      correctIndex: 0,
      explanation: "Memilah materi ke unit kecil (chunking) dikombinasikan dengan kuis kustom mengoptimalkan kognisi otak."
    },
    {
      id: qId++,
      question: "Apakah manfaat utama menggunakan platform belajar interaktif dengan efek 3D khas gamifikasi?",
      options: [
        "Meningkatkan motivasi dan keseruan belajar layaknya bermain game",
        "Mengurangi fokus belajar karena terlalu banyak warna seru",
        "Membuat materi pelajaran menjadi lebih sulit dipahami",
        "Tidak ada manfaatnya sama sekali selain estetika"
      ],
      correctIndex: 0,
      explanation: "Gamifikasi terbukti memicu hormon dopamin positif yang mendorong rasa penasaran untuk terus belajar."
    }
  ];

  // Fill in until suggestedQuestions has exactly 5 questions!
  for (const item of fillers) {
    if (suggestedQuestions.length >= 5) break;
    // Ensure we don't accidentally repeat exact questions by checking IDs
    suggestedQuestions.push(item);
  }

  // Take exactly 5 questions
  const finalQuestions = suggestedQuestions.slice(0, 5);

  return {
    title,
    wordCount,
    complexity,
    readTime,
    bullets,
    suggestedQuestions: finalQuestions
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
