import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-upload-secret');
  if (secret !== process.env.UPLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const slug = formData.get('slug') as string;
  const caption = (formData.get('caption') as string) || '';

  if (!file || !slug) {
    return NextResponse.json({ error: 'Missing file or slug' }, { status: 400 });
  }

  const ext = file.name.split('.').pop();
  const fileName = `${slug}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('expedition-photos')
    .upload(fileName, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from('expedition-photos')
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase
    .from('expedition_photos')
    .insert({ slug, url: urlData.publicUrl, caption });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ url: urlData.publicUrl });
}
