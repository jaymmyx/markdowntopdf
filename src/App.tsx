import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const DEFAULT_MARKDOWN = `# Math & Markdown

Write markdown on the left pane, and see the rendered PDF-ready document on the right.

## Inline Math
Here is an inline equation spanning standard text flow: $E = mc^2$.

## Block Math
Here is a block equation with fractions and integrals. Notice how it will never break across a page during PDF rendering thanks to our CSS rules.

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

### Page Pagination Test
Add a large block of text or multiple equations to test how they snap perfectly to boundaries!

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
`;

export default function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f5f5f7] overflow-hidden font-sans">

      {/* HEADER: Hidden when printing */}
      <header className="no-print h-14 shrink-0 bg-white/80 backdrop-blur-md border-b border-[#e5e5ea] px-6 flex justify-between items-center z-10">
        <h1 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
          Markdown & LaTeX Editor
        </h1>
        <button
          onClick={handlePrint}
          className="bg-[#007aff] hover:bg-[#0071eb] text-white font-medium text-[15px] py-1.5 px-4 rounded-full shadow-sm transition-colors cursor-pointer"
        >
          Download PDF
        </button>
      </header>

      {/* WORKSPACE AREA */}
      <main className="flex-1 flex overflow-hidden">

        {/* LEFT PANE: Raw Input Area (Hidden for Print) */}
        <section className="no-print w-1/2 h-full border-r border-[#e5e5ea] bg-white flex flex-col relative z-0">
          <textarea
            className="w-full h-full p-8 outline-none resize-none font-mono text-[15px] leading-relaxed text-[#1d1d1f] selection:bg-[#007aff]/30"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown and math here..."
            spellCheck={false}
          />
        </section>

        {/* RIGHT PANE: Rendered Output (Active for Print) */}
        <section className="print-area w-1/2 h-full overflow-y-auto bg-white p-12 md:p-16 relative flex justify-center shadow-[-4px_0_24px_rgba(0,0,0,0.03)] z-0">

          <article className="ios-prose max-w-[700px] w-full print:max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {markdown}
            </ReactMarkdown>
          </article>

        </section>

      </main>
    </div>
  );
}
