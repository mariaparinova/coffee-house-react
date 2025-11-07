import './Сarousel.css';
import { getFavoriteCoffee } from '../../../data-access/coffee-shop-api/coffee-shop-api.repository.ts';
import { useQuery } from '@tanstack/react-query';
import { CarouselCard } from './CarouselCard/CarouselCard.tsx';
import { Spinner } from '../../../components/Spinner/Spinner.tsx';

export function Carousel() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['favoriteCoffee'],
    queryFn: getFavoriteCoffee,
    retry: false,
  });

  return (
    <div className="favorite-coffee" id="favorite-coffee">
      <h2>
        Choose your <span className="accent">favorite</span> coffee
      </h2>
      <div className="carousel">
        <div className="cards">
          {isPending && <Spinner />}
          {isError && (
            <div className="error-message">Something went wrong. Please, refresh the page</div>
          )}
          {data &&
            data.map((coffee) => (
              <CarouselCard
                key={coffee.id}
                id={coffee.id}
                name={coffee.name}
                price={coffee.price}
                description={coffee.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
