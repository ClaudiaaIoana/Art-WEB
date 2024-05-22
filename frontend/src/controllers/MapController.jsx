import React, { Fragment } from 'react';

const Map = ({ position }) => {
    return (
        <Fragment>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12604.942519316348!2d-122.2879444025312!3d37.83136925683359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f812591f83ebb%3A0x54a4a831d64cf2e5!2sPixar%20Animation%20Studios!5e0!3m2!1sen!2sro!4v1713078466227!5m2!1sen!2sro"
                width="300"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }} // Corrected
            ></iframe>
        </Fragment>
    );
};

export default Map;
