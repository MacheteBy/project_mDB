/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const elemRec = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        chekBox = addForm.querySelector('[type="checkbox"]');

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };



    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };



    const sortArray = (arr) => {
        arr.sort();
    };


    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = chekBox.checked;
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorite) {
                alert("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            sortArray(movieDB.movies);

            creatMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    function creatMovieList(film, parent) {
        movieList.innerHTML = "";
        movieDB.movies.forEach((film, i) => {
            movieList.innerHTML += `
    <li class = "promo__interactive-item" > ${i + 1} ${film}
        <div class = "delete" > </div>
        </li>
    `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                creatMovieList(film, parent);
                sortArray(film);
            });
        });
    }

    makeChanges();
    deleteAdv(elemRec);
    sortArray(movieDB.movies);
    creatMovieList(movieDB.movies, movieList);
});