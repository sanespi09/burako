import {h, FunctionalComponent} from 'preact';
import { useEffect } from 'preact/hooks';
import Counter from '../components/Counter';
import useStore from '../store';

interface GameProps {
    id: string;
}

const Game: FunctionalComponent<GameProps> = () => {
    const game = useStore(state => state.currentGame);
    const saveCurrentGame = useStore(state => state.saveCurrentGame);

    useEffect(() => {
        return () => {
            console.log('saving...');
            saveCurrentGame();
        }
    })
    
    return ( 
        <section className='flex justify-center p-6 h-full' style={{ height: 'calc(100vh - 48px)'}}>
            <Counter currentGame={game} className="w-full bg-blue-600 rounded-xl h-full"/>
        </section>
     );
}
 
export default Game;