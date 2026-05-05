import {Link} from "react-router";
import './Article.css';
import {QuoteImg} from "./images";


export const Article = () => {


    return <div className={"Article"}>
        <div className={"ArticleContainer"}>
            <div className={"ArticleContainerBlock"}>
                <div className={"ArticleCaption"}>Так ли важно ограничение?</div>
                <div className={"ArticleNotice"}>
                    Эта статья об&nbsp;<a href={"../"}>игре</a>. Сначала сыграй в&nbsp;неё, чтобы лучше увидеть разницу
                    между обычным подходом и&nbsp;тем, что мы предлагаем.
                </div>

                <div className={"ArticleReading"}>Время прочтения: 3&nbsp;минуты.</div>
                <div className={"ArticleEpigraph"}>
                    <div className={"ArticleEpigraphQuote"}>
                        <QuoteImg className={"SvgFillContainer"}/>
                    </div>
                    <div className={"ArticleEpigraphText"}>
                        «У&nbsp;вас нет выбора: либо вы управляете ограничением, либо оно управляет вами»
                    </div>
                    <div className={"ArticleEpigraphAuthor"}>
                        — А.&nbsp;Брызгалова,&nbsp;
                        <Link
                            to="https://bryzgalova.ru/fundamentalstoc/u-vas-net-vybora-libo-vy-upravlyaete-ogranicheniem-libo-ono-upravlyaet-vami"
                            target="_blank">заметка о&nbsp;теории ограничений</Link>
                    </div>
                </div>

                <div className={"ArticleHeader1"}>Что обычно хочется сделать сначала?</div>
                <div className={"ArticleParagraph"}>
                    Когда люди впервые играют в&nbsp;эту игру, у&nbsp;них возникают похожие мысли:
                    <ul className={"ArticleParagraphList"}>
                        <li className={"ArticleParagraphListItem"}>
                            Надо переделать команду! Кто так нанимает?
                        </li>
                        <li className={"ArticleParagraphListItem"}>
                            Срочно заставить разработчиков и&nbsp;продакта помогать тестировщикам!
                        </li>
                        <li className={"ArticleParagraphListItem"}>
                            Срочно нанять ещё тестировщиков, чтобы они успевали!
                        </li>
                    </ul>
                </div>
                <div className={"ArticleHeader2"}>
                    В&nbsp;чём тут проблема?
                </div>
                <ul className={"ArticleParagraphList"}>
                    <li className={"ArticleParagraphListItem"}>
                        Перестраивать команду&nbsp;— долго.
                    </li>
                    <li className={"ArticleParagraphListItem"}>
                        Люди могут сопротивляться и&nbsp;потерять мотивацию.
                    </li>
                    <li className={"ArticleParagraphListItem"}>
                        Новые сотрудники&nbsp;— дорого, и&nbsp;их не всегда можно быстро нанять.
                    </li>
                </ul>
                <div className={"ArticleParagraph"}>
                    Предлагаем другой путь: бесплатно, без&nbsp;лишних усилий, нужно лишь немного матчасти.
                </div>
                <div className={"ArticleHeader1"}>Немного теории</div>
                <div className={"ArticleParagraph"}>Вспомним теорию ограничений Элияху Голдратта.</div>
                <div className={"ArticleParagraph"}>
                    В&nbsp;любой системе есть ограничение, которое определяет её скорость. Всегда. Иначе мы&nbsp;бы
                    зарабатывали бесконечно много и&nbsp;бесконечно быстро.
                </div>
                <div className={"ArticleParagraph"}>
                    Часто думают, что теория ограничений&nbsp;— это найти узкое место и&nbsp;расширить его. Это наш
                    первый порыв в&nbsp;игре.
                </div>
                <div className={"ArticleParagraph"}>Но&nbsp;теория ограничений предлагает другой порядок действий:
                    <ol className={"ArticleParagraphList"}>
                        <li className={"ArticleParagraphNumListItem"}>Найти или выбрать ограничение.</li>
                        <li className={"ArticleParagraphNumListItem"}>Выжать максимум из&nbsp;ограничения
                            без&nbsp;вливания ресурсов.
                        </li>
                        <li className={"ArticleParagraphNumListItem"}>Подчинить всё остальное этому ограничению.</li>
                        <li className={"ArticleParagraphNumListItem"}>Если система всё ещё не&nbsp;справляется
                            со&nbsp;спросом&nbsp;— только тогда вкладываться в&nbsp;расширение.
                        </li>
                        <li className={"ArticleParagraphNumListItem"}>Вернуться к&nbsp;шагу 1.</li>
                    </ol>
                </div>
                <div className={"ArticleHeader1"}>
                    Как выжать максимум из&nbsp;ограничения без&nbsp;вложений?
                </div>
                <div className={"ArticleParagraph"}>
                    В&nbsp;нашей игре ограничение&nbsp;— тестировщики.
                </div>
                <div className={"ArticleParagraph"}>Не&nbsp;допускай простоя. Час простоя ограничения&nbsp;— час простоя
                    всей системы. Значит, у&nbsp;тестировщиков всегда должна быть работа «на&nbsp;завтра».
                </div>
                <div className={"ArticleParagraph"}>Обычно для&nbsp;этого делают буфер задач. Его размер зависит
                    от&nbsp;того, как быстро ограничение работает и&nbsp;как быстро ему подвозят задачи.
                </div>
                <div className={"ArticleParagraph"}>В&nbsp;игре оптимальный объём незавершённой работы
                    у&nbsp;тестировщиков&nbsp;— в&nbsp;3–4 раза больше их скорости.
                </div>
                <div className={"ArticleParagraph"}>Но&nbsp;важно не&nbsp;переборщить. Если переполнить систему&nbsp;—
                    в&nbsp;буфере окажется много ненужных задач, а&nbsp;полезные будут стоять в&nbsp;очереди.
                </div>
                <div className={"ArticleHeader1"}>
                    Какие задачи брать?
                </div>
                <div className={"ArticleParagraph"}>Мало просто занять тестировщиков работой. Задач всегда больше. Надо
                    отбирать те, которые приносят деньги.
                </div>
                <div className={"ArticleHeader2"}>Как обычно считают?</div>
                <div className={"ArticleParagraph"}>Складывают зарплаты всех сотрудников по&nbsp;нормочасам
                    и&nbsp;сравнивают с&nbsp; доходом от&nbsp;задачи. Проблема в&nbsp;том, что мы платим людям оклад,
                    а&nbsp;не&nbsp;за&nbsp;час. Расходы всё равно есть, даже если задач мало.
                </div>
                <div className={"ArticleHeader2"}>Что предлагает теория ограничений?</div>
                <div className={"ArticleParagraph"}>Проход&nbsp;— это деньги от&nbsp;продажи минус переменные
                    затраты.<br/>
                    В&nbsp;IT переменные затраты редки: например, перепродажа лицензий. В&nbsp;нашей игре проход равен
                    сумме, которую мы получаем за&nbsp;задачу после сдачи в&nbsp;продакшн.
                </div>
                <div className={"ArticleParagraph"}>
                    Проход на&nbsp;ограничение&nbsp;— это проход, делённый на&nbsp;время работы ограничения,
                    то&nbsp;есть тестировщиков.
                </div>
                <div className={"ArticleParagraph"}>Правило простое:<br/>
                    Чем больше денег приносит час работы тестировщиков над&nbsp;задачей&nbsp;— тем лучше
                    для&nbsp;системы.
                </div>
                <div className={"ArticleParagraph"}>
                    Идеальная задача&nbsp;— та, над&nbsp;которой ограничение вообще не&nbsp;работает. То&nbsp;есть
                    деньги получаем, а&nbsp;ресурс не&nbsp;тратим.
                </div>
                <div className={"ArticleHeader1"}>Что в&nbsp;итоге?</div>
                <div className={"ArticleParagraph"}>Вот три простых правила:
                    <ol className={"ArticleParagraphList"}>
                        <li className={"ArticleParagraphNumListItem"}>Постоянно загружай ограничение
                            и&nbsp;не&nbsp;давай ему простаивать.
                        </li>
                        <li className={"ArticleParagraphNumListItem"}>Не&nbsp;перегружай систему&nbsp;— всё равно всё
                            не&nbsp;сделаешь.
                        </li>
                        <li className={"ArticleParagraphNumListItem"}>Отбирай задачи&nbsp;— бери те, которые приносят
                            больше денег за&nbsp;час работы ограничения.
                        </li>
                    </ol>
                </div>
                <div className={"ArticleParagraph"}>Как видишь, мы не&nbsp;предлагаем копать в&nbsp;то, как перекроить
                    команду. Достаточно изменить подход к&nbsp;тому, как ты наполняешь систему задачами.
                </div>
                <div className={"ArticleParagraph"}>Теперь сыграй в&nbsp;игру с&nbsp;этими правилами. Результат точно
                    изменится.
                </div>
                <div className={"ArticleParagraphSpace"}>&nbsp;</div>
                <Link to="../" reloadDocument={true} className={"ArticleLink"}>
                    <div className={"ArticleButton"}>Играть!</div>
                </Link>
                <div className={"ArticleParagraphSpace"}>&nbsp;</div>
            </div>
        </div>
    </div>;
}
