import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const siteUrl = 'https://vinicius-gpl.com';
	const currentDate = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<url>
		<loc>${siteUrl}/</loc>
		<lastmod>${currentDate}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
		<xhtml:link rel="alternate" hreflang="pt-br" href="${siteUrl}/" />
		<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
	</url>
	<url>
		<loc>${siteUrl}/en</loc>
		<lastmod>${currentDate}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<xhtml:link rel="alternate" hreflang="pt-br" href="${siteUrl}/" />
		<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
	</url>
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
