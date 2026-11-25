'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/authClient';
import Grainient from '@org/ui/components/Grainient';
import { Spinner } from '@org/ui/components/ui/spinner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  const [deepLink, setDeepLink] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;

    const createHandoff = async () => {
      const { data, error } = await authClient.oneTimeToken.generate();
      if (!active) return;
      if (error || !data?.token) {
        setError(error?.message ?? 'Could not create a desktop sign-in code.');
        return;
      }

      const callback = new URL('kvasir://auth/callback');
      callback.searchParams.set('token', data.token);
      const url = callback.toString();
      setDeepLink(url);
      window.location.assign(url);
    };

    void createHandoff().catch((cause: unknown) => {
      if (!active) return;
      setError(
        cause instanceof Error
          ? cause.message
          : 'Could not create a desktop sign-in code.',
      );
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="w-screen h-screen flex flex-col items-center">
      <div className="mt-20 h-100 relative w-full flex justify-center items-center">
        <div className="absolute w-max h-max z-10">
          <h1 className="text-9xl font-(family-name:--font-goldman) uppercase">
            Kvasir
          </h1>
        </div>
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
      <div className="h-max w-max items-center my-auto flex flex-col gap-2">
        <h2 className="text-3xl font-bold">Sign in successed!</h2>
        <p className="text-sm font-light">You can open Kvasir now</p>
        {!deepLink ? (
          <Spinner />
        ) : (
          <Link href={deepLink} className="mt-10">
            <Button>Open Kvasir</Button>
          </Link>
        )}
      </div>
    </section>
  );
}
