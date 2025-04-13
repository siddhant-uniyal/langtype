export const generateAlgo = async (language) => {
    const systemPrompt = `You only generate code for a given DSA algorithm in the requested programming language. No explanations, comments, or additional text. The generated code will be used by college undergraduates for improving their performance in competitive programming and online job interviews, hence keep the code simple and realistic to their use case, such that they can write this code to maximise their performance. No import statements or main functions, just give template codes for the requested algorithms. Ignore best practices in favour of less characters.`;

    const userPrompt = `Generate Union Find Algorithm in ${language}. Return only the code.`;

    const payload = {
        model: 'meta-llama/llama-4-maverick:free',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ]
    };

    const OPENROUTER_API_KEY = "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";
    const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    if (!OPENROUTER_API_KEY) {
        throw new Error("Missing OpenRouter API Key.");
    }

    const headers = {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method : "POST",
            headers : {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(payload)
        });
        const body = {
            "choices" : "hello"
        }
        // const body = await response.json()
        console.log(body["choices"])
        return body["choices"][0]["message"]["content"]
        // return response.data;
    } catch (error) {
        throw new Error(`Failed to generate algorithm in ${language}: ${error.message}`);
    }
};

