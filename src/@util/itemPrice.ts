import { NewOrders } from "@redux/reducers/OrderReducer";

export const itemPrice = (order:NewOrders) => {
    let price = 0;
    order.receipts.forEach((item) => {
      price += item.item_total_price;
    })
    return price;
};