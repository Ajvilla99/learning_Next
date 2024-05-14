import type { Size } from "@/interfaces"
import clsx from "clsx";
import { underline } from "discord.js";

interface Props {
    selectedSize: Size;
    availableSize: Size[];
}

export const SizeSelector = ({ selectedSize, availableSize }: Props) => {



  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>

        <div className="flex">
            {
                availableSize.map( size => (
                    <button 
                        key={size}
                        className={
                            clsx('mx-2 hover:underline text-lg',
                            {
                                'underline': size === selectedSize
                            })
                        }
                    >
                        {size}
                    </button>
                ))
            }

        </div>

    </div>
  )
}
