import { NextResponse } from 'next/server';
import { cmsFetch } from '@/utils/apiClient';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    console.log('[GET /api/cms/articles] Query params:', { slug });

    if (slug) {
      console.log(`Fetching article by slug: ${slug}`);
      // Validate slug is a non-empty string
      if (typeof slug !== 'string' || slug.trim() === '') {
        console.log('Invalid slug parameter:', slug);
        return NextResponse.json({ error: 'Invalid slug parameter' }, { status: 400 });
      }

      // Fetch articles with slug filter
      const data = await cmsFetch(`articles?slug=${encodeURIComponent(slug)}`);

      // Handle CMS response: array or single object
      let article = null;
      if (Array.isArray(data)) {
        article = data.find(item => item.slug === slug) || null;
      } else if (data && data.slug === slug) {
        article = data;
      }

      if (!article) {
        console.log(`No article found for slug: ${slug}`);
        return NextResponse.json({ error: `Article not found for slug: ${slug}` }, { status: 404 });
      }

      // Ensure image fields are in the correct format
      article.tileImage = article.tileImage || [{ downloadURL: '/fallback-image.jpg' }];
      article.inlineImages = article.inlineImages || [];

      console.log(`Found article for slug: ${slug}`, article);
      return NextResponse.json(article, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // Fetch all articles if no slug is provided
    console.log('Fetching all articles');
    const data = await cmsFetch('articles');
    console.log(`Retrieved ${Array.isArray(data) ? data.length : 1} article(s)`);

    // Ensure image fields for all articles
    const articles = Array.isArray(data) ? data : [data];
    articles.forEach(article => {
      article.tileImage = article.tileImage || [{ downloadURL: '/fallback-image.jpg' }];
      article.inlineImages = article.inlineImages || [];
    });

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('[GET /api/cms/articles] Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}