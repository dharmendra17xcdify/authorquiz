import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

{/* E:\reactjs\authorquiz\public\images\authors\marktwain.jpg */}
const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn', 'book2', 'book3']
    },
    {
        name: 'Charls Dicken',
        imageUrl: 'images/authors/charlsdicken.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry', 'book4', 'book5']
    },
    {
        name: 'JK Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckle', 'book6', 'book7']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Fin', 'book8', 'book9']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/Shakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry F', 'book10', 'book11']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }
}

const state = {
    turnData: getTurnData(authors)
};

ReactDOM.render(<AuthorQuiz {...state}/>, document.getElementById('root'));
registerServiceWorker();
