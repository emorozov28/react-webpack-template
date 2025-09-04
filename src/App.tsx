// import './App.scss';
import styles from './App.module.scss';
import {Routes, Route, Link} from 'react-router';
import Home from 'src/pages/home';
import About from 'src/pages/about';
// import ava1 from 'src/assets/ava2.png'
// import ava2 from 'src/assets/ava.jpg'
import CarSvg from 'src/assets/car.svg';
import CarSvg2 from 'src/assets/car.svg?url';

const App = () => {
    console.log('//////////////////');
    console.log('isDev ', __isDev__)
    console.log(CarSvg2)
    return (
        <div className={styles.app}>
            {/*<img src={ava1} height={400} />*/}
            {/*<img src={ava2} height={400} />*/}
            <CarSvg fill={'red'} height={400} />
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" Component={Home} />
                <Route path="/about">
                    <Route index Component={About} />     {/* /about */}
                    <Route path=":id" Component={About} /> {/* /about/:id */}
                </Route>
            </Routes>
        </div>
    );
};

export default App;