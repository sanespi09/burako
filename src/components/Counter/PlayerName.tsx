import { h, FunctionalComponent } from 'preact';
import cx from 'classnames';
import { Player } from '/src/store/slices/gameSlice';
import { useRef, useState } from 'preact/hooks';
import { useOutsideClick } from '/src/hooks/events/useOutsideClick';
import useStore from '/src/store';

interface PlayerNameProps {
    player: Player;
    index: number;
}

const PlayerName: FunctionalComponent<PlayerNameProps> = ({
    player,
    index,
}) => {
    const [edit, setEdit] = useState(false);
    const changePlayerName = useStore((state) => state.changePlayerName);

    const inputRef = useRef<HTMLTableCellElement | null>(null);

    const handleNameClick = (_event: Event) => {
        !edit && setEdit(true);
    };

    const handleOutsideClick = (_event: MouseEvent) => {
        edit && setEdit(false);
    };

    const handleBlur = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const isValid = target.checkValidity();

        if (isValid) {
            changePlayerName(player.id, target.value);
        }
    };

    inputRef.current &&
        useOutsideClick(inputRef.current as HTMLElement, handleOutsideClick);

    return (
        <th
            className={cx('border-white text-center w-full py-2 px-8', {
                'border-l-4': index === 1,
            })}
            ref={inputRef}
        >
            <input
                onClick={handleNameClick}
                onBlur={handleBlur}
                className="bg-transparent font-bold w-full border-0 outline-none text-center"
                value={player.name}
                onTouchStart={handleNameClick}
                minLength={1}
                readOnly={!edit}
                required
                type="string"
            />
        </th>
    );
};

export default PlayerName;
