import { inter, titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <h1 className={ inter.className } >Hola mundo</h1>
      <h1 className={ titleFont.className }>Hola mundo</h1>
    </main>
  );
}
