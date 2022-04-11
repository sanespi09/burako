import {h, FunctionalComponent} from 'preact';
import GameList from '../components/GameList/GameList';
import useStore from '../store';

const ContinueGame: FunctionalComponent = () => {

    const games = useStore(state => state.games);

    return ( 
        <section className='flex justify-center w-full p-6' style={{ height: 'calc(100vh - 48px)'}}>
            <GameList games={games}/>
        </section>
     );
}
 
export default ContinueGame;