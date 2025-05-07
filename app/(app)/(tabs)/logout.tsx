import { Redirect, useFocusEffect } from 'expo-router';

import { useSession } from '@/context/ctx';
import { useCallback } from 'react';

export default function AppLayout() {
  const { signOut } = useSession();

  useFocusEffect(
    useCallback(() => {
      signOut();
    }, [signOut])
  );

  return <Redirect href="/sign-in" />;
}