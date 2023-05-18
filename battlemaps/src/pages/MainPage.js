import s from "../style/main.module.scss";
import BattleMapRender from "../components/BattleMapRender";

const MainPage = (props) => {
  return (
    <>
      <div className={s.mainPageContainer}>
        <h1>Welcome to Battlemaps</h1>
        <h2>Where you can generate Battlemaps based on your specific needs</h2>

 
          <BattleMapRender />
     
      </div>
    </>
  );
};

export default MainPage;
