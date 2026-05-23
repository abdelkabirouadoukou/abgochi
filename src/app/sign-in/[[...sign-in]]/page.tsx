import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-in"
        forceRedirectUrl="/admin"
        appearance={{
          variables: {
            colorBackground: "#0a0a0a",
            colorInputBackground: "#111",
            colorPrimary: "#c9b896",
            colorText: "#f8f6f0",
          },
          elements: {
            card: "border border-white/10 shadow-none",
            headerTitle: "font-display text-2xl",
            formButtonPrimary: "bg-accent text-[#1a1814]",
          },
        }}
      />
    </div>
  );
}
