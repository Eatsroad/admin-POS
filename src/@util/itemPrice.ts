import { NewOrders } from "@redux/reducers/OrderReducer";

export const itemPrice = (order:NewOrders) => {
    let price = 0;
    order.receipts.forEach((item) => {
      if(item.state === "주문 완료")price += item.item_total_price;
    })
    return price;
};