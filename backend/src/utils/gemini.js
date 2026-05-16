import { GEMINI_API_KEY } from "../config/env.js";

import { AppError } from "./AppError.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const generateGeminiResponse = async (prompt, retryCount = 0) => {
  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
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
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      const errData = JSON.parse(errText);

      // Retry logic for 503 Service Unavailable (high demand)
      if (response.status === 503 && retryCount < 3) {
        console.log(`GEMINI BUSY (503). Retrying in 2s... (Attempt ${retryCount + 1})`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return generateGeminiResponse(prompt, retryCount + 1);
      }

      console.error("GEMINI API ERROR:", errText);
      throw new AppError(errData.error?.message || "GEMINI_API_REQUEST_FAILED", 500);
    }

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new AppError("NO_TEXT_RETURNED_FROM_GEMINI", 500);
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    if (error instanceof AppError) throw error;

    console.error("GEMINI FETCH ERROR:", error);
    throw new AppError(error.message || "GEMINI_API_FETCH_FAILED", 500);
  }
};
