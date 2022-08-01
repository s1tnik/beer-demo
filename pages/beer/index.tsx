import {NextPage} from "next";
import Error from "next/error";
import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import Container from "../../components/Container ";
import api from "../../api";
import {Beer} from "../../types/beer";
import styles from './styles.module.scss'
import ClipLoader from "react-spinners/ClipLoader";


const Beer: NextPage = () => {
    const router = useRouter()
    const {id} = router.query

    const [beer, setBeer] = useState<Beer[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            api.get<Beer[]>(`/${id}`).then(response => setBeer(response.data)).finally(() => setLoading(false))
        }
    }, [id]);

    if (!id && !loading) {
        return <Error statusCode={404} title="This page could not be found"/>
    }

    const renderBeer = (): JSX.Element => {

        const selectedBeer = beer?.length ? beer[0] : undefined;

        if (selectedBeer) {

            const {name, description, first_brewed, image_url, brewers_tips} = selectedBeer;

            return (
                <div className="beer-container">
                    <button onClick={() => router.push("/")}>Вернуться к поиску</button>
                    <div className="beer">
                        <div className="info">
                            <div>
                                <h1>Name: {name}, First brewed: {first_brewed} </h1>
                                <p>{description}</p>
                            </div>
                            <div>
                                <h1>Brewers tips:</h1>
                                <p>{brewers_tips}</p>
                            </div>
                        </div>
                        <div className="image">
                            <img src={image_url} alt="beer image"/>
                        </div>
                    </div>
                </div>
            )
        }

        return <h1>Beer is not found.</h1>
    }

    return (
        <Container>
            <div className={styles.container}>
                {loading ? <ClipLoader/> : renderBeer()}
            </div>
        </Container>
    )
}

export default Beer;
