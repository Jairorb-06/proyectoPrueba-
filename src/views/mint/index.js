import { useWeb3React } from "@web3-react/core";
import useGetColection from "../../config/firebase/getColection";

import { useImgContext, useImgToggleContext } from "../../providers/ImgProvider";


const Home = () => {
  const { active } = useWeb3React();

  const links = useImgContext();
  // console.log(links)
  const update = useImgToggleContext();  

  const ViewImages = () => {

    return (
      <>
     
        {links &&
          links.map((link) => (
            <div key={link.id}>
              <img src={link.url} alt="images" width="200" height="200" />
              <i>{link.id_img}</i>
              {/* <i>{link.mint.toString()}</i> */}
              <button
                onClick={() =>
                  window.open(`/venta/${link.id}`, "_self")
                }
              >
                Comprar Token!
              </button> 
            </div>
          ))}
      </>
    );
  };

  //si no esta conectada la wallet se muestra mensaje
  if (!active) return "Conecta tu wallet!";

  return <ViewImages />;
};

export default Home;
