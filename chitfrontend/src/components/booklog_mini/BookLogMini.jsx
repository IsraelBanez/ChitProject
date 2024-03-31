import './BookLogMini.css'

import BLMTableHeader from './BLMTableHeader.jsx';
import BLMTableRow from './BLMTableRow.jsx';

export default function BookLog(){

    return (
            <div className='book-log-mini'>
                <h1>Book Log</h1>
                
                <div className='bl-table-container'>
                    <BLMTableHeader/>
                    <div className='bl-table-body'>
                        <BLMTableRow/>
                        <BLMTableRow/>
                    </div>
                </div>
                              
            </div>
    );
}