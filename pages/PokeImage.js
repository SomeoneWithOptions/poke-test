import Image from "next/image";

export const PokeImage = ({ number, shiny }) => {
  let source = !shiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${number}.png`;
  return <Image src={source} width={200} height={200} alt ='Pokemon Image'/>;
};

export default PokeImage;
