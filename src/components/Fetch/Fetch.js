function fetchPhotos(nextName, nextPage, perPage) {
  return fetch(
    `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=30662426-21982097d0559eebc608a0eec&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

const api = {
  fetchPhotos,
};

export default api;

