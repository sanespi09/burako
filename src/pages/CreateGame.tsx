import { FC } from 'preact/compat';
import { h } from 'preact';
import Input from '../components/UI/Forms/Input';
import NormalButton from '../components/UI/Buttons/Normal';
import useForm from '/src/hooks/forms/useForm';
import Error from '/src/components/UI/Forms/Error';
import useStore from '../store';
import Dropdown from '../components/UI/Forms/Dropdown';
import { gameValidate } from '../utils/validation';

const scoreOptions = [
    { label: '2000', value: 2000 },
    { label: '2500', value: 2500 },
    { label: '3000', value: 3000 },
]
const initValues = { firstTeam: '', secondTeam: '', winScore: 2000 };

const CreateGame: FC = () => {
    const createGame = useStore(state => state.createGame);
    
    const submit = (data: typeof initValues) => {
        const id = createGame([data.firstTeam, data.secondTeam], data.winScore);
        window.history.pushState({}, '', `/game/${id}`);
    }

    const { onInput, onBlur, values, errors, onSubmit } = useForm<typeof initValues>(submit, initValues, gameValidate);

    return (
        <section className='px-6 pt-10'>
            <div className='text-xl text-blue-300 font-bold tracking-wide leading-snug'>
                <h2>
                    Elija el nombre de los equipos o jugadores:
                </h2>
            </div>
            <form className='mt-8' onSubmit={onSubmit}>
                <Input 
                    label="Equipo 1"
                    placeholder="Nosotros" 
                    value={values.firstTeam} 
                    onInput={onInput} 
                    onBlur={onBlur} 
                    name="firstTeam" 
                />
                <Error text={errors.firstTeam} className="mt-2" />
                <Input 
                    label="Equipo 2" 
                    placeholder="Ellos" 
                    className='mt-8' 
                    value={values.secondTeam} 
                    onBlur={onBlur} 
                    onInput={onInput} 
                    name="secondTeam" 
                />
                <Error text={errors.secondTeam} className="mt-2" />
                <Dropdown label='Puntaje Final' name='winScore' options={scoreOptions} value={values.winScore} onInput={onInput} className="mt-8"/>
                <NormalButton text="Crear" as="button" size="lg" className='mt-16 mx-auto' />
            </form>
        </section>
    );
}

export default CreateGame;