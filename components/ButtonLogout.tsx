import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function ButtonLogout() {    
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" })
    }

    return (
        <Button 
            variant="outline"
            className="w-full cursor-pointer text-red-600 hover:text-red-700 hover:bg-gray-100"
            onClick={handleLogout}
        >
            <LogOut />
            <span>Logout</span>
        </Button>
    )
}
