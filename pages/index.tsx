import React, {useState, useRef, FormEvent} from "react";
import type {NextPage} from 'next'
import Image from 'next/image'
import beerImage from '../assets/beer-image.jpg'
import Container from "../components/Container ";
import styles from './styles.module.scss'
import useBeerSearch from "../hooks/useSearch";
import BeerCard from "../components/BeerCard";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../components/Pagination";


const Home: NextPage = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [beerName, setBeerName] = useState("");
    const [page, setPage] = useState(1);

    const {loading, beers, error} = useBeerSearch({page, beerName})

    const handleOnSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);
        if (!inputRef.current) return;
        setBeerName(inputRef.current.value)
    }

    const renderCardsSection = (): React.ReactNode => {

        if (loading) {
            return (
                <div className="loader">
                    <ClipLoader/>
                </div>
            )
        }

        if (error) {
            return <p className="message">Что-то пошло не так. Попробуйте еще раз.</p>
        }

        if (!beers) {
            return null;
        }

        if (beers.length === 0) {
            return <p className="message">По вашему запросу нет результатов.</p>

        }

        return (
            <section className="cards-section">
                <div className="cards-container">{beers.map(beer => <BeerCard key={beer.id} {...beer}/>)}</div>
            </section>
        )
    }

    return (
        <Container>
            <div className={styles.container}>
                <section className="heading-section">
                    <div className="heading-info">
                        <h1>Найди свое любимое пиво</h1>
                        <p>У нас вы можете найти пиво на любой вкус</p>
                    </div>
                    <div className="heading-image">
                        <Image src={beerImage} layout="responsive"/>
                    </div>
                </section>

                <div className="search-bar">
                    <form onSubmit={handleOnSearch}>
                        <input ref={inputRef} placeholder="Найти"
                               type="text"/>
                        <button type="submit">Найти</button>
                    </form>
                </div>

                {inputRef.current && renderCardsSection()}

                <Pagination clickable={!!beers} page={page} setPage={setPage}/>

            </div>
        </Container>
    )
}

export default Home
