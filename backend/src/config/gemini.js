import { GEMINI_API_KEY } from "./env.js";
import { AppError } from "../utils/AppError.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],

          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();

      console.error("GEMINI API ERROR:", errText);

      throw new AppError("GEMINI_API_REQUEST_FAILED", 500);
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new AppError("NO_TEXT_RETURNED_FROM_GEMINI", 500);
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);

  } catch (error) {
    console.error("GEMINI FETCH ERROR:", error);

    throw new AppError(
      error.message || "GEMINI_API_FETCH_FAILED",
      500
    );
  }
};