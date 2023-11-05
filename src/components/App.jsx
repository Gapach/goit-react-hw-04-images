import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import  {fetchPictures}  from '../api';
import  Searchbar  from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import  Modal  from './Modal/Modal';

const  App = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const imgInfo = (event) => {
    setLargeImageURL(event);
  };

  const handleFormSubmit = (newName) => {
    if (newName === name) {
      toast.error('You entered the same word!!! Enter a new one!!!', {
        theme: 'colored',
      });
    } else {
      setName(newName);
      setPage(1);
  setImages([]);
    }
  };

  const searchArticles = async () => {
    setLoading(true);

    try {
      const { data } = await fetchPictures(name, page);
      setImages((prevImages) => [...prevImages, ...data.hits]);
      setTotalImages(data.totalHits);

      if (data.totalHits === 0) {
        toast.error(`No images with name "${name}"`, {
          theme: 'colored',
        });
      }
    } catch {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name !== '' || page !== 1) {
      searchArticles();
    }
  }, [name, page]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const restOfImages = totalImages - page * 12;

  return (
    <div className="App">
      <Searchbar onSubmitForm={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} showModal={toggleModal} imgInfo={imgInfo} />
      )}
      {loading && <Loader loading={loading} />}

      {images.length > 0 && restOfImages > 0 && (
        <Button title="Load more" onClick={loadMoreImages} />
      )}
      {showModal && <Modal onClose={toggleModal} largeImage={largeImageURL} />}
    </div>
  );
}

export default App;






