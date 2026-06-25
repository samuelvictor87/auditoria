import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Tratar requisição preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, audio, text, format } = await req.json()
    const openRouterKey = Deno.env.get("OPENROUTER_API_KEY")

    if (!openRouterKey) {
      throw new Error("Chave OPENROUTER_API_KEY não configurada no Supabase Secrets.")
    }

    if (action === "transcribe") {
      if (!audio) {
        return new Response(JSON.stringify({ error: "Áudio ausente para transcrição." }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/whisper-1",
          input_audio: {
            data: audio,
            format: format || "webm"
          }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro na transcrição do Open Router:", errorText)
        let errorMsg = `Erro do Open Router: ${response.statusText}`
        try {
          const errObj = JSON.parse(errorText)
          if (errObj.error?.message) {
            errorMsg = errObj.error.message
          }
        } catch (_) {}
        throw new Error(errorMsg)
      }

      const result = await response.json()
      return new Response(JSON.stringify({ text: result.text }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    } else if (action === "summarize") {
      if (!text) {
        return new Response(JSON.stringify({ error: "Texto ausente para resumo." }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Prompt para reescrever o texto em primeira pessoa do singular
      const prompt = `Reescreva e aprimore o texto a seguir. Melhore a gramática, a clareza e a legibilidade. Você DEVE manter estritamente a narrativa em PRIMEIRA PESSOA DO SINGULAR (eu), preservando a essência, o sentimento e a sinceridade das ideias do autor (evite floreios artificiais ou termos formais demais que descaracterizem o tom de reflexão pessoal). Retorne APENAS o texto aprimorado final, sem explicações, introduções ou aspas adicionais.\n\nTexto original:\n"${text}"`

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://supabase.co",
          "X-Title": "Auditoria Diária"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "user", content: prompt }
          ],
          temperature: 0.3
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro no chat completions do Open Router:", errorText)
        let errorMsg = `Erro do Open Router: ${response.statusText}`
        try {
          const errObj = JSON.parse(errorText)
          if (errObj.error?.message) {
            errorMsg = errObj.error.message
          }
        } catch (_) {}
        throw new Error(errorMsg)
      }

      const result = await response.json()
      const improvedText = result.choices?.[0]?.message?.content || ""

      return new Response(JSON.stringify({ text: improvedText.trim() }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    } else {
      return new Response(JSON.stringify({ error: "Ação inválida." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

  } catch (error: any) {
    console.error("Erro na Edge Function:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
