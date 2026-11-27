import Grainient from '@org/ui/components/Grainient';
import { Button } from '@org/ui/components/ui/button';
import * as Card from '@org/ui/components/ui/card';
import { openUrl } from '@tauri-apps/plugin-opener';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="grid grid-cols-2 grid-rows-1 w-full h-screen max-xl:grid-cols-1">
      <div className="w-full h-full flex justify-center items-center bg-foreground/5 border-r-4 border-accent/50 relative max-xl:hidden">
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
      <div className="w-full h-full flex justify-center items-center">
        <Card.Card className="min-w-140 w-2/3">
          <Card.CardHeader>
            <Card.CardTitle>Kvasir</Card.CardTitle>
          </Card.CardHeader>
          <Card.CardContent>
            <h1 className="text-4xl font-bold">Welcome to Kvasir</h1>
            <p className="text-md font-light">Your deep learning platform</p>

            <div className="mt-20 flex flex-row gap-2 items-end">
              <Link href={'/login'}>
                <Button size={'lg'}>Start learning</Button>
              </Link>
              <Button
                variant={'ghost'}
                onClick={() => openUrl(process.env.NEXT_PUBLIC_LENDING_URL!)}
              >
                Read more
              </Button>
            </div>
          </Card.CardContent>
        </Card.Card>
      </div>
    </section>
  );
}
