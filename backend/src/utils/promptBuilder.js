export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
You are a STRICT JSON API RESPONSE GENERATOR.

CRITICAL RULES:
- Return ONLY valid JSON
- Do NOT wrap response inside markdown
- Do NOT use \`\`\`
- Do NOT explain anything
- Response MUST be parsable using JSON.parse()
- Use ONLY double quotes
- NO trailing commas
- Escape all line breaks using \\n
- Never return undefined
- Never return null
- Never omit required keys
- If data unavailable return empty string "" or []

USER INPUT:
- Topic: ${topic}
- Class Level: ${classLevel || "Not specified"}
- Exam Type: ${examType || "General"}
- Revision Mode: ${revisionMode ? "ON" : "OFF"}
- Include Diagram: ${includeDiagram ? "YES" : "NO"}
- Include Charts: ${includeChart ? "YES" : "NO"}

CONTENT RULES:
- Notes must be exam-oriented
- Use concise educational language
- Use Markdown formatting inside string values
- Avoid storytelling
- Avoid motivational text
- Avoid conversational tone

REVISION MODE:
If Revision Mode is ON:
- Ultra short notes
- Bullet points only
- No paragraphs
- One-line facts only
- Focus on formulas, keywords, definitions
- revisionPoints must contain highly important quick facts

NORMAL MODE:
If Revision Mode is OFF:
- Detailed but concise notes
- Include:
  - definition
  - explanation
  - examples
  - formulas (if applicable)
- Maximum paragraph size: 2-4 lines

SUBTOPIC RULES:
- Must generate ALL categories:
  - "⭐"
  - "⭐⭐"
  - "⭐⭐⭐"
- Each category must contain at least 2 items

DIAGRAM RULES:
If Include Diagram is YES:
- diagram.data MUST contain valid Mermaid syntax
- MUST start with "graph TD"
- Every node label MUST use square brackets and ALWAYS be wrapped in double quotes
- Example: A["User Login"] or B["ReactDOM.render() called"]
- Keep diagram simple and readable

If Include Diagram is NO:
- diagram.data = ""

CHART RULES:
If Include Charts is YES:
- charts array must contain at least 1 chart
- Allowed chart types:
  - "bar"
  - "line"
  - "pie"
- Use ONLY numeric values
- Labels should be short
- Data must be realistic

If Include Charts is NO:
- charts = []

QUESTIONS RULES:
- short questions: minimum 3
- long questions: minimum 3
- Questions must be exam-oriented

STRICT RESPONSE FORMAT:

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐",
  "notes": "",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart",
    "data": ""
  },
  "charts": [
    {
      "type": "bar",
      "title": "",
      "data": [
        {
          "name": "",
          "value": 10
        }
      ]
    }
  ]
}

RETURN ONLY RAW JSON.
`;
};