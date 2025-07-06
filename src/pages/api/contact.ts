export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const emailHost = import.meta.env.EMAIL_HOST;
  const emailPort = import.meta.env.EMAIL_PORT;
  const emailAuth = import.meta.env.EMAIL_AUTH;
  const passwordAuth = import.meta.env.EMAIL_PASSWORD;
  const CLOUDFLARE_SECRET_KEY = import.meta.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  const { name, email, message, token } = await request.json();

  const formData = new FormData();
  formData.append('secret', CLOUDFLARE_SECRET_KEY);
  formData.append('response', token);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const turnstileResponse = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const turnstileData = await turnstileResponse.json();

  if (!turnstileData.success) {
    console.log('CAPTCHA verification failed.', turnstileData);

    return new Response(
      JSON.stringify({ success: false, error: 'Échec de la vérification CAPTCHA. Veuillez réessayer.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: true,
    auth: {
      user: emailAuth,
      pass: passwordAuth,
    },
  });

  try {
    await transporter.sendMail({
      from: emailAuth,
      to: emailAuth,
      subject: 'JEUPIX HELP',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
};
