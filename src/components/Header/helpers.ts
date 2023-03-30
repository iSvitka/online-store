export default function formatTotalCount(totalPrice:number):string {
    if(totalPrice >= 1000000) {
        return `${Math.round(totalPrice / 10000) / 100}M`;
    }
    if(totalPrice >= 1000) {
        return `${Math.round(totalPrice / 100) / 10}K`
    }

    return String(totalPrice)
}