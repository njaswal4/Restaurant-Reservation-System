import { Container } from 'react-bootstrap';
import MainNav from '../component/MainNav';

//Layout compnent
const Layout = (props) => {
    return (
        <>
        <MainNav />
        <br />
        <Container>
            {props.children}
        </Container>
        <br />
        </>
    );
};

export default Layout;