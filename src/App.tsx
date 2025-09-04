// import './App.scss';
import styles from './App.module.scss';
import {Routes, Route, Link} from 'react-router';
import Home from 'src/pages/home';
import About from 'src/pages/about';
import CarSvg from 'src/assets/car.svg';

const App = () => {
    console.log('//////////////////');
    console.log('isDev ', __isDev__)
    return (
        <div className={styles.app}>
            <CarSvg fill={'red'} height={200} />
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" Component={Home} />
                <Route path="/about">
                    <Route index Component={About} />
                    <Route path=":id" Component={About} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;