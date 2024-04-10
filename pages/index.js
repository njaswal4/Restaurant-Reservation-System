import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

//Home page - display home page contents
const Home = () => {
    return (
        <>
            <Image src="https://media.timeout.com/images/103375567/image.jpg" fluid rounded />
            <Row style={{marginTop: '15px'}}>
                <Col md={6}>
                    <p>
                    
                       Discover a hidden gem nestled within the bustling cityscape – Introducing "Savor Haven", an oasis for culinary connoisseurs seeking an extraordinary dining escapade. Step into our elegantly designed space, bathed in soft hues and adorned with modern accents, exuding an aura of understated sophistication.
                    </p>
                    <p>
                    Embark on a gastronomic adventure as the aroma of meticulously crafted dishes dances through the air, enticing guests to partake in a symphony of flavors expertly curated by our passionate chefs. From locally sourced delicacies to exotic spices from distant lands, each offering on our diverse menu is a testament to our dedication to culinary excellence and innovation.       </p>
                </Col>
                <Col md={6}>
                    <p>
                    Whether you're indulging in a succulent seafood creation, exploring the vibrant flavors of seasonal produce, or treating yourself to a decadent dessert, each culinary masterpiece promises to ignite your senses and leave an indelible mark on your palate. With impeccable service and an extensive wine selection tailored to elevate every dining experience, Savor Haven transcends the ordinary – it's where culinary artistry meets unparalleled hospitality.      </p>
                </Col>
            </Row>
        </>
    );
};

export default Home;