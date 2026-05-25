/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const MAJOR_QUESTIONS: Record<
  'sistem_informasi' | 'teknik_informatika' | 'bisnis_digital',
  Record<'mudah' | 'sedang' | 'sulit', QuizQuestion[]>
> = {
  sistem_informasi: {
    mudah: [
      {
        id: 1001,
        question: "Apa tujuan utama dari diterapkannya Sistem Informasi di dalam suatu organisasi atau bisnis?",
        options: [
          "Membeli komputer dengan spesifikasi gaming tercanggih",
          "Menghubungkan orang, teknologi, dan proses bisnis untuk mengolah data menjadi informasi bermanfaat",
          "Menggantikan seluruh tenaga kerja manusia dengan robot mekanik",
          "Menghapus seluruh file dokumen fisik tanpa menyimpannya secara digital"
        ],
        correctIndex: 1,
        explanation: "Sistem Informasi menggabungkan aspek manusia (people), alur kerja (process), dan teknologi (technology) untuk mengelola data agar bernilai strategis bagi organisasi.",
        difficulty: 'mudah'
      },
      {
        id: 1002,
        question: "Diagram manakah yang paling sering digunakan untuk menggambarkan alur aktivitas proses bisnis secara berurutan?",
        options: [
          "Bar Chart (Diagram Batang)",
          "Flowchart (Diagram Alir)",
          "Pie Chart (Diagram Lingkaran)",
          "Scatter Plot (Diagram Sebar)"
        ],
        correctIndex: 1,
        explanation: "Flowchart merupakan diagram grafis yang sangat populer untuk merepresentasikan setiap langkah dalam alur kerja atau proses bisnis suatu sistem.",
        difficulty: 'mudah'
      },
      {
        id: 1003,
        question: "Bila kita berbicara tentang 'Enterprise Resource Planning' (ERP), apakah fungsi utamanya bagi korporasi?",
        options: [
          "Untuk memonitor suhu ruangan server secara otomatis",
          "Menyatukan berbagai fungsi bisnis seperti keuangan, SDM, dan logistik ke dalam satu sistem terintegrasi",
          "Melakukan pertahanan dari serangan virus Ransomware saja",
          "Membuat desain grafis untuk keperluan konten media sosial perusahaan"
        ],
        correctIndex: 1,
        explanation: "ERP berfungsi mengintegrasikan berbagai proses bisnis inti perusahaan ke dalam satu database terpusat demi efisiensi operasional.",
        difficulty: 'mudah'
      },
      {
        id: 1004,
        question: "Siapakah aktor utama dalam sistem informasi yang merumuskan kebutuhan bisnis dan mendesain solusi sistem?",
        options: [
          "Database Administrator",
          "System Analyst (Analis Sistem)",
          "Hardware Technician",
          "Network Security Engineer"
        ],
        correctIndex: 1,
        explanation: "System Analyst bertindak sebagai jembatan yang menganalisis kebutuhan bisnis, menerjemahkannya ke spesifikasi teknis, dan merancang solusi sistem informasi.",
        difficulty: 'mudah'
      }
    ],
    sedang: [
      {
        id: 1011,
        question: "Di dalam pemodelan data Sistem Informasi, relasi antara tabel 'Mahasiswa' dan 'Mata Kuliah' umumnya memiliki kardinalitas...",
        options: [
          "One-to-One (Satu ke Satu)",
          "One-to-Many (Satu ke Banyak)",
          "Many-to-Many (Banyak ke Banyak)",
          "Zero-to-One (Nol ke Satu)"
        ],
        correctIndex: 2,
        explanation: "Satu mahasiswa dapat mengambil banyak mata kuliah, dan satu mata kuliah dapat diambil oleh banyak mahasiswa. Relasi ini disebut Many-to-Many dan dipecah lewat tabel penengah (junction table).",
        difficulty: 'sedang'
      },
      {
        id: 1012,
        question: "Manakah dari metrik berikut yang merujuk pada pemulihan bencana di mana waktu maksimal toleransi kehilangan data diatur?",
        options: [
          "RTO (Recovery Time Objective)",
          "RPO (Recovery Point Objective)",
          "SLA (Service Level Agreement)",
          "KPI (Key Performance Indicator)"
        ],
        correctIndex: 1,
        explanation: "RPO (Recovery Point Objective) menetapkan batas toleransi kehilangan data dalam satuan waktu (misal: data hilang maksimal 2 jam terakhir sebelum sistem bermasalah).",
        difficulty: 'sedang'
      },
      {
        id: 1013,
        question: "Apakah peran krusial dari Data Warehouse dalam kerangka Business Intelligence sistem informasi perusahaan?",
        options: [
          "Sebagai server penyimpanan file backup game karyawan",
          "Sebagai gudang data yang didesain khusus untuk analisis query cepat dan pembuatan laporan eksekutif",
          "Menghubungkan printer komputer di seluruh area kantor",
          "Sebagai website front-end publik interaktif"
        ],
        correctIndex: 1,
        explanation: "Data Warehouse mengonsolidasikan data dari berbagai sistem operasional operasional untuk dianalisis guna mendukung pengambilan keputusan manajemen (Business Intelligence).",
        difficulty: 'sedang'
      },
      {
        id: 1014,
        question: "Tahapan pertama yang wajib dilakukan saat merancang sistem informasi berdasarkan metode SDLC adalah...",
        options: [
          "Menulis kode program (Coding)",
          "Melakukan pengujian sistem (Testing)",
          "Analisis dan Perencanaan Kebutuhan (Planning & Analysis)",
          "Penerapan sistem langsung ke produksi (Deployment)"
        ],
        correctIndex: 2,
        explanation: "Tanpa analisis dan perencanaan kebutuhan yang matang, sistem informasi yang dibangun berisiko gagal memenuhi tujuan strategis pengguna.",
        difficulty: 'sedang'
      }
    ],
    sulit: [
      {
        id: 1021,
        question: "Framework manakah yang fokus pada tata kelola teknologi informasi (IT Governance) dan penyelarasan tujuan TI dengan arah strategis bisnis perusahaan?",
        options: [
          "React Native Framework",
          "COBIT (Control Objectives for Information and Related Technologies)",
          "Scrum Agile Framework",
          "Laravel framework"
        ],
        correctIndex: 1,
        explanation: "COBIT adalah kerangka kerja tata kelola TI global tingkat lanjut yang membantu organisasi menyelaraskan keputusan TI mereka dengan sasaran bisnis secara patuh dan aman.",
        difficulty: 'sulit'
      },
      {
        id: 1022,
        question: "Dalam rekayasa sistem informasi, apa yang membedakan proses ETL (Extract-Transform-Load) dengan ELT (Extract-Load-Transform) pada skema modern cloud data lakes?",
        options: [
          "ELT tidak memerlukan proses transformasi data sama sekali",
          "ELT memindahkan data mentah ke tujuannya terlebih dahulu sebelum ditransformasikan menggunakan kekuatan komputasi cloud target",
          "ETL hanya bisa digunakan untuk menyimpan file gambar instan",
          "ELT membutuhkan kabel fiber optik fisik yang berbeda dari ETL"
        ],
        correctIndex: 1,
        explanation: "Dalam ELT, transformasi data dilakukan langsung di atas infrastruktur target (seperti cloud data warehouse) menggunakan skalabilitas tinggi database modern, menghemat waktu pemrosesan di server perantara.",
        difficulty: 'sulit'
      },
      {
        id: 1023,
        question: "Di dalam siklus pengembangan sistem Agile, apakah peran utama seorang Product Owner?",
        options: [
          "Menulis baris kode backend API dari awal",
          "Memaksimalkan nilai bisnis produk dengan mengelola, mengurutkan, dan mendefinisikan Product Backlog",
          "Menginstal sistem operasi Linux di server staging",
          "Mengganti router nirkabel yang mendefinisikan jaringan kantor"
        ],
        correctIndex: 1,
        explanation: "Product Owner bertugas memastikan nilai terbaik tersampaikan melalui pengelolaan prioritas kebutuhan item (Product Backlog) agar sejalan dengan kebutuhan pasar/pengguna.",
        difficulty: 'sulit'
      },
      {
        id: 1024,
        question: "Apakah kepanjangan dari OLAP dan kegunaannya dibanding OLTP dalam sistem informasi basis data perusahaan?",
        options: [
          "Online Language Analytics Platform; untuk menerjemahkan bahasa pemrograman",
          "Online Analytical Processing; dirancang untuk analisis data multidimensi yang kompleks dan agregat besar",
          "Operational Logic and Programming; untuk menulis algoritma AI dasar",
          "Offline Analysis Protocol; sebagai sistem transmisi pesan terenkripsi"
        ],
        correctIndex: 1,
        explanation: "OLAP (Online Analytical Processing) dikhususkan untuk kueri pelaporan analitis yang sangat berat, terpisah dari sistem transaksi harian OLTP (Online Transaction Processing) agar performa keduanya tetap unggul.",
        difficulty: 'sulit'
      }
    ]
  },
  teknik_informatika: {
    mudah: [
      {
        id: 2001,
        question: "Struktur data manakah yang bekerja berdasarkan prinsip dasar LIFO (Last In First Out), di mana data terakhir yang masuk akan keluar pertama?",
        options: [
          "Queue (Antrian)",
          "Tree (Pohon keputusan)",
          "Stack (Tumpukan)",
          "Graph (Grafik hubungan)"
        ],
        correctIndex: 2,
        explanation: "Stack menggunakan prinsip LIFO. Contoh nyatanya adalah tumpukan piring atau riwayat navigasi tombol 'Undo' pada perangkat lunak.",
        difficulty: 'mudah'
      },
      {
        id: 2002,
        question: "Bahasa pemrograman manakah yang berjalan secara terintegrasi secara bawaan (native) di dalam browser web klien?",
        options: [
          "Python",
          "C++",
          "Java",
          "JavaScript"
        ],
        correctIndex: 3,
        explanation: "Hanya JavaScript (bersama HTML & CSS) yang dieksekusi secara native langsung oleh engine browser internet tanpa kompilasi eksternal.",
        difficulty: 'mudah'
      },
      {
        id: 2003,
        question: "Apa kepanjangan resmi dari istilah HTML yang digunakan untuk menyusun kerangka sebuah website?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modular Language",
          "Hybrid Text Making Logger",
          "Home Tool Management Layout"
        ],
        correctIndex: 0,
        explanation: "HTML (Hyper Text Markup Language) adalah standar bahasa markah yang digunakan untuk mendefinisikan struktur konten pada sebuah halaman web.",
        difficulty: 'mudah'
      },
      {
        id: 2004,
        question: "Sistem bilangan biner yang digunakan oleh mesin komputer digital hanya terdiri dari dua angka, yaitu...",
        options: [
          "Angka 1 dan 2",
          "Angka -1 dan +1",
          "Angka 0 dan 1",
          "Angka A dan B"
        ],
        correctIndex: 2,
        explanation: "Sistem bilangan biner berbasis 2 menggunakan simbol 0 (low/off) dan 1 (high/on) untuk mewakili keadaan sirkuit elektronik.",
        difficulty: 'mudah'
      }
    ],
    sedang: [
      {
        id: 2011,
        question: "Berapakah kompleksitas waktu rata-rata (Time Complexity) dari algoritma Binary Search jika data sudah terurut?",
        options: [
          "O(n)",
          "O(n²)",
          "O(log n)",
          "O(1)"
        ],
        correctIndex: 2,
        explanation: "Binary Search membagi wilayah pencarian menjadi dua bagian secara berulang, sehingga menghasilkan efisiensi waktu logaritmik O(log n).",
        difficulty: 'sedang'
      },
      {
        id: 2012,
        question: "Di dalam rekayasa jaringan, apakah fungsi mendasar dari DNS (Domain Name System)?",
        options: [
          "Mengubah tegangan listrik AC menjadi DC untuk modem",
          "Menerjemahkan nama domain manusia (seperti google.com) menjadi alamat IP mesin",
          "Menyaring virus trojan saat men-download file musik",
          "Menyambungkan kabel LAN yang putus"
        ],
        correctIndex: 1,
        explanation: "DNS bertindak seperti buku telepon internet yang memetakan nama domain ramah pengguna ke alamat IP numerik komputer server.",
        difficulty: 'sedang'
      },
      {
        id: 2013,
        question: "Manakah di bawah ini yang merupakan database non-relasional (NoSQL) yang menyimpan data dalam format dokumen mirip JSON?",
        options: [
          "MySQL",
          "MongoDB",
          "PostgreSQL",
          "Oracle Database"
        ],
        correctIndex: 1,
        explanation: "MongoDB adalah database NoSQL berbasis dokumen terpopuler yang mengadopsi format penyimpanan fleksibel skema bernama BSON (Binary JSON).",
        difficulty: 'sedang'
      },
      {
        id: 2014,
        question: "Dalam pemrograman, teknik memanggil fungsi itu sendiri di dalam badannya sendiri disebut...",
        options: [
          "Inheritance (Pewarisan)",
          "Polymorphism (Polimorfisme)",
          "Recursion (Rekursi)",
          "Encapsulation (Enkapsulasi)"
        ],
        correctIndex: 2,
        explanation: "Rekursi adalah konsep di mana fungsi memanggil dirinya sendiri untuk menyelesaikan masalah dengan memecahnya ke sub-kondisi yang lebih kecil (dilengkapi base case agar tidak infinite loop).",
        difficulty: 'sedang'
      }
    ],
    sulit: [
      {
        id: 2021,
        question: "Dalam manajemen memori sistem operasi, kondisi 'Deadlock' dapat didefinisikan sebagai...",
        options: [
          "Kondisi ketika baterai laptop terkuras habis total saat boot up",
          "Keadaan di mana dua proses atau lebih saling menunggu sumber daya yang dipegang proses lain sehingga terhenti selamanya",
          "Kondisi hard disk penuh karena virus eksternal",
          "Saat kabel daya server terputus secara tiba-tiba"
        ],
        correctIndex: 1,
        explanation: "Deadlock terjadi akibat perebutan resource berkelompok di mana setiap pihak memegang resource dan menunggu resource lain yang sedang dikunci anggota lain secara melingkar (Circular Wait).",
        difficulty: 'sulit'
      },
      {
        id: 2022,
        question: "Kriptografi kunci asimetris menggunakan sepasang kunci berbeda untuk enkripsi dan dekripsi data, pasangan kunci tersebut bernama...",
        options: [
          "Master Key dan Slave Key",
          "Public Key (Kunci Publik) dan Private Key (Kunci Privat)",
          "Symmetric Key dan Asymmetric Key",
          "Hash Key dan Index Key"
        ],
        correctIndex: 1,
        explanation: "Dalam kunci asimetris, Public Key dipakai siapa saja untuk mengenkripsi data kiriman, namun hanya pemilik berwenang dengan Private Key yang dapat mendekripsinya kembali.",
        difficulty: 'sulit'
      },
      {
        id: 2023,
        question: "Algoritma sorting manakah yang menggunakan pendekatan 'Divide and Conquer' dengan cara memecah daftar menjadi elemen tunggal lalu menggabungkannya kembali dalam urutan rapi?",
        options: [
          "Bubble Sort",
          "Selection Sort",
          "Merge Sort",
          "Insertion Sort"
        ],
        correctIndex: 2,
        explanation: "Merge Sort adalah algoritma sorting berkinerja tinggi yang memecah array secara rekursif menjadi bagian-bagian berukuran satu, kemudian menggabungkannya dengan perbandingan berurut (O(n log n)).",
        difficulty: 'sulit'
      },
      {
        id: 2024,
        question: "Apakah peran dari pilar abstraksi (Abstraction) pada konsep Pemrograman Berorientasi Objek (OOP)?",
        options: [
          "Menyembunyikan detail implementasi kompleks dari pengguna dan hanya menampilkan fungsi penting saja",
          "Membolehkan sub-materi kelas untuk mencuri fungsi kelas induk tanpa batas",
          "Mempercepat load-time aplikasi dengan mengurangi ukuran kode",
          "Menjalankan instruksi secara paralel lewat core CPU yang berbeda"
        ],
        correctIndex: 0,
        explanation: "Abstraksi menyederhanakan interaksi antarmuka dengan menyembunyikan logika operasional rumit di baliknya menggunakan interface atau kelas abstrak.",
        difficulty: 'sulit'
      }
    ]
  },
  bisnis_digital: {
    mudah: [
      {
        id: 3001,
        question: "Rantai transaksi jual beli online yang mempertemukan konsumen individu dengan penjual individu sesama konsumen disebut model...",
        options: [
          "B2B (Business to Business)",
          "B2C (Business to Consumer)",
          "C2C (Consumer to Consumer)",
          "G2C (Government to Citizen)"
        ],
        correctIndex: 2,
        explanation: "C2C terjadi ketika konsumen menjual aset atau barang langsung ke sesama konsumen lainnya, contoh lazimnya adalah marketplace barang bekas.",
        difficulty: 'mudah'
      },
      {
        id: 3002,
        question: "Metode pemasaran organik yang fokus untuk meningkatkan peringkat dan keterbacaan website di mesin pencari Google disebut...",
        options: [
          "SMM (Social Media Marketing)",
          "SEO (Search Engine Optimization)",
          "CTR (Click Through Rate)",
          "Affiliate Marketing"
        ],
        correctIndex: 1,
        explanation: "SEO bertujuan mematangkan konten, kecepatan, dan link website agar ramah algoritma Google secara cuma-cuma (organik) demi mendatangkan trafik.",
        difficulty: 'mudah'
      },
      {
        id: 3003,
        question: "Merek dagang atau brand yang beroperasi murni secara digital tanpa memiliki toko fisik sama sekali sering disebut dengan istilah...",
        options: [
          "Brick and Mortar Brand",
          "Digital-First or Direct-to-Consumer (D2C) Digital",
          "Franchise Tradisional",
          "Koperasi Konvensional"
        ],
        correctIndex: 1,
        explanation: "D2C Digital atau brand murni online memotong jalur distributor konvensional dan menjual langsung melalui platform komersial digital modern.",
        difficulty: 'mudah'
      },
      {
        id: 3004,
        question: "Apakah singkatan dari dompet digital pintar yang memungkinkan pengguna bertransaksi dan menyimpan dana melalui smartphone?",
        options: [
          "E-Book",
          "E-Wallet",
          "E-Mail",
          "E-Learning"
        ],
        correctIndex: 1,
        explanation: "E-wallet (Electronic Wallet/Dompet Digital) adalah sarana modern untuk menyimpan dana elektronik secara aman guna transaksi nontunai jarak dekat atau jauh.",
        difficulty: 'mudah'
      }
    ],
    sedang: [
      {
        id: 3011,
        question: "Metrik KPI 'Conversion Rate' dalam kampanye bisnis digital e-commerce diukur lewat...",
        options: [
          "Persentase pengunjung website yang akhirnya melakukan tindakan pembelian atau aksi yang ditargetkan",
          "Jumlah server cloud yang dibeli dari provider luar negeri",
          "Koneksi internet yang stabil di kantor operasional",
          "Kecepatan loading website saat pertama kali diuji coba"
        ],
        correctIndex: 0,
        explanation: "Conversion Rate menghitung seberapa berhasil website mengubah pembaca/pengunjung biasa menjadi pembeli berbayar (conversional action).",
        difficulty: 'sedang'
      },
      {
        id: 3012,
        question: "Apakah yang dimaksud dengan 'Customer Acquisition Cost' (CAC) di dalam evaluasi bisnis startup digital?",
        options: [
          "Total biaya menggaji analis data bulanan",
          "Rata-rata biaya pemasaran dan penjualan yang dihabiskan untuk berhasil mendatangkan satu pelanggan baru",
          "Denda pajak tahunan dari instansi regulasi publik",
          "Harga beli unit komputer baru untuk divisi pemasaran"
        ],
        correctIndex: 1,
        explanation: "CAC berguna menentukan efisiensi dana marketing perusahaan. Rumusnya: total biaya sales & marketing dalam periode tertentu dibagi jumlah user baru yang diraih.",
        difficulty: 'sedang'
      },
      {
        id: 3013,
        question: "Model bisnis di mana pengguna membayar biaya berlangganan berkala (bulanan/tahunan) untuk menikmati akses penuh materi disebut...",
        options: [
          "Freemium Model",
          "Subscription Model (SaaS/Keanggotaan)",
          "Dropship Model",
          "Marketplace Commission Model"
        ],
        correctIndex: 1,
        explanation: "Subscription Model memberikan kepastian arus kas berkala bagi startup digital dengan membebankan biaya periodik kepada penggunanya.",
        difficulty: 'sedang'
      },
      {
        id: 3014,
        question: "Di dalam ekosistem digital marketing, apakah kegunaan dari 'Retargeting' / 'Remarketing'?",
        options: [
          "Mengganti seluruh nama produk bisnis digital secara mendadak",
          "Menyajikan iklan khusus ke audiens yang sebelumnya sudah pernah berinteraksi atau mengunjungi website kita",
          "Mematikan iklan ke target pasar potensial",
          "Mengirim email penawaran secara acak tanpa sistem klasifikasi"
        ],
        correctIndex: 1,
        explanation: "Remarketing sangat berdaya konversi tinggi karena menargetkan kembali konsumen hangat (warm audience) yang sudah menunjukkan ketertarikan awal pada produk kita.",
        difficulty: 'sedang'
      }
    ],
    sulit: [
      {
        id: 3021,
        question: "Di dalam pertumbuhan bisnis modern, rasio LTV dibanding CAC (LTV:CAC Ratio) yang dinilai sehat dan ideal bagi startup digital umumnya bernilai...",
        options: [
          "Kurang dari 1:1 (LTV lebih kecil dari CAC)",
          "Minimal 3:1 (Nilai hidup pelanggan 3 kali lipat biaya penarikannya)",
          "Sama dengan 0 (Nol)",
          "Wajib selalu minus agar terhindar dari pajak tinggi"
        ],
        correctIndex: 1,
        explanation: "Metrik LTV:CAC di atas atau setara 3:1 membuktikan model ekonomi unit startup Anda menguntungkan dan bertumbuh berkelanjutan dalam jangka panjang.",
        difficulty: 'sulit'
      },
      {
        id: 3022,
        question: "Apa tujuan dilakukannya analisis 'A/B Testing' saat merilis alur checkout baru pada sistem e-commerce?",
        options: [
          "Untuk menghancurkan database lama jika sistem baru berjalan lancar",
          "Membandingkan dampak varian desain A dan B secara kuantitatif terhadap konversi pengguna secara acak",
          "Membagi kapasitas hard disk server menjadi dua ruang terpisah",
          "Agar user bisa mengetik password mereka dua kali lipat lebih aman"
        ],
        correctIndex: 1,
        explanation: "A/B Testing menggunakan kelompok uji acak yang fair untuk menentukan secara ilmiah varian alur desain visual mana yang mencetak performa transaksi terunggul.",
        difficulty: 'sulit'
      },
      {
        id: 3023,
        question: "Konsep pemasaran digital 'Growth Hacking' dipelopori oleh Sean Ellis, manakah karakteristik utama dari disiplin ilmu ini?",
        options: [
          "Sistem pembobolan server internal kompetitor untuk mencuri pelanggan",
          "Kombinasi taktis antara analisis data, produk kreatif, dan uji coba hemat biaya berulang-ulang untuk akuisisi kilat",
          "Membeli followers media sosial palsu dengan bot murah",
          "Menaikkan harga jual produk setinggi-tingginya tanpa pemberitahuan"
        ],
        correctIndex: 1,
        explanation: "Growth Hacking berfokus pada eksperimentasi cepat pada saluran pemasaran berkelanjutan dengan mengedepankan kreativitas fungsionalitas produk daripada anggaran iklan berbayar yang raksasa.",
        difficulty: 'sulit'
      },
      {
        id: 3024,
        question: "Istilah 'Freemium' dalam model monetisasi aplikasi digital menggambarkan perpaduan dari...",
        options: [
          "Aplikasi bebas biaya (Free) dengan upgrade berbayar (Premium) untuk fitur tingkat lanjut",
          "Kombinasi sistem kredit fisik dengan hadiah logam mulia",
          "Pembayaran biaya transfer khusus untuk pelanggan premium saja",
          "Unduhan berbayar premium di awal dengan dukungan gratis selamanya"
        ],
        correctIndex: 0,
        explanation: "Freemium merupakan magnet penarik pengguna yang luar biasa, membolehkan sebagian besar user mengakses layanan dasar secara gratis sambil menyaring segmentasi bernilai tinggi untuk langganan Premium.",
        difficulty: 'sulit'
      }
    ]
  }
};
