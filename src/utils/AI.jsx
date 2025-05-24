export async function fetchGroqResponse(userMessage) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    try {
      // Load data from public directory
      const [jsonRes, txtRes] = await Promise.all([
        fetch('/data/Clubstructure.json'),
        fetch('/data/ClubData.txt')
      ]);
      

      // Check if fetches were successful
      if (!jsonRes.ok) {
        throw new Error(`Failed to load Clubstructure.json: ${jsonRes.status} ${jsonRes.statusText}`);
      }
      if (!txtRes.ok) {
        throw new Error(`Failed to load ClubData.txt: ${txtRes.status} ${txtRes.statusText}`);
      }

      const [clubData, clubInfo] = await Promise.all([
        jsonRes.json(),
        txtRes.text()
      ]);
      console.log('Club Data:', clubData);
      console.log('Club Info:', clubInfo);

      const systemPrompt = `
You are a friendly and helpful assistant for the Creativa Club.

Always speak in a warm, simple, and patient tone — like you're talking to someone new to the club.

Keep your answers **short and clear**. Just give the main point, in a kind and helpful way.

Use this to guide your answers:

CLUB DESCRIPTION:
${clubInfo}

CLUB DATA:
${JSON.stringify(clubData, null, 2)}

If someone asks something outside the club’s topics, gently say you only help with Creativa Club questions.

Always stay positive and supportive. If needed, explain one small idea at a time — but keep it short.
`;



      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response from AI.';
    } catch (error) {
      console.error('Error in fetchGroqResponse:', error);
      throw error;
    }
  }
  