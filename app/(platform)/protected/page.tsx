"use client"

import { UserButton } from "@clerk/nextjs";

const ProtectedPage = () => {
  // const user = await currentUser();
  // const { userId } = useAuth();
  // const user = useUser();

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default ProtectedPage;