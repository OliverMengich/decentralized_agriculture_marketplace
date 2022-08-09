import React from 'react';
import './home-page.css';
import MainNav from '../../components/Navigation/navigation';
import BodyContents from '../../components/body-contents/body-contents';
class Home extends React.Component {
    render() {
        return(
            <div className='home-container'>
                <MainNav />
                <BodyContents/>
            </div>
        )
    }
}
export default Home;