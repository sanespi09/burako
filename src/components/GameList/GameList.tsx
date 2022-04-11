import {h, FunctionalComponent} from 'preact';
import GameItem from './GameItem';
import { Game } from '/src/store/slices/gameSlice';
 
interface GameListProps {
    games: Game[];
    className?: string;
}
 
const GameList: FunctionalComponent<GameListProps> = ({games}) => {
    return ( 
        <ul className='w-full space-y-2'>
            {games.map( game => (
                <li>
                    <GameItem game={game} className=""/>
                </li>
            ))}
        </ul>
    );
}
 
export default GameList;