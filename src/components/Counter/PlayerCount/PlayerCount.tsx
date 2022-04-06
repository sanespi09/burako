import { h, FunctionalComponent } from 'preact';
import RoundedButton from '../../UI/Buttons/Rounded';
import { Player, Round as RoundType } from '/src/store/slices/gameSlice';
import cx from 'classnames';
import PlayerRound from './PlayerRound';

interface PlayerCountProps {
    player: Player;
    index: number;
    openModal: (playerId: number, round?: RoundType) => void;
}

const PlayerCount: FunctionalComponent<PlayerCountProps> = ({ player, index, openModal }) => {
    const rounds = player.rounds;
    const hasBorder = index === 1;
    return (
        <ul className={cx('border-white w-full flex-1 min-h-full pb-4', {
            "border-l-4": hasBorder,
        })}>
            {rounds.map( (round, i) => {
                const prevRound = rounds[i - 1];
                const prevResult = prevRound ? prevRound.base + prevRound.points : 0;
                return (
                     <PlayerRound round={round} openModal={openModal} prevResult={prevResult} playerId={player.id}/> 
                )
            })}
            <li className={cx('w-full flex border-white justify-center mt-4', {
            })}>
                <RoundedButton as="button" text="+" size='md' onClick={() => openModal(player.id)} />
            </li>
        </ul>
    );
}

export default PlayerCount;