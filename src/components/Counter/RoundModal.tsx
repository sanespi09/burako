import { FunctionalComponent, h } from 'preact';
import NormalButton from '../UI/Buttons/Normal';
import Error from '../UI/Forms/Error';
import Input from '../UI/Forms/Input';
import Modal from '../UI/Modal';
import useForm from '/src/hooks/forms/useForm';
import useStore from '/src/store';
import { roundValidate } from '/src/utils/validation';

interface RoundModalProps {
    open: boolean;
    closeModal: () => void;
    playerId: number | null;
}

const RoundModal: FunctionalComponent<RoundModalProps> = ({ open, closeModal, playerId }) => {
    const addRound = useStore(state => state.addRound);
    const close = () => {
        closeModal();
        reset();
    }
    const submit = (data: typeof initValues) => {
        playerId != null && addRound(playerId, data);
        close();
    }
    const initValues = {
        base: '',
        points: ''
    }
    const { onBlur, onInput, onSubmit, values, errors, reset } = useForm<typeof initValues>(submit, initValues, roundValidate);
    return (
        <Modal open={open} closeModal={close}>
            <section>
                <form onSubmit={onSubmit}>
                    <Input name='base' type='number' value={values.base} onInput={onInput} onBlur={onBlur} label="Base" />
                    <Error text={errors.base} className="mt-2"/>
                    <Input name='points' type='number' value={values.points} onInput={onInput} onBlur={onBlur} label="Puntos" className='mt-4' />
                    <Error text={errors.points} className="mt-2"/>
                    <NormalButton text='Agregar' as="button" className="mx-auto w-full mt-4" />
                </form>
            </section>
        </Modal>
    );
}

export default RoundModal;