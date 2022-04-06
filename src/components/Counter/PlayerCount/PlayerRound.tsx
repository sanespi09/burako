import cx from 'classnames';
import { h, FunctionalComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { useOutsideClick } from '/src/hooks/events/useOutsideClick';
import useStore from '/src/store';
import { Round as RoundType} from '/src/store/slices/gameSlice';

interface RoundProps {
    round: RoundType;
    prevResult: number;
    playerId: number;
    openModal: (playerId: number, round?: RoundType) => void;
}

const PlayerRound: FunctionalComponent<RoundProps> = ({ round, prevResult, openModal, playerId }) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const deleteRound = useStore(state => state.deleteRound);

    console.log('rerender');

    const ref = useRef<HTMLLIElement | null>(null);
    const result = round.base + round.points + prevResult;

    const handleOutsideClick = (_event: MouseEvent) => {
        clicked && setClicked(false);
    }
    
    const handleClick = () => {
        if(!clicked){
            setClicked(true);
        } else {
            openModal(playerId, round);
        }
    }

    useOutsideClick(ref.current as HTMLElement, handleOutsideClick);
    
    return (
    <li className={cx("text-white font-bold relative z-0 transition", {
        "bg-blue-400": clicked
    })} 
    onClick={handleClick} ref={ref}>
        <div onClick={(event) => {event.stopPropagation(); deleteRound(playerId, round.id)}} className={cx('absolute top-1 right-2 rotate-45 text-lg transition z-5', {
            "visible opacity-100": clicked,
            "invisible opacity-0": !clicked
        })}>+</div>
        <div className="border-b-4 flex flex-col items-center gap-y-2 py-2">
            <h3>{round.base}</h3>
            <h3>{round.points}</h3>
        </div>
        <div className='flex flex-col items-center pt-2'>
            <h3>{result}</h3>
        </div>
    </li>
    )
};

export default PlayerRound;