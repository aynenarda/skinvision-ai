import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Profil</h1>
      <p className="mt-2 text-muted-foreground">
        Hesap bilgilerinizi ve güvenlik ayarlarınızı buradan yönetin.
      </p>
      <div className="mt-8">
        <UserProfile />
      </div>
    </div>
  );
}
