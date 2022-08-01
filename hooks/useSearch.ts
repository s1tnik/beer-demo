import {useEffect, useState} from "react";
import {Beer} from "../types/beer";
import api from "../api";

const ITEMS_PER_PAGE = 4;

interface useBeerSearchProps {
    page: number;
    beerName: string;
}

const useBeerSearch = ({
                           page = 1,
                           beerName
                       }: useBeerSearchProps): { loading: boolean, beers?: Beer[], error: boolean } => {

    const [beers, setBeers] = useState<Beer[] | undefined>(undefined);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setError(false);

        if (!beerName) return;

        const url = `/?page=${page}&per_page=${ITEMS_PER_PAGE}&beer_name=${beerName}`

        setLoading(true);

        api.get<Beer[]>(url).then(response => {
            setBeers(response.data)
        }).catch(() => setError(true)).finally(() => setLoading(false))

    }, [page, beerName]);


    return {loading, beers, error}

}


export default useBeerSearch
