import Link from 'next/link';
import Grainient from '@org/ui/components/Grainient';
import Dither from '@org/ui/components/Dither';
import { Button } from '@org/ui/components/ui/button';
import { StaticTrace, TraceItem } from '@org/ui/components/StaticTrace';

const kvasirWorkflowTrace: TraceItem[] = [
  {
    title: 'Upload Notes',
    element:
      'Drop in your PDF, text, or lecture — the system instantly breaks down the material into subtopics and builds a mini-RAG base.',
  },
  {
    title: 'Flashcard Drill',
    element:
      'Reinforce core terms, definitions, and facts using an interactive Active Recall flashcard trainer.',
  },
  {
    title: 'Feynman Method',
    element:
      'Explain the material to a curious AI student who tests your knowledge strictly against your notes and flags logical gaps.',
  },
  {
    title: 'Exam Passed',
    element:
      'Achieve a stable understanding index (≥80%), walk into your exam with total confidence, and ace the subject stress-free.',
  },
];

const traditionalWorkflowTrace: TraceItem[] = [
  {
    title: 'Reread Material',
    element:
      'Spend hours mindlessly rereading 40 pages of raw PDF text, creating a false sense of security and complete mental clutter.',
  },
  {
    title: 'Manual Cramming',
    element:
      "Spend extra time manually writing out flashcards or highlighting endless text blocks without knowing what's actually important.",
  },
  {
    title: 'Random AI Chatting',
    element:
      'Ask generic AI chatbots that hallucinate and flood your head with confusing outside info not required by your curriculum.',
  },
  {
    title: 'Exam Panic',
    element:
      'Blank out during the exam because you mistook text recognition for real understanding, leading to burnout and low grades.',
  },
];

export default function Page() {
  return (
    <section>
      <header className="w-full p-4 px-20 flex flex-row items-center gap-20 bg-accent/40 h-19">
        <div>
          <h2 className="text-lg font-bold">Kvasir</h2>
        </div>
        <nav className="flex flex-row items-center gap-4 text-sm">
          <Link href={'/'}>Home</Link>
          <Link href={'/downloads'}>Downloads</Link>
          <Link href={'https://github.com/Swedka121/kvasir'}>
            See on Github
          </Link>
        </nav>
      </header>
      <main>
        <section className="relative w-full h-200 flex justify-center items-center">
          <div className="absolute top-0 left-0 h-200 w-screen -z-10">
            <div className="relative w-full h-full">
              <Grainient
                colors={['#120f17', '#2a0f0a', '#9a3412', '#f97316', '#fed7aa']}
                angle={55}
                flow={0.8}
                silk={0.35}
                grainAmount={0.08}
                type="linear"
                bands={1}
                softness={1}
                scale={1}
                speed={1}
                grainSize={1.2}
                grainAnimated
                contrast={1}
                saturation={1}
                variation={0}
                interactive
                stir={1}
                clickSwirl
                intro
                lightMode={false}
              />
            </div>
          </div>
          <div className="w-max h-max flex flex-col items-center">
            <h1 className="text-9xl font-(family-name:--font-goldman) uppercase">
              Kvasir
            </h1>
            <p className="font-light text-lg">Your deep learning platform</p>

            <div className="flex flex-row gap-4 items-center mt-10">
              <Button
                className={
                  'text-md p-5 bg-white text-blue-950 hover:text-white '
                }
                variant={'secondary'}
              >
                Download app
              </Button>
              <Button className={'text-md p-5'} variant={'secondary'}>
                Read More
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full h-300 grid grid-cols-4 grid-rows-2 p-20 gap-5">
          <div className="relative rounded-sm bg-accent/40 col-span-1 row-span-2 p-5">
            <h2 className="text-xl font-bold font-mono">
              <span className="text-3xl font-black font-sans">01</span> The
              Illusion of Competence
            </h2>
            <p className="font-light text-sm">
              Why simply rereading notes fails you in exams.
            </p>
          </div>
          <div className="relative rounded-sm bg-accent/40 col-span-3 p-5">
            <h2 className="text-xl font-bold font-mono">
              <span className="text-3xl font-black font-sans">02</span> AI
              Hallucinations
            </h2>
            <p className="font-light text-sm">
              How standard chatbots clutter your head with unnecessary
              information.
            </p>
          </div>
          <div className="relative rounded-sm bg-accent/40 col-span-2 p-5">
            <h2 className="text-xl font-bold font-mono">
              <span className="text-3xl font-black font-sans">03</span> Material
              Chaos
            </h2>
            <p className="font-light text-sm">
              The lack of structure in heavy PDF documents.
            </p>
          </div>
          <div className="relative rounded-sm bg-accent/40 col-span-1 overflow-hidden">
            <Dither
              waveColor="#722a03"
              backgroundColor="#ffb98a"
              ditherMode="bayer"
              colorNum={6}
              pixelSize={2}
              waveSpeed={0.04}
              waveFrequency={2.8}
              waveAmplitude={0.3}
              mouseEffect="erase"
              mouseRadius={0.3}
              palette={[]}
              scale={0.85}
              contrast={1}
              brightness={-0.01}
              mouseStrength={1.35}
              trail={0.75}
              enableMouseInteraction
              clickRipple
              intro
              disableAnimation={false}
            />
          </div>
        </section>
        <div className="w-full h-max relative">
          <div className="w-full h-full absolute top-0 left-0">
            <div className="relative h-full w-full -z-10">
              <Grainient
                colors={['#120f17', '#2a0f0a', '#9a3412', '#f97316', '#fed7aa']}
                angle={55}
                flow={0.8}
                silk={0.35}
                grainAmount={0.08}
                type="linear"
                bands={1}
                softness={1}
                scale={1}
                speed={1}
                grainSize={1.2}
                grainAnimated
                contrast={1}
                saturation={1}
                variation={0}
                interactive
                stir={1}
                clickSwirl
                intro
                lightMode={false}
              />
            </div>
          </div>
          <section className="w-2/3 h-max mx-auto grid grid-cols-[1fr_40px_1fr] gap-20 bg-background px-30 py-20">
            <div className="w-full h-max flex flex-col gap-4">
              <h2 className="text-3xl font-bold font-(family-name:--font-goldman)">
                With Kvasir
              </h2>
              <StaticTrace trace={kvasirWorkflowTrace} className="w-full" />
            </div>
            <div className="flex justify-center items-center text-4xl font-black">
              Vs
            </div>
            <div className="w-full h-max flex flex-col gap-4">
              <h2 className="text-3xl font-bold font-(family-name:--font-goldman)">
                Traditional learning
              </h2>
              <StaticTrace
                trace={traditionalWorkflowTrace}
                className="w-full"
              />
            </div>
          </section>
        </div>
        <section className="h-40"></section>
      </main>
    </section>
  );
}
