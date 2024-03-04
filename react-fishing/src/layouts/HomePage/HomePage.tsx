import { Carousel } from "./components/Carousel";
import { HeaderContainer } from "./components/HeaderContainer";
import { Heros } from "./components/Heros";

export const HomePage = () => {
  return (
    <>
      <HeaderContainer />
      <Carousel />
      <Heros />
    </>
  );
};
