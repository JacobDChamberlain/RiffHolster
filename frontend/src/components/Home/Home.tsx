import AlphaTab from './AlphaTab/AlphaTab';
import './Home.css';


export default function Home() {
    return(
        <div className='home-wrapper'>
            <h3>Homepage</h3>
            <h4>Here, you will find your riffs.</h4>
            <AlphaTab />
        </div>
    )
}