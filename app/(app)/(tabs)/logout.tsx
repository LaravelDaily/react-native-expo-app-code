import { Redirect, useFocusEffect } from 'expo-router';

import { useSession } from '../../../context/ctx';

export default function AppLayout() {
  const { signOut } = useSession();

  useFocusEffect(() => {
    signOut();
  })

  return <Redirect href="/sign-in" />;
}