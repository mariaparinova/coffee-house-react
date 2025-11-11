import './HomePage.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import IconCap from '../../assets/icons/coffee-cup.svg?react';
import { Carousel } from './Сarousel/Сarousel.tsx';
import { Button } from '../../components/Button/Button.tsx';
import IconAppleStore from '../../assets/icons/apple-store.svg?react';
import IconGoogleStore from '../../assets/icons/google-store.svg?react';

export function HomePage() {
  const renderIntroductionBlock = () => {
    return (
      <div className="intro">
        <div className="video-container">
          <video autoPlay muted loop>
            <source src="/video/introduction.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="content">
          <h1>
            <span className="accent">Enjoy</span> premium coffee at our charming cafe
          </h1>
          <p>
            With its inviting atmosphere and delicious coffee options, the Coffee House Resource is
            a popular destination for coffee lovers and those seeking a warm and inviting space to
            enjoy their favorite beverage.
          </p>
          <Link
            className="button primary no-underline"
            to={ROUTES.MENU.replace(':category', 'coffee')}
          >
            Menu
            <IconCap />
          </Link>
        </div>
      </div>
    );
  };

  const renderGalleryBlock = () => {
    const pathToImgFolder = '/images/gallery';

    return (
      <div className="gallery" id="about">
        <h2>
          Resource is <span className="accent"> the perfect and cozy place</span> where you can
          enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.
        </h2>
        <div className="pictures-container">
          <div className="container-1">
            <div className="picture picture-1 big">
              <picture>
                <source
                  srcSet={`${pathToImgFolder}/mobile-gallery-1.jpg`}
                  media="(max-width: 767px)"
                />
                <source
                  srcSet={`${pathToImgFolder}/gallery-1-desktop.jpg`}
                  media="(min-width: 768px)"
                />
                <img src={`${pathToImgFolder}/gallery-1-desktop.jpg`} alt="Gallery picture" />
              </picture>
            </div>
            <div className="picture picture-2 small">
              <picture>
                <source
                  srcSet={`${pathToImgFolder}/gallery-2-desktop.jpg`}
                  media="(min-width: 768px)"
                />
                <img src={`${pathToImgFolder}/gallery-2-desktop.jpg`} alt="Gallery picture" />
              </picture>
            </div>
          </div>
          <div className="container-2">
            <div className="picture picture-3 small">
              <picture>
                <source
                  srcSet={`${pathToImgFolder}/gallery-3-desktop.jpg`}
                  media="(min-width: 768px)"
                />
                <img src={`${pathToImgFolder}/gallery-3-desktop.jpg`} alt="Gallery picture" />
              </picture>
            </div>
            <div className="picture picture-4 big">
              <picture>
                <source
                  srcSet={`${pathToImgFolder}/gallery-4-desktop.jpg`}
                  media="(min-width: 768px)"
                />
                <img
                  className="picture picture-4 big"
                  src={`${pathToImgFolder}/gallery-4-desktop.jpg`}
                  alt="Gallery picture"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAppAdventureBlock = () => {
    return (
      <div className="app-adventure" id="mobile-app">
        <div className="text-content">
          <h2>
            <span className="accent">Download</span> our apps to start ordering
          </h2>
          <p>
            Download the Resource app today and experience the comfort of ordering your favorite
            coffee from wherever you are
          </p>
          <div className="buttons-container">
            <Button className="app-store">
              <IconAppleStore />
              <span className="download-buttons-content">
                <span className="title">Available on the</span>
                App Store
              </span>
            </Button>
            <Button className="app-store">
              <IconGoogleStore />
              <span className="download-buttons-content">
                <span className="title">Available on</span>
                Google Play
              </span>
            </Button>
          </div>
        </div>
        <img className="picture" src="/images/app-adventure/mobile-screens.png" alt="App picture" />
      </div>
    );
  };

  return (
    <>
      {renderIntroductionBlock()}
      {<Carousel />}
      {renderGalleryBlock()}
      {renderAppAdventureBlock()}
    </>
  );
}
