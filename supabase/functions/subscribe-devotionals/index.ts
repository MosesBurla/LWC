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
    const { email, time_preference, timezone } = await req.json()

    // In a real implementation, you would:
    // 1. Store the subscription in a database
    // 2. Set up a scheduled job to send daily emails
    // 3. Send a confirmation email

    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY')

    const confirmationEmail = {
      personalizations: [{
        to: [{ email }],
        subject: 'Devotional Subscription Confirmed 📖'
      }],
      from: {
        email: 'devotionals@lifewithchrist.org',
        name: 'Life With Christ Devotionals'
      },
      content: [{
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">Subscription Confirmed!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You'll receive daily devotionals in your inbox</p>
            </div>
            
            <div style="padding: 40px 20px; background: white;">
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for subscribing to our daily devotionals! You'll receive inspiring content every day to help you grow in your faith journey.
              </p>
              
              <div style="background: #F0FDF4; border-left: 4px solid #10B981; padding: 20px; margin: 30px 0;">
                <h3 style="margin: 0 0 10px 0; color: #065F46;">What to Expect:</h3>
                <ul style="margin: 0; color: #047857; line-height: 1.6;">
                  <li>Daily Bible verses with reflection</li>
                  <li>Practical applications for your life</li>
                  <li>Encouraging messages from our pastors</li>
                  <li>Prayer points and spiritual insights</li>
                </ul>
              </div>
              
              <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                "Your word is a lamp for my feet, a light on my path." - Psalm 119:105
              </p>
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
      body: JSON.stringify(confirmationEmail),
    })

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "You're subscribed! Check your email for confirmation." 
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