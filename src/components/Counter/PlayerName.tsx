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

    const handleNameClick = (_event: MouseEvent) => {
        !edit && setEdit(true);
    };

    const handleBlur = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const isValid = target.checkValidity();
        edit && setEdit(false);

        if (isValid) {
            changePlayerName(player.id, target.value);
        }
    };

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
                minLength={1}
                readOnly={!edit}
                required
                type="text"
                autoFocus
            />
        </th>
    );
};

export default PlayerName;
