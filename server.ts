import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

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

// Helper to count words
function wordCountFromText(input: string): number {
  if (!input) return 0;
  return input.split(/\s+/).filter(w => w.length > 0).length;
}

// REST API endpoint to extract text and summarize using Gemini AI
app.post("/api/summarize", async (req, res) => {
  try {
    const { fileName, mimeType, base64Data, text: rawText } = req.body;
    const ai = getGeminiAI();

    let contentsPayload: any[] = [];
    let isDirectText = false;
    let trimmedText = "";

    if (rawText) {
      trimmedText = cleanExtractedText(rawText);
      isDirectText = true;
    } else if (base64Data) {
      const ext = fileName ? fileName.split(".").pop()?.toLowerCase() : "";
      if (ext === "txt" || mimeType === "text/plain") {
        const buffer = Buffer.from(base64Data, "base64");
        trimmedText = cleanExtractedText(buffer.toString("utf-8"));
        isDirectText = true;
      }
    }

    if (isDirectText) {
      contentsPayload = [
        `Berikut adalah materi pembelajaran yang perlu dirangkum dan diujikan lewat kuis. Tolong baca dengan seksama dan buat rangkuman interaktif beserta kuis yang seru.

MATERI PEMBELAJARAN:
${trimmedText}
`
      ];
    } else if (base64Data) {
      // Send document directly using modern Gemini SDK inlineData
      contentsPayload = [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType || "application/pdf"
          }
        },
        "Berikut adalah berkas materi pembelajaran penting yang diunggah. Tolong baca isi dokumen ini, ekstrak seluruh teks isinya secara utuh, lalu buat rangkuman komprehensif serta kuis interaktif yang seru dari materi tersebut sesuai dengan instruksi sistem di bawah ini."
      ];
    } else {
      return res.status(400).json({ error: "Silakan masukkan teks atau unggah berkas PDF/Word/PPT/TXT." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsPayload,
      config: {
        systemInstruction: "Anda adalah asisten pendidikan pintar bernama Guru Quizo (seekor rubah bijak). Tugas Anda adalah membuat rangkuman materi yang sangat komprehensif, mendalam, dan terstruktur dengan rapi dalam Bahasa Indonesia yang asyik, mendidik, serta membuat kuis interaktif berisi TEPAT 5 pertanyaan pilihan ganda guna melatih kemampuan kognitif dan analisis kritis siswa secara interaktif. Anda juga wajib melakukan ekstraksi teks isi dokumen secara lengkap ke dalam properti 'extractedText'. Jika materi berupa teks langsung, masukkan teks tersebut ke properti 'extractedText'.",
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
            extractedText: {
              type: Type.STRING,
              description: "Teks lengkap transkrip/ekstraksi mentah dari seluruh isi materi atau seluruh isi dokumen secara lengkap, runut, dan mendalam (Bahasa Indonesia). Jangan meringkas bagian ini, melainkan lakukan transkrip isi dokumen teks aslinya secara utuh.",
            },
            wordCount: {
              type: Type.INTEGER,
              description: "Perkiraan jumlah kata dalam isi dokumen tersebut.",
            }
          },
          required: ["title", "complexity", "bullets", "suggestedQuestions", "extractedText", "wordCount"],
        },
      },
    });

    const geminiText = response.text;
    if (!geminiText) {
      throw new Error("Gagal memperoleh respon rangkuman dari Gemini AI.");
    }

    const parsedResponse = JSON.parse(geminiText.trim());
    
    // Process text metrics safely
    let finalExtractedText = parsedResponse.extractedText || trimmedText || "";
    let finalWordCount = parsedResponse.wordCount || wordCountFromText(finalExtractedText) || 0;
    if (finalWordCount === 0) {
      finalWordCount = wordCountFromText(finalExtractedText);
    }
    const minutes = Math.max(1, Math.ceil(finalWordCount / 150));
    const readTime = `± ${minutes} menit`;

    // Final response integrating extracted statistics and Gemini summary
    const finalResult = {
      title: parsedResponse.title || `Topik: ${fileName || "Material Baru"}`,
      wordCount: finalWordCount,
      complexity: parsedResponse.complexity || "Sedang",
      readTime,
      bullets: parsedResponse.bullets || ["Materi telah berhasil diproses oleh AI."],
      extractedText: finalExtractedText,
      suggestedQuestions: (parsedResponse.suggestedQuestions || []).map((q: any, idx: number) => ({
        id: 300 + idx,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty: (parsedResponse.complexity || "Sedang").toLowerCase(),
      })),
    };

    res.json(finalResult);
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
    // Express v4/v5 wildcard routing for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
