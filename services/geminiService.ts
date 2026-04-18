
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCaption(imagePrompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Buatlah kutipan romantis yang puitis dan bermakna untuk sepasang kekasih yang mengenakan gelang kenangan ini berdasarkan deskripsi foto: ${imagePrompt}. Maksimal 15 kata.`,
    });
    return response.text?.replace(/"/g, '') || "Kenangan terindah kita.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Momen abadi bersamamu.";
  }
}

export async function enhanceDescription(currentText: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perhalus tulisan ini agar lebih elegan dan penuh perasaan untuk kado perhiasan: "${currentText}". Maksimal 10 kata.`,
    });
    return response.text?.replace(/"/g, '') || currentText;
  } catch (error) {
    return currentText;
  }
}
