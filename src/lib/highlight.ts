import { createShikiHighlighter } from '@astrojs/internal-helpers/shiki';

let highlighterPromise: ReturnType<typeof createShikiHighlighter> | undefined;

function getHighlighter() {
  highlighterPromise ??= createShikiHighlighter({
    langs: ['js' as never],
    theme: 'vesper',
  });
  return highlighterPromise;
}

/**
 * Build-time syntax highlighting. Returns the markup for a <pre> block so it can
 * be handed to a client island as a prop, keeping highlighting off the client.
 */
export async function highlight(code: string): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, 'js', {
    defaultColor: false,
    wrap: false,
  });
}
