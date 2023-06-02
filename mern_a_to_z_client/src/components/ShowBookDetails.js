import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowBookDetails(props) {
  const [book, setBook] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowBookDetails_deleteClick');
      });
  };

  const BookItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Τίτλος</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Συγγραφέας</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Εκδότης</td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Ημερομηνία Έκδοσης</td>
            <td>{book.published_date}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Περιγραφή</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Δείξε τη Λίστα Βιβλίων
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Εγγραφή Βιβλίου</h1>
            <p className='lead text-center'>Δείτε τις πληροφορίες του βιβλίου</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{BookItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(book._id);
              }}
            >
              Διαγραφή Βιβλίου
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-book/${book._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Επεξεργασία Βιβλίου
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;
