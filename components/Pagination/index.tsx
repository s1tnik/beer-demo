import React, {Dispatch, SetStateAction} from "react";
import styles from './styles.module.scss'

interface PaginationProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    clickable: boolean;
}

const Pagination: React.FC<PaginationProps> = ({page, setPage, clickable}) => {

    const clickOnNext = () => {
        setPage(prevState => prevState + 1)
    }

    const clickOnPrev = () => {
        if (page === 1) return;
        setPage(prevState => prevState - 1)
    }

    const clickOnPage = (page: number) => {
        setPage(page)
    }

    const renderPagination = () => {

        const buttonStyle: React.CSSProperties = clickable ? {} : {
            cursor: "not-allowed"
        }

        return (
            <>
                <button disabled={!clickable} style={buttonStyle} onClick={clickOnPrev} className="prev">&#60;</button>
                {[...new Array(3)].map((_, index) => {

                    let currentPage = page + index - 1;
                    if (page === 1) {
                        currentPage = index + 1;
                        return <button key={currentPage} disabled={!clickable} style={buttonStyle} className={currentPage === page ? "active" : ""}
                                       onClick={() => clickOnPage(currentPage)}>{currentPage}</button>
                    }

                    return <button key={currentPage} disabled={!clickable} style={buttonStyle} className={currentPage === page ? "active" : ""}
                                   onClick={() => clickOnPage(currentPage)}>{currentPage}</button>

                })}
                <button disabled={!clickable} style={buttonStyle} onClick={clickOnNext} className="next">&#62;</button>
            </>
        )
    }

    return (
        <div className={styles.pagination}>
            {renderPagination()}
        </div>
    )
}

export default Pagination
