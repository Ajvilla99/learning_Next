import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
        <Link href={'/'}
            className="mx-2">
            <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
            <span> | Shop</span>
            <span>© { new Date().getFullYear() } </span>
        </Link>


        <Link
            href={''}
            className="mx-2"
        >
            Privacidad & Legal
        </Link>

        <Link
            href={''}
            className="mx-2"
        >
            Ubicaciones
        </Link>

    </div>
  )
}

