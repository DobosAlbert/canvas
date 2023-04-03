import { Item as ShopItem } from 'utils/types'
import { Item } from './Item'

export const ItemsList = ({items}:{items: ShopItem[]}) => {
  return (
    <>
      {items.map((item) => (
        <Item key={item.identifier + '-' + item.nonce} item={item} />
      ))}
    </>
  )
}
