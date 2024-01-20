import React, {useEffect, useState} from "react";
import cn from 'classnames';
import styles from './Paginator.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}
let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage = 1,
                                          onPageChanged = x => x, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount /pageSize);
    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize +1
    let rightPortionPageNumber = portionNumber * portionSize
    return ( <div className={styles.paginator}>
        { portionNumber >1 &&
        <button onClick={() => setPortionNumber(portionNumber - 1)}>Previous</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
            return <span key={`page_${p}`} className={ cn({
                [styles.selectedPage] : currentPage === p
            }, styles.pageNumber)}
                         onClick={() => onPageChanged(p)}>{p}</span>
        })}
            {portionCount > portionNumber &&
            <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>

    )

}
export default Paginator