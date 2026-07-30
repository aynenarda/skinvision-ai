import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <SignUp />
    </main>
  );
}
