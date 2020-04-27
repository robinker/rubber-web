export const dataPerPage = 10

export const currentData = (data, currentPage) => {
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    return data.slice(indexOfFirstData, indexOfLastData)
}

export const getIndex = (currentPage) => {
    const idx = []
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    for(let i = indexOfFirstData; i < indexOfLastData; i++) {
        idx.push(i)
    }
    return idx
}