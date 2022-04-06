import { FunctionalComponent, h } from 'preact';
import NormalButton from '../UI/Buttons/Normal';
import Error from '../UI/Forms/Error';
import Input from '../UI/Forms/Input';
import Modal from '../UI/Modal';
import useForm from '/src/hooks/forms/useForm';
import useStore from '/src/store';
import { Round } from '/src/store/slices/gameSlice';
import { roundValidate } from '/src/utils/validation';

interface RoundModalProps {
    open: boolean;
    closeModal: () => void;
    playerId: number | null;
    round: Round | null;
}

const RoundModal: FunctionalComponent<RoundModalProps> = ({ open, closeModal, playerId, round }) => {
    const editMode = !!round && round.id !== null;
    const addRound = useStore(state => state.addRound);
    const editRound = useStore(state => state.editRound);

    const submit = (data: typeof initValues) => {
        const hasPlayerId = playerId != null;
        console.log(playerId);
        if(editMode){
            console.log(round.id);
            hasPlayerId && editRound(playerId, round.id, data);
        } else {
            hasPlayerId && addRound(playerId, data);
        }
        closeModal();
    }

    const initValues = {
        base: editMode ? round.base : '',
        points: editMode ? round.points: ''
    }
    
    const { onBlur, onInput, onSubmit, values, errors } = useForm<typeof initValues>(submit, initValues, roundValidate);
    return (
        <Modal open={open} closeModal={closeModal}>
            <section>
                <form onSubmit={onSubmit} name="round-form">
                    <Input name='base' type='number' value={values.base} onInput={onInput} onBlur={onBlur} label="Base" />
                    <Error text={errors.base} className="mt-2"/>
                    <Input name='points' type='number' value={values.points} onInput={onInput} onBlur={onBlur} label="Puntos" className='mt-4' />
                    <Error text={errors.points} className="mt-2"/>
                    <NormalButton text={ editMode ? 'Editar' : 'Agregar'} as="button" className="mx-auto w-full mt-4" />
                </form>
            </section>
        </Modal>
    );
}

export default RoundModal;