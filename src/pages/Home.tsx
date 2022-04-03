import {FC} from 'preact/compat';
import {h} from 'preact';
import { Link } from 'wouter';
import RoundedButton from '../components/UI/Buttons/Rounded';
import useStore from '../store';
import { Game } from '../store/slices/gameSlice';
 
const Home: FC = () => {

    const currentGame = useStore(state => state.game) as any;

    return ( 
        <section className='px-6 pt-10'>
            <div>
                <h2 className="text-3xl text-center text-blue-300 font-bold leading-snug">
                    Bienvenido al mejor ayudante para su juego de Burako
                </h2>
            </div>
            <div className='mt-10'>
                <ul className='mx-auto text-center flex flex-col items-center gap-8'>
                    <Link href='/create-game/'>
                        <RoundedButton text="Nuevo juego" as="a" size="lg"/>
                    </Link>
                    { currentGame ? <Link href={`/game/${currentGame?.id}`}>
                        <RoundedButton text="Continuar juego" as="a" size="lg"/>
                    </Link> : null}
                </ul>
            </div>
        </section>
     );
}
 
export default Home;