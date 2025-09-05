import css from './header.module.scss';
import {Link} from 'react-router';

export const Header = () => {
    return (
        <header className={css['header']}>
            <div className={css['container']}>
                <div className={css['logo']}>Logo</div>
                <nav className={css['nav']}>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                </nav>
            </div>
        </header>
    );
};
