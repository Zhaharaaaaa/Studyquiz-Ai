/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const STATIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Siapakah tokoh yang dikenal sebagai pencipta sistem operasi Linux?",
    options: [
      "Bill Gates (Microsoft)",
      "Linus Torvalds (Finlandia)",
      "Steve Jobs (Apple)",
      "Guido van Rossum (Python)"
    ],
    correctIndex: 1,
    explanation: "Linus Torvalds mengembangkan kernel Linux pada tahun 1991 sebagai hobi ketika berkuliah di Universitas Helsinki."
  },
  {
    id: 2,
    question: "Protokol manakah yang berfungsi untuk mengenkripsi pengiriman halaman web agar aman?",
    options: [
      "HTTP (Hypertext Transfer Protocol)",
      "FTP (File Transfer Protocol)",
      "HTTPS (HTTP Secure)",
      "SMTP (Simple Mail Transfer Protocol)"
    ],
    correctIndex: 2,
    explanation: "HTTPS mengamankan komunikasi dengan enkripsi SSL/TLS agar data sensitif pengguna terlindungi dari peretasan."
  },
  {
    id: 3,
    question: "Apa kepanjangan resmi dari istilah HTML dalam dunia pengembangan web?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Management Language",
      "Home Tool Markup Language"
    ],
    correctIndex: 0,
    explanation: "HTML (Hyper Text Markup Language) adalah bahasa standard dunia untuk menyusun struktur dasar halaman web."
  },
  {
    id: 4,
    question: "Bahasa pemrograman tingkat tinggi yang paling populer dan berjalan secara native di dalam browser web adalah...",
    options: [
      "Python",
      "Rust",
      "Java",
      "JavaScript"
    ],
    correctIndex: 3,
    explanation: "JavaScript memiliki engine khusus di semua browser utama modern, memungkinkannya mengontrol perilaku interaktif halaman web."
  },
  {
    id: 5,
    question: "Manakah di bawah ini yang merupakan database berbasis dokumen NoSQL (Bukan Relasional)?",
    options: [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "Oracle DB"
    ],
    correctIndex: 1,
    explanation: "MongoDB menyimpan dokumen dalam format mirip JSON (BSON), sangat fleksibel dibandingkan database SQL tabular."
  }
];
