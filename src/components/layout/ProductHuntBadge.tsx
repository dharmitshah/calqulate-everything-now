
import React from 'react';

export const ProductHuntBadge: React.FC = () => {
  return (
    <div className="product-hunt-badge">
      <a 
        href="https://www.producthunt.com/posts/quickulus-the-universe-of-calculators?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-quickulus&#0045;the&#0045;universe&#0045;of&#0045;calculators" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="View Quickulus on Product Hunt"
      >
        <img 
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=967830&theme=dark&t=1747725587915" 
          alt="Quickulus&#0032;–&#0032;The&#0032;Universe&#0032;of&#0032;Calculators - All&#0045;in&#0045;one&#0032;calculator&#0032;suite&#0032;for&#0032;modern&#0032;life&#0033; | Product Hunt" 
          style={{ width: '250px', height: '54px' }} 
          width="250" 
          height="54" 
        />
      </a>
    </div>
  );
};
