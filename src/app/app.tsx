import css from './app.module.scss';

import {Outlet} from 'react-router';
import {Header} from 'src/widgets/header';

const App = () => {
    return (
        <div className={css['app']}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default App;