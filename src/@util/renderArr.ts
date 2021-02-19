import { NewOrders } from "@redux/reducers/OrderReducer";

export const renderArray = (orders:NewOrders[], page: number) => {
    let rederArr:any[] = [];
    for(let i= page*4 ; i<page*4 + 4 ; i++) {
      if(orders[i] !== undefined) rederArr.push(orders[i]);
    };
    console.log(rederArr);
    return rederArr;
};