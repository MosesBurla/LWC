import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { eventData } = await req.json()

    // This is a simplified version - in production you'd need proper OAuth setup
    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID')
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET')

    // For demo purposes, return a mock Google Meet URL
    const mockMeetData = {
      google_event_id: `lwc-${Date.now()}`,
      meet_url: `https://meet.google.com/lwc-${Math.random().toString(36).substr(2, 9)}`,
      calendar_url: `https://calendar.google.com/calendar/event?eid=${Date.now()}`
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: mockMeetData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})