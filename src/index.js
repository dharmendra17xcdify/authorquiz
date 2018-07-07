import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter}  from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import AddAutherForm from './AddAuthorForm';


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

function resetState(){
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App() {
    return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected} 
    onContinue={() => {
        state = resetState();
        render();
    }}/>;
}

const AuthorWrapper = withRouter(({ history }) => 
    <AddAutherForm onAddAuthor={(auther) => {
        authors.push(auther);
        history.push('/');
    }} />
);

function render(){
    ReactDOM.render(<BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App}/>
            <Route path="/add" component={AuthorWrapper}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();

registerServiceWorker();
