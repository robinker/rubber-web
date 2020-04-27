import React from 'react'
import { Pagination as Paginate } from 'react-bootstrap'

function Pagination({ dataPerPage, totalData, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <Paginate>
            {pageNumbers.map(number => {
                return <Paginate.Item key={number} onClick={() => paginate(number)} >{number}</Paginate.Item>
            })}
        </Paginate>
    )
}

export default Pagination
