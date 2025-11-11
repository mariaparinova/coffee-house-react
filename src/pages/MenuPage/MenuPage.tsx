import './MenuPage.css';
import { Button, ButtonStyle } from '../../components/Button/Button.tsx';
import IconLoadMore from '../../assets/icons/arrow-round.svg?react';
import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../../data-access/coffee-shop-api/coffee-shop-api.repository.ts';
import { useEffect, useState } from 'react';
import type { MenuItem } from '../../services/menuItem.ts';
import { Spinner } from '../../components/Spinner/Spinner.tsx';
import { ERROR_MESSAGES } from '../../constants/validation-messages.ts';
import { Card } from './Card/Card.tsx';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { menuPageStore } from '../../store/menuPageStore.ts';
import { Notification } from '../../components/Notification/Notification.tsx';

const categoryNames: CategoryName[] = ['coffee', 'tea', 'desserts'];
const ITEMS_PER_PAGE = document.body.offsetWidth < 1439 ? 4 : undefined;

export function MenuPage() {
  const navigate = useNavigate();
  const { category } = useParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
    select: (data) => ({
      coffee: data.filter((item) => item.category === 'coffee'),
      tea: data.filter((item) => item.category === 'tea'),
      desserts: data.filter((item) => item.category === 'dessert'),
    }),
    retry: false,
    staleTime: 5000,
  });

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { isErrorDuringRenderingDetailedCard, setIsErrorDuringRenderingDetailedCard } =
    menuPageStore();

  useEffect(() => {
    if (isErrorDuringRenderingDetailedCard) {
      setTimeout(() => {
        setIsErrorDuringRenderingDetailedCard(false);
      }, 3000);
    }
  });

  const renderTabs = () => {
    return categoryNames.map((tabName) => {
      const tabClassName = `tab ${category === tabName ? 'active' : ''}`;

      const handleClick = () => {
        navigate(`/menu/${tabName}`);
        setVisibleCount(ITEMS_PER_PAGE);
      };

      return (
        <div key={tabName} className={tabClassName} data-category={tabName} onClick={handleClick}>
          <div className="icon-container">
            <img src={`/icons/tab-icons/${tabName}.png`} alt="Coffee icon" />
          </div>
          {tabName}
        </div>
      );
    });
  };

  const renderCards = () => {
    const categoryStr = category as CategoryName;
    const menuItems = data?.[categoryStr] as MenuItem[];

    if (!menuItems) {
      return <span className="helper-text menu">{ERROR_MESSAGES.NO_ITEMS_FOUND}</span>;
    }

    const handleClick = (id: number) => {
      navigate(`/menu/${category}/${id}`);
    };

    return menuItems
      .slice(0, visibleCount)
      .map((item: MenuItem) => (
        <Card key={item.id} {...item} onClick={() => handleClick(item.id)} />
      ));
  };

  const renderLoadMoreButton = () => {
    if (!ITEMS_PER_PAGE || !data) {
      return;
    }

    const categoryStr = category as CategoryName;
    const isAllCardsVisible = visibleCount ? visibleCount >= data[categoryStr]?.length : undefined;

    if (isAllCardsVisible) {
      return;
    }

    const handleLoadMore = () => {
      setVisibleCount((prev) => (prev || 0) + ITEMS_PER_PAGE);
    };

    return (
      <Button
        className="load-more"
        style={ButtonStyle.Round}
        isDisabled={isPending}
        onClick={handleLoadMore}
      >
        <IconLoadMore />
      </Button>
    );
  };

  return (
    <div className="menu-page">
      {isErrorDuringRenderingDetailedCard && (
        <Notification textContent={ERROR_MESSAGES.SMTH_WENT_WRONG_REFRESH_PAGE} />
      )}
      <h2>
        Behind each of our cups hides an
        <span className="accent"> amazing surprise</span>
      </h2>
      <div className="tabs">{renderTabs()}</div>
      <div className="cards-container">
        {isPending && <Spinner />}
        {isError && !data && (
          <span className="helper-text">{ERROR_MESSAGES.SMTH_WENT_WRONG_REFRESH_PAGE}</span>
        )}
        {data && renderCards()}
      </div>
      {renderLoadMoreButton()}
      <Outlet />
    </div>
  );
}

type CategoryName = 'coffee' | 'tea' | 'desserts';
