'use client';

import { authClient } from '@/lib/authClient';
import { Spinner } from '@org/ui/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { isPending, data } = authClient.useSession();

  useEffect(() => {
    if (!isPending && typeof data !== 'undefined') router.push('/app');
    else if (!isPending) router.push('/welcome');
  }, [isPending, data]);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <Spinner />
    </section>
  );
}
