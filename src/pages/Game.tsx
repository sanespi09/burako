import {h, FunctionalComponent} from 'preact';
import Counter from '../components/Counter';
import useStore from '../store';

const Game: FunctionalComponent = () => {

    const currentGame = useStore(state => state.game);

    return ( 
        <section className='flex justify-center p-6 h-full' style={{ height: 'calc(100vh - 48px)'}}>
            <Counter currentGame={currentGame} className="w-full bg-blue-600 rounded-xl h-full"/>
        </section>
     );
}
 
export default Game;