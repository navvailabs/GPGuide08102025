import { Component as SignInCard } from '@/components/ui/sign-in-card-2.tsx';
import Header from '@/components/Header.tsx';

export default function LoginPage() {
  return (
    <div>
      {/* Header is positioned absolutely to float over the SignInCard */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header variant="transparent" />
      </div>
      <SignInCard />
    </div>
  );
}
