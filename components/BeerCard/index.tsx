import React from "react";
import styles from "./styles.module.scss";
import {useRouter} from "next/router";

interface BeerCardProps {
    name: string;
    description: string;
    image_url: string;
    id: number;
}

const BeerCard: React.FC<BeerCardProps> = ({name, description, image_url, id}) => {

    const router = useRouter();

    const onCardClick = () => {
        router.replace({
            pathname: '/beer',
            query: {id: id}
        })
    }

    return (
        <div onClick={onCardClick} className={styles.container}>
            <div className="info">
                <h2 className="name">{name}</h2>
                <p className="description">{description.length > 144 ? `${description.slice(0, 144)}...` : description} </p>
            </div>
            {image_url && <div className="image">
                <img src={image_url} alt="beer image"/>
            </div>}
        </div>
    )
}

export default BeerCard
