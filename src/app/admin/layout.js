import Link from "next/link";
import { TiHomeOutline } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TfiPackage } from "react-icons/tfi";
import { MdAssignment } from "react-icons/md"

export default function Layout({children}) {
    return(
        <div className="flex tems-center w-full bg-white">
            
            <div className="flex flex-col items-center pt-22 w-[3rem] bg-neutral-600 gap-6 h-[100vh]">
            <Link href={"/admin"}>
                <TiHomeOutline className="text-white text-3xl" />
            </Link>
            <Link href={"/admin/orders"}>
                <TfiPackage className="text-white text-2xl" />
            </Link>
            <Link href={"/admin/notification"}>
                <IoMdNotificationsOutline className="text-white text-3xl" />
            </Link>
            <Link href={"/admin/inventory"}>
                <MdAssignment className="text-white text-2xl" />
            </Link>
            </div>

            <div className="w-full">
                {children}
            </div>
        </div>
    )
}