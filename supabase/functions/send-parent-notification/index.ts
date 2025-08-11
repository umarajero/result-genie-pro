import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  studentName: string;
  parentPhone: string;
  results: Record<string, number>;
  averageScore: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentName, parentPhone, results, averageScore }: NotificationRequest = await req.json();

    // Check if Twilio credentials are available
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !fromNumber) {
      console.error('Missing Twilio credentials');
      return new Response(
        JSON.stringify({ 
          error: 'SMS service not configured. Please add Twilio credentials.' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Format the results message
    const subjectScores = Object.entries(results)
      .map(([subject, score]) => `${subject}: ${score}`)
      .join(', ');

    const message = `🎓 Results for ${studentName}:\n\n${subjectScores}\n\nAverage Score: ${averageScore}%\n\nCertificate available for download in the parent portal.`;

    // Send SMS using Twilio API
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const body = new URLSearchParams({
      To: parentPhone,
      From: fromNumber,
      Body: message,
    });

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Twilio API error:', errorData);
      throw new Error(`Twilio API error: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('SMS sent successfully:', responseData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: responseData.sid,
        message: 'SMS notification sent successfully' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in send-parent-notification function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send SMS notification' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);