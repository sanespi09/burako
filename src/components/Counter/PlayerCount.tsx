import { h, FunctionalComponent } from 'preact';
import RoundedButton from '../UI/Buttons/Rounded';
import { Player } from '/src/store/slices/gameSlice';
import cx from 'classnames';

interface PlayerCountProps {
    player: Player;
    index: number;
    openModal: (playerId: number) => void;
}

const PlayerCount: FunctionalComponent<PlayerCountProps> = ({ player, index, openModal }) => {
    const rounds = player.rounds;
    const hasBorder = index === 1;
    return (
        <ul className={cx('border-white w-full flex-1 min-h-full pb-4', {
            "border-l-4": hasBorder,
        })}>
            {rounds.map((round) => (
                <li className="text-white font-bold">
                    <div className="border-b-4 flex flex-col items-center gap-y-2 py-2">
                        <h3>{round.base}</h3>
                        <h3>{round.points}</h3>
                    </div>
                    <div className='flex flex-col items-center pt-2'>
                        <h3>{round.result}</h3>
                    </div>
                </li>
            ))}
            <li className={cx('w-full flex border-white justify-center mt-4', {
            })}>
                <RoundedButton as="button" text="+" size='md' onClick={() => openModal(player.id)} />
            </li>
        </ul>
    );
}

export default PlayerCount;