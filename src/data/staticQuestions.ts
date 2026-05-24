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
      "Bill Gates",
      "Linus Torvalds",
      "Steve Jobs",
      "Guido van Rossum"
    ],
    correctIndex: 1,
    explanation: "Linus Torvalds mengembangkan kernel Linux pada tahun 1991 sebagai hobi ketika berkuliah di Universitas Helsinki.",
    difficulty: 'mudah'
  },
  {
    id: 2,
    question: "Protokol manakah yang berfungsi untuk mengenkripsi pengiriman halaman web agar aman?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ],
    correctIndex: 2,
    explanation: "HTTPS mengamankan komunikasi dengan enkripsi SSL/TLS agar data sensitif pengguna terlindungi dari peretasan.",
    difficulty: 'sedang'
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
    explanation: "HTML (Hyper Text Markup Language) adalah bahasa standard dunia untuk menyusun struktur dasar halaman web.",
    difficulty: 'mudah'
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
    explanation: "JavaScript memiliki engine khusus di semua browser utama modern, memungkinkannya mengontrol perilaku interaktif halaman web.",
    difficulty: 'mudah'
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
    explanation: "MongoDB menyimpan dokumen dalam format mirip JSON (BSON), sangat fleksibel dibandingkan database SQL tabular.",
    difficulty: 'sedang'
  },
  {
    id: 6,
    question: "Apakah fungsi utama dari alamat IP (Internet Protocol Address) pada jaringan komputer?",
    options: [
      "Sebagai media penyimpanan basis data digital",
      "Sebagai identitas unik pengenal perangkat dalam jaringan",
      "Untuk mempercepat loading halaman grafis",
      "Mencegah serangan virus di memori komputer"
    ],
    correctIndex: 1,
    explanation: "Alamat IP bertindak sebagai kartu identitas digital unik bagi setiap perangkat agar dapat berkomunikasi satu sama lain melalui internet.",
    difficulty: 'sedang'
  },
  {
    id: 7,
    question: "Manakah dari teknologi berikut yang digunakan untuk mendistribusikan beban lalu lintas jaringan komputer ke beberapa server?",
    options: [
      "Load Balancer",
      "DHCP Server",
      "Proxy Server",
      "File Transfer Protocol"
    ],
    correctIndex: 0,
    explanation: "Load Balancer berfungsi menyebarkan beban trafik komputasi ke beberapa server agar sistem tidak kelebihan beban dan tetap responsif.",
    difficulty: 'sulit'
  },
  {
    id: 8,
    question: "Layanan cloud computing yang menyediakan infrastruktur seperti server virtual dan penyimpanan disebut...",
    options: [
      "SaaS (Software as a Service)",
      "PaaS (Platform as a Service)",
      "IaaS (Infrastructure as a Service)",
      "DaaS (Database as a Service)"
    ],
    correctIndex: 2,
    explanation: "IaaS (Infrastructure as a Service) menyediakan resource komputasi mentah seperti virtual machine, server, jaringan, dan storage.",
    difficulty: 'sulit'
  },
  {
    id: 9,
    question: "Sistem penyimpanan kontrol versi (Version Control System) yang paling banyak digunakan developer di dunia saat ini adalah...",
    options: [
      "FTP",
      "Docker",
      "Kubernetes",
      "Git"
    ],
    correctIndex: 3,
    explanation: "Git diciptakan oleh Linus Torvalds untuk kolaborasi penulisan source code dan melacak riwayat perubahan file secara efisien.",
    difficulty: 'sulit'
  },
  {
    id: 10,
    question: "Apakah yang dimaksud dengan istilah 'Responsive Design' pada pembuatan website?",
    options: [
      "Desain web yang bisa membalas chat secara otomatis",
      "Desain web yang dapat menyesuaikan tata letak di berbagai ukuran layar",
      "Website yang memiliki kecepatan memuat halaman di bawah 1 detik",
      "Desain website yang memiliki warna kontras tinggi khusus malam hari"
    ],
    correctIndex: 1,
    explanation: "Responsive web design memastikan tampilan website tetap rapi, proporsional, dan mudah dibaca baik di layar HP, tablet, maupun monitor PC desktop.",
    difficulty: 'sedang'
  },
  {
    id: 11,
    question: "Teknologi CSS framework populer yang menggunakan utility-first classes untuk mempercepat styling halaman web adalah...",
    options: [
      "Bootstrap",
      "Tailwind CSS",
      "Sass",
      "Material UI"
    ],
    correctIndex: 1,
    explanation: "Tailwind CSS menggunakan kelas utilitas yang sangat hemat waktu untuk merancang visual modern langsung pada file HTML/JSX.",
    difficulty: 'sedang'
  },
  {
    id: 12,
    question: "Di bawah ini, manakah yang merupakan port standar yang digunakan oleh protokol HTTPS?",
    options: [
      "Port 80",
      "Port 21",
      "Port 443",
      "Port 3000"
    ],
    correctIndex: 2,
    explanation: "Protokol HTTP biasa menggunakan Port 80, sedangkan protokol aman HTTPS menggunakan default Port 443.",
    difficulty: 'sulit'
  },
  {
    id: 13,
    question: "Komponen hardware utama pada komputer yang sering dijuluki sebagai 'otak' pemrosesan data adalah...",
    options: [
      "RAM (Random Access Memory)",
      "Motherboard",
      "Hard Disk Drive",
      "CPU (Central Processing Unit)"
    ],
    correctIndex: 3,
    explanation: "CPU bertugas mengeksekusi instruksi program, melakukan operasi aritmatika, logika, dan mengontrol komponen lainnya.",
    difficulty: 'mudah'
  },
  {
    id: 14,
    question: "Pilar Pemrograman Berorientasi Objek (OOP) yang bertugas menyatukan data dan fungsi ke dalam kelas terlindungi adalah...",
    options: [
      "Inheritance (Pewarisan)",
      "Encapsulation (Enkapsulasi)",
      "Polymorphism (Polimorfisme)",
      "Abstraction (Abstraksi)"
    ],
    correctIndex: 1,
    explanation: "Encapsulation (enkapsulasi) menyembunyikan detail internal objek dan membatasi akses langsung dari luar demi keamanan struktur kode.",
    difficulty: 'sulit'
  },
  {
    id: 15,
    question: "Jenis memori komputer yang bersifat volatile (data hilang saat komputer dimatikan) dan digunakan untuk penyimpanan sementara saat aplikasi berjalan adalah...",
    options: [
      "Hard Disk",
      "ROM (Read Only Memory)",
      "SSD (Solid State Drive)",
      "RAM (Random Access Memory)"
    ],
    correctIndex: 3,
    explanation: "RAM bertindak sebagai tempat penyimpanan jangka pendek super cepat untuk membantu sistem operasi dan software yang sedang aktif.",
    difficulty: 'mudah'
  }
];
