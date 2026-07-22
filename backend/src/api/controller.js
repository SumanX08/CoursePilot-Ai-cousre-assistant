import { checkInputGuardrails } from '../rag/guardrails/input.js';
import { checkOutputGuardrails } from '../rag/guardrails/output.js';
import { routeQuery } from '../rag/query/router.js';
import { retrieveDocuments } from '../rag/retrieval/search.js';
import { rerankDocuments } from '../rag/retrieval/reranker.js';
import { generateAnswer } from '../rag/generation/generate.js';
import { gradeResponse } from '../rag/generation/crag.js';

export async function handleChat(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
  
    const guardrailCheck = checkInputGuardrails(query);
    if (!guardrailCheck.isValid) {
      return res.status(403).json({ answer: guardrailCheck.reason });
    }

    let currentQuery = query;
    let finalAnswer = "";
    let rewrites = 0;
    const MAX_REWRITES = 3;

    
    while (rewrites < MAX_REWRITES) {

      
      const route = await routeQuery(currentQuery);
      if (route !== 'vector-store') {
        return res.json({ answer: "Query routed outside of course context." });
      }

      const candidateDocs = await retrieveDocuments(currentQuery);

      const topDocs = await rerankDocuments(currentQuery, candidateDocs, 5);

      if (topDocs.length === 0) {
        finalAnswer = "I couldn't find any relevant course materials to answer your question.";
        break;
      }

      const generatedAnswer = await generateAnswer(query, topDocs);

      const evaluation = await gradeResponse(query, topDocs, generatedAnswer);

      if (evaluation.score >= 6) {
        finalAnswer = generatedAnswer;
        break; // Good answer, exit loop
      } else {
        if (evaluation.missingKeywords && evaluation.missingKeywords.length > 0) {
          currentQuery = `${query} ${evaluation.missingKeywords.join(' ')}`;
        }
        rewrites++;
        
        if (rewrites === MAX_REWRITES) {
          finalAnswer = generatedAnswer;
        }
      }
    }

    const safeOutput = checkOutputGuardrails(finalAnswer);

    return res.json({ answer: safeOutput });
  } catch (error) {
    console.error("Error in RAG pipeline:", error);
    return res.status(500).json({ error: "Internal server error processing your request." });
  }
}
