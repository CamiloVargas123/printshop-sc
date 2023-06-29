import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/Button"
import type { Product } from "@/models"
import { useAppDispatch } from "@/redux/hooks"
import { removeToCart } from "@/redux/slices/cart"

interface UpdateCartProps {
  cartItem: Product
}

export function UpdateCart({ cartItem }: UpdateCartProps) {
  const dispatch = useAppDispatch()

  function handleClick() {
    dispatch(removeToCart(cartItem))
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleClick}
      >
        <Icons.trash className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Borrar producto</span>
      </Button>
    </div>
  )
}
