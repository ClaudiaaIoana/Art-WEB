import React, { Fragment, useEffect, useState } from "react";
import "../styles/Home.css";

const slides = [
    {
        title: "Welcome to Art Gallery",
        text: "Step into the whimsical world of Ellie's Legacy Gallery, a place where each auction is not just a sale, but a grand adventure. Here, every artwork is a cherished treasure, eagerly awaiting to become part of your own story. Founded by the intrepid explorer Carl Fredricksen, inspired by his beloved Ellie's dream, this gallery is a testament to the enduring power of love and the relentless pursuit of beauty.",
        image: "../together.jpg"
    },
    {
        title: "Our Story",
        text: "Discover the heartwarming tale of Ellie’s Legacy Gallery. Born from the boundless imagination of Ellie Fredricksen, this gallery was established by her devoted husband, Carl, as a sanctuary for art and adventure. After Ellie’s passing, Carl transformed his grief into a mission to fulfill her lifelong dream: to create a place where art and exploration converge, igniting the spirit of adventure in all who visit.",
        image: "../carl&ellie.jpg"
    },
    {
        title: "The Collection",
        text: "Venture through our curated collection, featuring a diverse array of artworks ranging from vintage travel posters to exquisite paintings that capture the essence of adventure. Each piece is meticulously selected to honor Ellie’s adventurous spirit and her love for the arts.",
        image: "../house.jpg"
    },
    {
        title: "Auctions with a Heart",
        text: "Ellie’s Legacy Gallery auctions are more than transactions; they’re gateways to adventure. We’re committed to Ellie’s vision of nurturing young explorers, which is why a portion of our profit supports the Wilderness Explorer Fund. This initiative funds educational programs and expeditions, helping the next generation to discover and protect our natural world. Your participation in our auctions extends Ellie’s legacy of adventure and conservation.",
        image: "../adventure.jpg"
    },
    {
        title: "Why Sell With Us?",
        text: "At Ellie’s Legacy Gallery, we understand that your artwork is more than just a painting; it’s a piece of your soul. That’s why we offer a platform that respects and honors the story behind each creation. Selling with us means connecting with a community that values art as an adventure and a legacy. Our global reach ensures your work finds a home with collectors who are as passionate about art as you are.",
        image: "../our_team.jpg"
    },
    {
        title: "Our Success Stories",
        text: "Pride in our past sales fuels our future. We’ve successfully auctioned rare pieces like the “Spirit of Adventure” series, which soared beyond expectations, and the “Lost Cities” collection, which found its way into the hearts and homes of many. Our transparent and efficient process, coupled with a dedicated team, makes selling art an enjoyable and rewarding experience.",
        image: "../success.jpg"
    },
    {
        title: "A Trusted Platform",
        text: "Ellie’s Legacy Gallery isn’t just a marketplace; it’s a community built on trust and a shared love for the arts. Our commitment to authenticity and excellence has made us a preferred choice for artists and collectors alike. With our seamless auction process and personalized support, we ensure that every sale is a successful chapter in your artistic journey.",
        image: "../comunity.jpg"
    },
];

function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 8000); // Adjusted interval to 5 seconds
        setTimerId(intervalId);

        return () => clearInterval(intervalId);
    }, []);

    const goToPreviousSlide = () => {
        clearInterval(timerId); // Clear the current timer
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        clearInterval(timerId); // Clear the current timer
        setCurrentImageIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Fragment>
            <div className="carousel-container">
                <button className="carousel-control" onClick={goToPreviousSlide}><img src="../left-arrow.png"></img></button>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentImageIndex ? 'active' : ''}`}
                    >
                        <div className="presentation-box">
                            <div className="presentation-container">
                                <div className="presentation-text">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.text}</p>
                                </div>
                                <div className="presentation-image">
                                    <img src={slide.image} alt="Presentation" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="carousel-control" onClick={goToNextSlide}><img src="../right-arrow.png"></img></button>
            </div>
        </Fragment>
    );
}

export default Home;
