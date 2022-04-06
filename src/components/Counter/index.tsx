import { h, FunctionalComponent } from 'preact';
import cx from 'classnames';
import { Game, Round } from '/src/store/slices/gameSlice';
import PlayerCount from './PlayerCount/PlayerCount';
import { useState } from 'preact/hooks';
import RoundModal from './RoundModal';
import { useTransitionDebounce } from '../../hooks/debounce/useTransitionDebounce';

interface CounterProps {
    currentGame: Game | null;
    className?: string;
}

interface ModalState {
    playerId: number | null;
    round: Round | null;
    open: boolean;
}

const Counter: FunctionalComponent<CounterProps> = ({ currentGame, className }) => {
    const [modalState, setModalState] = useState<ModalState>({ open: false, playerId: null, round: null });

    const openModal = (playerId: number, round?: Round) =>
        !modalState.open && setModalState({ round: round ?? null, playerId, open: true });

    const closeModal = () =>
        modalState.open && setModalState({ ...modalState, playerId: null, open: false });

    const showModal = useTransitionDebounce(150, modalState.open);

    if (!currentGame) {
        return null;
    }

    const players = currentGame?.players;
    return (
        <div className={className}>
            {showModal ? <RoundModal open={modalState.open} closeModal={closeModal} playerId={modalState.playerId} round={modalState.round} /> : null}
            <section className='text-white w-full h-full flex flex-col'>
                <div className='border-b-4 border-white w-full flex'>
                    {players.map((player, index) => (
                        <th className={cx('border-white text-center w-full py-2', {
                            "border-l-4": index === 1
                        })}>
                            {player.name}
                        </th>
                    ))
                    }
                </div>
                <div className='overflow-scroll h-full'>
                    <div className='flex min-h-full'>
                        {players.map((player, index) => (
                            <PlayerCount player={player} index={index} openModal={openModal} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Counter;