import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import mammoth from "mammoth";
import officeParser from "officeparser";

// @ts-ignore
import { PdfReader } from "pdfreader";

// Helper promise wrapper to extract text from a PDF Buffer with pdfreader
function extractPdfTextFromBuffer(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    let textResult = "";
    new PdfReader().parseBuffer(buffer, (err: any, item: any) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(textResult.trim());
      } else if (item.text) {
        textResult += item.text + " ";
      }
    });
  });
}

const app = express();
const PORT = 3000;

// Increase JSON and URL-encoded limits to handle larger documents/presentations
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Lazy initializer for Google GenAI SDK as recommended
let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to enable real AI summarization.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Helper function to clean and organize extracted text from files
function cleanExtractedText(raw: string): string {
  if (!raw) return "";
  const lines = raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map(line => line.trim());
  
  const cleaned: string[] = [];
  let emptyCount = 0;
  for (const line of lines) {
    if (line === "") {
      emptyCount++;
      if (emptyCount === 1) {
        cleaned.push("");
      }
    } else {
      emptyCount = 0;
      cleaned.push(line);
    }
  }
  return cleaned.join("\n").trim();
}

// REST API endpoint to extract text and summarize using Gemini AI
app.post("/api/summarize", async (req, res) => {
  try {
    let text = "";
    const { fileName, mimeType, base64Data, text: rawText } = req.body;

    if (rawText) {
      // Use direct copy-paste text
      text = rawText;
    } else if (base64Data) {
      // Parse file from base64
      const buffer = Buffer.from(base64Data, "base64");
      const ext = fileName ? fileName.split(".").pop()?.toLowerCase() : "";

      if (ext === "txt" || mimeType === "text/plain") {
        text = buffer.toString("utf-8");
      } else if (ext === "pdf" || mimeType === "application/pdf") {
        try {
          text = await extractPdfTextFromBuffer(buffer);
        } catch (pdfErr: any) {
          console.error("PDF parsing error:", pdfErr);
          throw new Error(`Gagal mengekstrak teks dari berkas PDF: ${pdfErr.message}`);
        }
      } else if (ext === "docx" || ext === "doc" || mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        try {
          const parsed = await mammoth.extractRawText({ buffer });
          text = parsed.value;
        } catch (docxErr: any) {
          console.error("DOCX parsing error:", docxErr);
          throw new Error(`Gagal mengekstrak teks dari berkas Word: ${docxErr.message}`);
        }
      } else if (ext === "pptx" || ext === "ppt" || mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
        try {
          text = await new Promise<string>((resolve, reject) => {
            officeParser.parseOffice(buffer, (data: any, err: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        } catch (pptxErr: any) {
          console.error("PPTX parsing error:", pptxErr);
          throw new Error(`Gagal mengekstrak teks dari berkas PowerPoint: ${pptxErr.message || pptxErr}`);
        }
      } else {
        throw new Error(`Format berkas tidak didukung (${ext || mimeType}). Gunakan berkas PDF, Word, PPT, atau TXT.`);
      }
    } else {
      return res.status(400).json({ error: "Silakan masukkan teks atau unggah berkas PDF/Word/PPT/TXT." });
    }

    const trimmedText = cleanExtractedText(text);
    if (!trimmedText || trimmedText.length < 5) {
      return res.status(400).json({ error: "Tidak dapat mengekstrak teks yang cukup dari dokumen ini. Pastikan dokumen berisi teks tulisan asli yang bisa dibaca." });
    }

    // Process using Gemini 3.5 Flash for high-quality summarization
    const ai = getGeminiAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Berikut adalah materi pembelajaran yang perlu dirangkum dan diujikan lewat kuis. Tolong baca dengan seksama dan buat rangkuman interaktif beserta kuis yang seru.

MATERI PEMBELAJARAN:
${trimmedText}
`,
      config: {
        systemInstruction: "Anda adalah asisten pendidikan pintar bernama Guru Quizo (seekor rubah bijak). Tugas Anda adalah membuat rangkuman materi yang sangat komprehensif, mendalam, dan terstruktur dengan rapi dalam Bahasa Indonesia yang asyik, mendidik, serta membuat kuis interaktif berisi TEPAT 5 pertanyaan pilihan ganda guna melatih kemampuan kognitif dan analisis kritis siswa secara interaktif.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Judul kreatif dan singkat mengenai materi yang dirangkum. Maksimal 5-6 kata dalam Bahasa Indonesia.",
            },
            complexity: {
              type: Type.STRING,
              description: "Tingkat kerumitan materi: Harus di antara 'Mudah', 'Sedang', atau 'Tinggi'.",
            },
            bullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Daftar 6 sampai 8 butir rangkuman materi yang sangat komprehensif, mendalam, dan informatif dalam Bahasa Indonesia. Setiap butir HARUS berupa penjelasan padat-isi (2 hingga 4 kalimat detail yang meringkas teori, data, kegunaan, atau penjelasan ilmiah dari konsep tersebut, jangan disingkat terlalu pendek). Mulailah setiap butir dengan emoji yang relevan diikuti dengan kata kunci utama yang ditebalkan dengan format Markdown ganda, contoh: '📌 **Faktor Pemicu**: [Penjelasan mendalam]'.",
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              description: "Sajikan tepat 5 pertanyaan kuis pilihan ganda interaktif dari materi.",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "Pertanyaan pemahaman materi yang menarik dalam Bahasa Indonesia.",
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Tepat 4 buah opsi pilihan jawaban (A, B, C, D).",
                  },
                  correctIndex: {
                    type: Type.INTEGER,
                    description: "Index (0, 1, 2, atau 3) yang merujuk pada opsi jawaban yang benar.",
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "Penjelasan edukatif yang rinci dan seru mengapa opsi tersebut adalah jawaban yang tepat.",
                  },
                },
                required: ["question", "options", "correctIndex", "explanation"],
              },
            },
          },
          required: ["title", "complexity", "bullets", "suggestedQuestions"],
        },
      },
    });

    const geminiText = response.text;
    if (!geminiText) {
      throw new Error("Gagal memperoleh respon rangkuman dari Gemini AI.");
    }

    const parsedResponse = JSON.parse(geminiText.trim());
    const wordCount = trimmedText.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 150));
    const readTime = `± ${minutes} menit`;

    // Final response integrating extracted statistics and Gemini summary
    const finalResult = {
      title: parsedResponse.title || `Topik: ${fileName || "Material Baru"}`,
      wordCount,
      complexity: parsedResponse.complexity || "Sedang",
      readTime,
      bullets: parsedResponse.bullets || ["Materi telah berhasil diproses oleh AI."],
      extractedText: trimmedText,
      suggestedQuestions: (parsedResponse.suggestedQuestions || []).map((q: any, idx: number) => ({
        id: 300 + idx,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty: (parsedResponse.complexity || "Sedang").toLowerCase(),
      })),
    };

    res.json(finalResult);;
  } catch (error: any) {
    console.error("Summarization process error:", error);
    res.status(500).json({
      error: error.message || "Terjadi kesalahan internal saat memproses dokumen dengan AI.",
    });
  }
});

// Serve frontend assets based on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express v4 wildcard routing for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
