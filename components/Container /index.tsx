import React from "react";
import styles from './styles.module.scss'

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spot}/>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Container
