import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()

    // Get user data
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error

    // Send welcome email using SendGrid
    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY')
    const frontendUrl = Deno.env.get('VITE_FRONTEND_URL')

    const emailData = {
      personalizations: [{
        to: [{ email: user.email, name: user.full_name }],
        subject: 'Welcome to Life With Christ Community! 🙏'
      }],
      from: {
        email: 'welcome@lifewithchrist.org',
        name: 'Life With Christ Community'
      },
      content: [{
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 40px 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">Welcome, ${user.full_name}!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We're thrilled to have you join our faith community</p>
            </div>
            
            <div style="padding: 40px 20px; background: white;">
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Your account has been approved and you're now part of our growing community of believers!
              </p>
              
              <h3 style="color: #1F2937; margin-top: 30px;">Next Steps:</h3>
              <ul style="color: #374151; line-height: 1.8;">
                <li>📖 Read today's devotional</li>
                <li>👥 Join a small group</li>
                <li>📅 RSVP to upcoming events</li>
                <li>🙏 Share your first prayer request</li>
                <li>✨ Introduce yourself to the community</li>
              </ul>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${frontendUrl}/groups" 
                   style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Find Your Group
                </a>
              </div>
              
              <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                "For where two or three gather in my name, there am I with them." - Matthew 18:20
              </p>
            </div>
            
            <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
              <p>Life With Christ Community Platform</p>
              <p>Made with ❤️ for the Kingdom of God</p>
            </div>
          </div>
        `
      }]
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendGridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Welcome email sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})