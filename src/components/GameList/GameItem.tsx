import { h, FunctionalComponent, Fragment } from 'preact';
import { Game } from '/src/store/slices/gameSlice';
import cx from 'classnames';
import { Link } from 'wouter-preact';
import useStore from '/src/store';
import { getRelativeDate } from '/src/utils/date';

interface GameItemProps {
    game: Game;
    className: string;
}

const GameItem: FunctionalComponent<GameItemProps> = ({ game, className }) => {
    const setCurrentGame = useStore(state => state.setCurrentGame);

    const players = game.players.map(player => player.name).join(' vs ');
    const date = getRelativeDate(game.createdAt);

    const handleGameClick = (id: number) => {
        setCurrentGame(id);
    };

    const href = `/game/${game.id}`;
    return (
        <Link href={href} onClick={() => handleGameClick(game.id)}>
            <a className={cx('flex flex-col justify-center border-2 border-white bg-blue-500 w-full rounded-xl p-2 text-white', className)}>
                <h2>
                    {players}
                </h2>
                <h3>
                    {date}
                </h3>
            </a>
        </Link>
    );
}

export default GameItem;