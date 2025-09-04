import { useParams } from 'react-router';

const Home = () => {
    const params = useParams<{ id: string }>();
    // console.log(params)
    return (
        <div>
            Home
        </div>
    );
};

export default Home;