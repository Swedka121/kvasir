'use client';
import { useDeepLinkAuthHandler } from '@/hooks/deep-link-auth-handler';
import { Spinner } from '@org/ui/components/ui/spinner';
import { openUrl } from '@tauri-apps/plugin-opener';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@org/ui/components/ui/button';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    openUrl(process.env.NEXT_PUBLIC_LENDING_URL! + '/login');
  }, []);

  const { error } = useDeepLinkAuthHandler({
    onSuccess: () => router.push('/app'),
  });

  if (error)
    return (
      <section className="w-screen h-screen flex flex-col items-center">
        <div className="h-max w-max items-center my-auto flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Opps... something went wrong</h2>
          <p className="text-sm font-light">
            You can return to the login page and try again
          </p>
          <Link href={'/'} className="mt-10">
            <Button>Go back</Button>
          </Link>
        </div>
      </section>
    );
  return (
    <section className="w-screen h-screen flex justify-center items-center flex-col gap-2">
      <h2>Please continue in the your browser</h2>
      <Spinner />
    </section>
  );
}
