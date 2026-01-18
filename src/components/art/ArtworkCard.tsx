import { Link } from 'react-router-dom';
import { Artwork } from '@/data/artworks';

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link to={`/artwork/${artwork.id}`} className="group">
      <div className="card-art">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg font-medium mb-1 line-clamp-1">
            {artwork.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{artwork.artist}</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">
              ₹{artwork.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {artwork.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
