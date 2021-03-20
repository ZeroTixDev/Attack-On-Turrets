export default function lerp(start, end, time) {
   return start * (1 - time) + end * time;
}