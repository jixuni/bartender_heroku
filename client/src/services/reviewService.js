import http from "./httpService";

const apiEndpoint = `/api/review`;

export function getReviewByBeer(beerId) {
  return http.get(`${apiEndpoint}/beer/${beerId}`);
}

export function getReviewByUser(userId) {
  return http.get(`${apiEndpoint}/user/${userId}`);
}

export function getReview(reviewId) {
  return http.get(`${apiEndpoint}/${reviewId}`);
}

export function editReview(reviewId, review) {
  return http.put(`${apiEndpoint}/${reviewId}`, {
    title: review.title,
    rating: review.rating,
    comment: review.comment,
    beer_id: review.beer_id,
    user_id: review.user_id
  });
}

export function submitReview(review) {
  return http.post(`${apiEndpoint}`, {
    title: review.title,
    rating: review.rating,
    comment: review.comment,
    beer_id: review.beer_id,
    user_id: review.user_id
  });
}

export function deleteReview(reviewId) {
  return http.delete(`${apiEndpoint}/${reviewId}`);
}

export default {
  getReviewByBeer,
  getReviewByUser,
  getReview,
  editReview,
  submitReview,
  deleteReview
};
