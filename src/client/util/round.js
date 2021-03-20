export default function round(value, decimals = 0) {
   return decimals === 0 ? Math.round(value) : Math.round(value * 10 ** decimals) / 10 ** decimals;
}