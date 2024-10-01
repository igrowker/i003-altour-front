
import AuthReq from "@/app/middlewares/authReq"



export default function ProtectedLayout({ children, }: { children: React.ReactNode; }) {
    return (

            <AuthReq>
                {children}
            </AuthReq>

    );
}
