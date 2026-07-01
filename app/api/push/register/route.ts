import { getSupabaseServer, supabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = String(body.token || '').trim();
    const platform = String(body.platform || '').trim();
    const email = body.email ? String(body.email).trim() : null;
    const locale = body.locale ? String(body.locale).trim() : 'uk';

    if (!token || !['ios', 'android'].includes(platform)) {
      return NextResponse.json({ error: 'Invalid token or platform' }, { status: 400 });
    }

    const client = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? getSupabaseServer()
      : supabaseServerClient;

    const { data, error } = await client
      .from('push_tokens')
      .upsert(
        {
          token,
          platform,
          email,
          locale,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'token' }
      )
      .select()
      .single();

    if (error) {
      console.error('Push token upsert error:', error);
      return NextResponse.json({ error: 'Failed to register push token' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Push register error:', error);
    return NextResponse.json({ error: 'Failed to register push token' }, { status: 500 });
  }
}
