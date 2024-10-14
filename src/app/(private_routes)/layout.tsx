import AuthReq from "@/app/middlewares/authReq";
import MainLayout from "../components/mainLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthReq>
      <MainLayout>{children}</MainLayout>
    </AuthReq>
  );
}
