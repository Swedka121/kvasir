'use client';

import { isTauri } from '@tauri-apps/api/core';
import { getCurrent, onOpenUrl } from '@tauri-apps/plugin-deep-link';
import { useEffect, useRef, useState } from 'react';
import { authClient } from '@/lib/authClient';

export interface useDeepLinkAuthHandlerProps {
  onSuccess: () => void;
}

export function useDeepLinkAuthHandler({
  onSuccess,
}: useDeepLinkAuthHandlerProps) {
  const handledTokens = useRef(new Set<string>());
  const [error, onError] = useState<string | null>(null);

  useEffect(() => {
    if (!isTauri()) return;

    let active = true;
    let unlisten: (() => void) | undefined;

    const handleUrl = async (rawUrl: string) => {
      console.log(rawUrl);
      let url: URL;
      try {
        url = new URL(rawUrl);
      } catch {
        return;
      }

      if (
        url.protocol !== 'kvasir:' ||
        url.hostname !== 'auth' ||
        url.pathname !== '/callback'
      ) {
        return;
      }

      const token = url.searchParams.get('token');
      if (!token || handledTokens.current.has(token)) return;
      handledTokens.current.add(token);

      try {
        const { data, error } = await authClient.oneTimeToken.verify({ token });
        if (!active) return;
        if (error || !data) {
          handledTokens.current.delete(token);
          onError(
            error
              ? `Could not complete sign-in: ${error.message}`
              : 'The sign-in handoff did not return a session.',
          );
          return;
        }
        onSuccess();
      } catch (error) {
        if (!active) return;
        handledTokens.current.delete(token);
        onError(
          error instanceof Error
            ? `Could not complete sign-in: ${error.message}`
            : 'Could not complete sign-in.',
        );
      }
    };

    const handleUrls = (urls: string[] | null) => {
      urls?.forEach((url) => void handleUrl(url));
    };

    void (async () => {
      unlisten = await onOpenUrl(handleUrls);
      handleUrls(await getCurrent());
    })().catch((error: unknown) => {
      if (!active) return;
      onError(
        error instanceof Error
          ? `Could not initialize deep links: ${error.message}`
          : 'Could not initialize deep links.',
      );
    });

    return () => {
      active = false;
      unlisten?.();
    };
  }, []);

  return { error };
}
