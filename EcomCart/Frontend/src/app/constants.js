export const Items_Per_Page=10;

export function discountPrice(item){
    return Math.round(item.price * (1-item.discountPercentage/100));
}