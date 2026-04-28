'use client';
export default function StarRating({ rating, reviews, size = 'sm' }) {
  const stars = Math.floor(rating);
  const szCls = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-amber-400 ${szCls}`}>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
      {reviews !== undefined && (
        <span className="text-xs text-gray-400">{rating} ({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
