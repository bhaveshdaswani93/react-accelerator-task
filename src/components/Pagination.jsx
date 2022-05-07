
import React from 'react';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {

    const pageCount = Math.ceil(itemsCount / pageSize);    
    const pages = _.range(1, pageCount+1);

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                
                {
                    pages.map( page => (
                        <li key={page} onClick={() => onPageChange(page)} className={`page-item ${ currentPage == page ? 'active' : '' }`}>
                            <a className={`page-link`} href="#"> { page } </a>
                        </li>
                    ) )
                }
                
                
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    );
};

export default Pagination;